import React  from 'react';
import FlipNumbers from 'react-flip-numbers';
import { Line } from 'react-chartjs-2';
import { HeartIcon } from '@heroicons/react/outline';
import useHeartrate from './useHeartrate';
import Heartrate from './Heartrate';

const App = () => {

  const {heartrate, currentHeartrate, connect} = useHeartrate();

  return <div className="container mx-auto py-8">
    <button onClick={connect} className="border">Pair to heartrate monitor</button>
    <Heartrate bpm={currentHeartrate} />
    <Line data={{
      labels: [...Array(100).keys()],
      datasets: [{
        label: 'Heartrate',
        data: heartrate,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 0.4)',
      }]}} options={{
        animation: {duration:0},
      scales: {
        y: {
              suggestedMin: 30,
              suggestedMax:200,
            },
        x: {
          display:false
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
    }}/>
  </div>
};

export default App;
