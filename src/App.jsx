import React  from 'react'

const App = () => {
  const pair = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        filters: [{services: ['heart_rate']}],
        acceptAllDevices: false,
      });

      const server = await device.gatt.connect();
    } catch (err) {
      console.log(err);
    }
  };

  return <button onClick={pair}>Pair to heartrate monitor</button>
};

export default App;
