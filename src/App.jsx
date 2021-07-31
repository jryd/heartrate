import React  from 'react'

const App = () => {
  const pair = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{services: ['heart_rate']}],
        acceptAllDevices: false,
      });

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService('heart_rate');
      const char = await service.getCharacteristic('heart_rate_measurement');

      char.oncharacteristicvaluechanged = {
        onChange: e => {
          console.log(e);
          console.log(e.target.value.getUint8(1));
          console.log(e.target.value.getUint8(1) / 2);
        }
      };

      char.startNotifications();
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={pair}>Pair to heartrate monitor</button>
};

export default App;
