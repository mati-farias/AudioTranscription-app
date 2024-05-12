import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { CustomReactPlayerInstance } from './AudioPlayer';

interface Message {
  content: string;
  role: 'agent' | 'user';
  start: number;
  end: number;
}

interface TranscriptionProps {
  playerRef: React.RefObject<CustomReactPlayerInstance>;
  messages: Message[];
  onSeek: (time: number) => void;
}



const TranscriptionComponent: React.FC<TranscriptionProps> = ({
  playerRef, messages, onSeek
}) => {
  const [activeStart, setActiveStart] = useState<number | null>(null);

  const handleTranscriptClick = (start: number): void => {
    setActiveStart(start);
    onSeek(start);  // Usando onSeek en lugar de playerRef.current.seekTo
  };

  return (
    <div className='transcription-container p-4 bg-gray-100 rounded shadow'>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`message flex items-center ${
            message.role === 'agent' ? 'justify-start' : 'justify-end'
          } p-2 my-2 rounded-full transition-all duration-300 ease-in-out cursor-pointer w-full`}
          onClick={() => handleTranscriptClick(message.start)}>
          <span
            className={`text-lg font-medium ${
              activeStart === message.start ? 'ring-2 ring-blue-300' : ''
            } inline-block p-2 rounded-full ${
              message.role === 'agent' ? 'bg-green-100' : 'bg-blue-100'
            } text-black w-1/2 px-6`}>
            {message.content}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TranscriptionComponent;
