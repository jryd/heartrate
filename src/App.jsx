import React  from 'react';
import FlipNumbers from 'react-flip-numbers';
import { Line } from 'react-chartjs-2';
import { HeartIcon } from '@heroicons/react/outline';
import useHeartrate from './useHeartrate';

const App = () => {

  const {heartrate, currentHeartrate, connect} = useHeartrate();

  return <div className="container mx-auto py-8">
    <button onClick={connect} className="border">Pair to heartrate monitor</button>
    <div className="grid grid-cols-2 grid-rows-2 w-32">
      <div className="row-span-2 flex items-center justify-center">
        <FlipNumbers height={20} width={20} color="black" background="white" play perspective={100} numbers={`${currentHeartrate}`} />
      </div>
      <span>bpm</span>
      <HeartIcon className="h-6 w-6"/>
    </div>
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
