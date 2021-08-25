import React from 'react';
import { Line } from 'react-chartjs-2';

const chartOptions = {
  animation: {duration: 0},
  scales: {
    y: {
      suggestedMin: 30,
      suggestedMax: 200,
    },
    x: {
      display: false
    }
  },
  elements: {
    point: {
      radius: 0
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
};

const HeartrateHistory = ({history}) => (
  <Line data={{
          labels: [...Array(100).keys()],
          datasets: [{
            label: 'Heartrate',
            data: history,
            fill: false,
            borderColor: 'rgba(255, 99, 132, 0.4)',
          }]
        }}
        options={chartOptions} />
);

export default HeartrateHistory;