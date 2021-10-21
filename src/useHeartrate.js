import React, { useEffect, useState } from 'react';

const useHeartrate = () => {
  const [isPairing, setIsPairing] = useState(false);
  const [isPaired, setIsPaired] = useState(false);
  const [heartrate, setHeartrate] = useState([]);
  const [currentHeartrate, setCurrentHeartrate] = useState(0);

  useEffect(() => {
    setCurrentHeartrate(heartrate.slice(-1)[0] || 0);
  }, [heartrate]);

  const connect = async () => {
    setIsPairing(true);

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

      char.startNotifications();
      setIsPaired(true);
    } catch (err) {
      console.log(err);
    }

    setIsPairing(false);
  }

  return {
    isPairing,
    isPaired,
    heartrate,
    currentHeartrate,
    connect
  };
};

export default useHeartrate;