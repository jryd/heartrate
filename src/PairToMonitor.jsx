import React from 'react';
import LinkIcon from './LinkIcon';

const PairToMonitor = ({onPair, isPairing}) => {

  return <div className="min-h-screen flex items-center justify-center">
    <div className="rounded-xl shadow px-10 py-12 bg-gradient-to-br from-red-500 to-pink-500 flex flex-col items-center text-red-50">
      <p className="mb-8">Pair to your heartrate monitor</p>
      <button onClick={onPair} className="h-52 w-52 rounded-full border-4 flex items-center justify-center shadow-lg hover:shadow-xl focus:shadow transition-shadow duration-300">
        {/* animate SVG when pairing */}
        <LinkIcon className="w-16 h-16" />
      </button>
    </div>
  </div>
};

export default PairToMonitor;