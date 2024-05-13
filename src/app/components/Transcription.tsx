import React, { useState } from 'react';

interface Message {
  content: string;
  role: 'agent' | 'user';
  start: number;
  end: number;
}

interface TranscriptionProps {
  messages: Message[];
  onSeek: (time: number) => void;
}

const TranscriptionComponent: React.FC<TranscriptionProps> = ({ messages, onSeek }) => {
  const [activeStart, setActiveStart] = useState<number | null>(null);

  const handleTranscriptClick = (start: number): void => {
    setActiveStart(start);
    onSeek(start);
  };

  return (
    <div className="flex flex-col  bg-transparent text-white overflow-y-auto p-6 space-y-3 border-2 border-gray-700 rounded-xl mb-12">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex ${message.role === 'agent' ? 'justify-start' : 'justify-end'} mb-2 cursor-pointer`}
          onClick={() => handleTranscriptClick(message.start)}
        >
          <div
            className={`animate-fadeIn rounded-xl p-2 max-w-[50%] ${
              activeStart === message.start ? 'bg-green-600 bg-opacity-40' : message.role === 'agent' ? 'bg-purple-700 bg-opacity-60' : 'bg-blue-400 bg-opacity-60'
            } text-sm transition-all duration-300 ease-in-out`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TranscriptionComponent;
