'use client';
import React, { useRef, useState } from 'react';
import AudioPlayer, { CustomReactPlayerInstance } from './AudioPlayer';
import Transcription from './Transcription';
import { Message } from '../../Types';

export interface AudioPlayerContainerProps {
  src: string;
  messages: Message[];
}


const AudioPlayerContainer: React.FC<AudioPlayerContainerProps> = ({src, messages }) => {
  


  const playerRef = useRef<CustomReactPlayerInstance>(null);

  const handleSeek = (time: number) => {
    playerRef.current?.seekTo(time, 'seconds');
  };

  return (
    <div className='container flex flex-col gap-4'>
      <AudioPlayer ref={playerRef} src={src} />
      <Transcription messages={messages} onSeek={handleSeek} />
    </div>
  );
};

export default AudioPlayerContainer;
