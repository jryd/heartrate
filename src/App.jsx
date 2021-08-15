import React, { useState } from 'react';
import FlipNumbers from 'react-flip-numbers';

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

  return <div>
    <button onClick={connect}>Pair to heartrate monitor</button>
    <div className="flex">
      <FlipNumbers height={12} width={12} color="red" background="white" play perspective={100} numbers={`${heartrate.slice(-1)[0] || 0}`} />
      <span>bpm</span>
    </div>
  </div>
};

export default App;
