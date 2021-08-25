import React from 'react';
import FlipNumbers from 'react-flip-numbers';
import { HeartIcon } from '@heroicons/react/outline';

const Heartrate = ({bpm}) => (
  <div className="grid grid-cols-2 grid-rows-2 w-32">
    <div className="row-span-2 flex items-center justify-center">
      <FlipNumbers height={20} width={20} color="black" background="white" play perspective={100} numbers={`${bpm}`} />
    </div>
    <span>bpm</span>
    <HeartIcon className="h-6 w-6"/>
  </div>
);

export default Heartrate;