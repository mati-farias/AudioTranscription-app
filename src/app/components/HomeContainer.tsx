'use client'
import React, { useState, useEffect } from 'react';
import { SubmitAudio } from './SubmitAudio';
import AudioPlayerContainer from './AudioPlayerContainer';
import { Message } from '@/Types';
import { useStore } from '../store';



function HomeContainer() {

  const filePath = useStore(state => state.filePath);
  const [myFileLocation, setMyFileLocation] = useState<string>('public/audios/Test_Call.wav');

  const messages = useStore(state => state.messages);

  useEffect(() => {

   
    setMyFileLocation(filePath);
    
  }, [filePath]);

  return (
    <div className='container mb-6 w-screen px-2 lg:px-0'>
      <div className='pb-6 text-white'>
        <SubmitAudio
          label='Upload File'
          uploadFileName='theFiles'
        />
      </div>
      <div className='pb-6 '>
        <AudioPlayerContainer
          src={myFileLocation}
          messages={messages}
        />
      </div>
    </div>
  );
}

export default HomeContainer;
