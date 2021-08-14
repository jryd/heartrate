import React, { useState } from 'react';

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
        console.log(e.target.value.getUint8(1))
        setHeartrate((currentValue) => [...currentValue.slice(-99), e.target.value.getUint8(1)])
      });

      char.startNotifications()
    } catch (err) {
      console.log(err);
    }
  }

  return <div>
    <button onClick={connect}>Pair to heartrate monitor</button>
    <ul>
      {heartrate.map(val => <li>{val}</li>)}
    </ul>
  </div>
};

export default App;
