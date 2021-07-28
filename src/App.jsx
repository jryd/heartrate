import React  from 'react'

const App = () => {
  const pair = async () => {
    const device = await navigator.bluetooth.requestDevice({
      filters: [{ services: ['heart_rate'] }],
      acceptAllDevices: false,
    });
  };

  return <button onClick={pair}>Pair to heartrate monitor</button>
};

export default App;
