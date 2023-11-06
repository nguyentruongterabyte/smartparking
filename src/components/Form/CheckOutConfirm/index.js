import classNames from 'classnames/bind';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';

import styles from '../Form.module.scss';
import Modal from '~/components/Modal';
import Button from '~/components/Button';
import hooks from '~/hooks';
import config from '~/config';

const cx = classNames.bind(styles);

function CheckOutConfirm({ data, isOpen, onClose }) {
  const axiosPrivate = hooks.useAxiosPrivate();

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const response = axiosPrivate.post(config.constants.CHECK_OUT_URL, JSON.stringify({ id: data.id }));

    response
      .then((res) => {
        // console.log(res);
        toast.success('Check out thành công!');
        onClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal isOpen={isOpen}>
      <form
        className={cx('container', {
          open: isOpen,
        })}
        onSubmit={handleSubmit}
      >
        <div className={cx('header')}>
          <h3 className={cx('heading')}>Xác nhận biển số xe</h3>
        </div>
        <div style={{ height: '25vh' }} className={cx('form')}>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} className={cx('group')}>
            <Table responsive>
              <thead>
                <tr>
                  <th>Biển số xe</th>
                  <th>Giá vé</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.licensePlate}</td>
                  <td>{data.price}</td>
                </tr>
              </tbody>
            </Table>
          </div>
          <div className={cx('controls')}>
            <Button danger onClick={handleClose}>
              Hủy
            </Button>
            <Button success>Xác nhận</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default CheckOutConfirm;
