import React, { useEffect, useState } from 'react';

const useHeartrate = () => {
  const [heartrate, setHeartrate] = useState([]);
  const [currentHeartrate, setCurrentHeartrate] = useState(0);

  useEffect(() => {
    setCurrentHeartrate(heartrate.slice(-1)[0] || 0);
  }, [heartrate]);

  const connect = async () => {
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

  return {
    heartrate,
    currentHeartrate,
    connect
  };
};

export default useHeartrate;