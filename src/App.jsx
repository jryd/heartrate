import React, { useState } from 'react';
import FlipNumbers from 'react-flip-numbers';
import { Line } from 'react-chartjs-2';
import { HeartIcon } from '@heroicons/react/outline';

const App = () => {
  const [heartrate, setHeartrate] = useState([]);

  const connect = async props => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{ services: ['heart_rate'] }],
        acceptAllDevices: false,
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('heart_rate');
      const char = await service.getCharacteristic('heart_rate_measurement');

      char.addEventListener('characteristicvaluechanged', e => {
        setHeartrate((currentValue) => [...currentValue.slice(-99), e.target.value.getUint8(1)])
      });

      char.startNotifications()
    } catch (err) {
      console.log(err);
    }
  }

  return <div className="container mx-auto py-8">
    <button onClick={connect} className="border">Pair to heartrate monitor</button>
    <div className="grid grid-cols-2 grid-rows-2 w-32">
      <div className="row-span-2 flex items-center justify-center">
        <FlipNumbers height={20} width={20} color="black" background="white" play perspective={100} numbers={`${heartrate.slice(-1)[0] || 0}`} />
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
      }
    }}/>
  </div>
};

export default App;
