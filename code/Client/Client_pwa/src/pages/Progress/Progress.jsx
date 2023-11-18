// Progress.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Classbox from '../../components/classbox/classbox';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [2, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

function Progress() {
  return (
    <div className='p-10 flex justify-center items-center flex-col h-screen'>
        <h1 className='text-2xl font-bold '>Please choose the class</h1>
        <div className='flex-row flex justify-center items-center gap-4'>
            {/* <h1></h1>
            <Pie data={data} /> */}
            <Link to='/progress/a'>
            <Classbox section="A"/>
            </Link>
            <Link to='/progress/b'>
                <Classbox section="B"/>
            </Link>
        </div>
    </div>
  );
}

export default Progress;
