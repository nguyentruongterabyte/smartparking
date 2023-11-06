/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import hooks from '~/hooks';
import config from '~/config';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'DOANH THU THEO NĂM',
    },
  },
};

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function Merchant() {
  const [revenue, setRevenue] = useState(labels.map(() => faker.number.int({ min: 0, max: 1000 })));
  const [merchantId, setMerchantId] = useState(undefined);
  const [parkingLots, setParkingLots] = useState([]);
  const [parkingLotId, setParkingLotId] = useState(undefined);
  const [year, setYear] = useState(2023);
  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: 'Doanh thu tháng',
        data: revenue,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  });

  const axiosPrivate = hooks.useAxiosPrivate();
  const user = hooks.useLocalStorage('user', '')[0];
  const date = new Date();
  useEffect(() => {
    // fetch merchant id
    const response2 = axiosPrivate.post(config.constants.MERCHANT_INFO_URL, JSON.stringify({ username: user }));
    response2
      .then((res) => {
        setMerchantId(res?.data?.object?.id || undefined);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (merchantId) {
      const response = axiosPrivate.get(config.constants.PARKING_LOTS_URL + `?merchantId=${merchantId}`);
      response
        .then((res) => {
          setParkingLots(res.data?.map((prev) => ({ id: prev.id, name: prev.parkingLotName })));
          setParkingLotId(res?.data?.length > 0 ? res.data.length[0].id : undefined);
        })
        .catch((err) => console.log(err));
    }
  }, [merchantId]);

  useEffect(() => {
    // fetch revenue of 12 month
    const response = axiosPrivate.post(
      config.constants.YEAR_REVENUE_MERCHANT_URL,
      JSON.stringify({ year, parkingLotId }),
    );
    response
      .then((res) => {
        setRevenue(res.data?.object?.map((revenue) => revenue.total));
      })
      .catch((err) => console.log(err));
  }, [year, parkingLotId]);

  useEffect(() => {
    setData({
      labels,
      datasets: [
        {
          label: 'Doanh thu tháng',
          data: revenue,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    });
  }, [revenue]);

  const renderYears = () => {
    const render = [];
    const currentYear = date.getFullYear();
    for (let i = 5; i >= 0; i--) {
      render.push(
        <option key={i} value={currentYear - i}>
          {currentYear - i}
        </option>,
      );
    }
    return render;
  };

  return (
    <div>
      <select onChange={(e) => setParkingLotId(Number(e.target.value))} value={parkingLotId}>
        {parkingLots.map((parkingLot) => (
          <option key={parkingLot.id} value={parkingLot.id}>
            {parkingLot.name}
          </option>
        ))}
      </select>
      <select value={year} onChange={(e) => setYear(Number(e.target.value))}>
        {renderYears()}
      </select>
      <Bar options={options} data={data} />
    </div>
  );
}
