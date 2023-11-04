/* eslint-disable react-hooks/exhaustive-deps */
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Table from 'react-bootstrap/Table';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import { QRCodeSVG } from 'qrcode.react';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';

import Button from '~/components/Button';
import hooks from '~/hooks';
import config from '~/config';

const tabs = {
  ticketList: 'ticket-list',
  qrCode: 'qr-code',
};

var stompClient = null;
function UserCheckOut() {
  const axiosPrivate = hooks.useAxiosPrivate();
  const username = hooks.useLocalStorage('user', '')[0];
  const [userId, setUserId] = useState(undefined);
  const [tickets, setTickets] = useState([]);
  const [pendingTicket, setPendingTicket] = useState({ id: undefined });
  const [ticketIdEncode, setTicketIdEncode] = useState('');
  const [payload, setPayload] = useState(undefined);

  useEffect(() => {
    // fetch tickets list from username
    const response = axiosPrivate.post(config.constants.USER_TICKETS_URL, JSON.stringify({ username }));
    response
      .then((res) => {
        console.log(res);
        setTickets(res.data?.object);
      })
      .catch((err) => {
        console.log(err);
      });
    // fetch user information

    const response2 = axiosPrivate.post(config.constants.USER_INFO_URL, JSON.stringify({ username }));
    response2
      .then((res) => {
        setUserId(res.data?.object?.id);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (userId) {
      registerUser();
    }
  }, [userId]);

  useEffect(() => {
    if (payload) {
      toast(JSON.parse(payload.body)?.message);
    }
  }, [payload]);

  const registerUser = () => {
    let Sock = new SockJS(config.constants.WEB_SOCKET, {
      headers: {},
    });
    stompClient = over(Sock);
    stompClient.connect({}, onConnected, onError);
  };

  const onError = (err) => {
    console.log(err);
  };

  const onConnected = () => {
    stompClient.subscribe(config.constants.WEB_SOCKET_SUBSCRIBE_USER_CHANNEL_URL + userId, onPublicMessageReceived);
  };

  const onPublicMessageReceived = (payload) => {
    setPayload(payload);
  };

  const handleCheckOutBtnClick = (id, licensePlate) => {
    toast(`Đã tạo mã QR code biển số ${licensePlate}. Vui lòng mở ở mục QR code check out!`);
    setPendingTicket({ id });
    const encryptedText = CryptoJS.AES.encrypt(JSON.stringify({ id }), config.constants.SECRET_KEY).toString();
    setTicketIdEncode(encryptedText);
  };

  const handleDeleteQRCode = () => {
    setTicketIdEncode('');
    setPendingTicket({ id: undefined });
  };

  const renderTickets = () =>
    tickets.map((ticket) => (
      <tr key={ticket.id}>
        <td>
          {ticket.id === pendingTicket.id ? (
            <Button success onClick={handleDeleteQRCode}>
              Đã tạo mã QR
            </Button>
          ) : (
            <Button primary onClick={() => handleCheckOutBtnClick(ticket.id, ticket.licensePlate)}>
              Check Out
            </Button>
          )}
        </td>
        <td>{ticket.licensePlate}</td>
        <td>{ticket.parkingLotName}</td>
        <td>{ticket.price}</td>
        <td>{ticket.checkInTime}</td>
        <td>{ticket.vehicleTypeName}</td>
      </tr>
    ));

  return (
    <Tabs className="mb-6" defaultActiveKey={tabs.ticketList}>
      <Tab title="Danh sách vé" eventKey={tabs.ticketList}>
        <Table responsive>
          <thead>
            <tr>
              <th></th>
              <th>Biển số xe</th>
              <th>Tên nhà xe</th>
              <th>Giá vé</th>
              <th>Thời gian vào</th>
              <th>Loại xe</th>
            </tr>
          </thead>
          <tbody>{renderTickets()}</tbody>
        </Table>
      </Tab>
      <Tab title="Mã QR check out" eventKey={tabs.qrCode}>
        {ticketIdEncode.length > 0 ? (
          <div
            style={{
              width: '100%',
              height: 'calc(100vh - 100px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <QRCodeSVG style={{ width: '200px', height: '200px' }} value={ticketIdEncode} />
          </div>
        ) : (
          'Bạn chưa chọn vé check out'
        )}
      </Tab>
    </Tabs>
  );
}

export default UserCheckOut;
