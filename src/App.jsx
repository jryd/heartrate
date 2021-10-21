import React  from 'react';
import useHeartrate from './useHeartrate';
import Heartrate from './Heartrate';
import HeartrateHistory from './HeartrateHistory';
import PairToMonitor from './PairToMonitor';

const App = () => {

  const {isPaired, isPairing, heartrate, currentHeartrate, connect} = useHeartrate();

  return <div className="container mx-auto py-8">

    {!isPaired && <>
      <PairToMonitor onPair={connect} isPairing={isPairing}/>
    </>}

    {isPaired && <>
      <Heartrate bpm={currentHeartrate} />
      <HeartrateHistory history={heartrate} />
    </>}

  </div>
};

export default App;
