import React  from 'react';
import FlipNumbers from 'react-flip-numbers';
import { Line } from 'react-chartjs-2';
import { HeartIcon } from '@heroicons/react/outline';
import useHeartrate from './useHeartrate';
import Heartrate from './Heartrate';
import HeartrateHistory from './HeartrateHistory';

const App = () => {

  const {heartrate, currentHeartrate, connect} = useHeartrate();

  return <div className="container mx-auto py-8">
    <button onClick={connect} className="border">Pair to heartrate monitor</button>
    <Heartrate bpm={currentHeartrate} />
    <HeartrateHistory history={heartrate} />
  </div>
};

export default App;
