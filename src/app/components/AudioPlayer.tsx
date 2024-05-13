import React, { useState, useEffect, forwardRef, MutableRefObject } from 'react';
import ReactPlayer from 'react-player';

interface AudioPlayerProps {
  src: string;
}

export interface CustomReactPlayerInstance {
  seekTo: (time: number, type?: 'seconds' | 'fraction') => void;
}

const AudioPlayer = forwardRef<CustomReactPlayerInstance, AudioPlayerProps>(({ src }, ref) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Use effect to avoid hydration mismatch with ReactPlayer.
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  return (
    <div className='mb-4'>
      <ReactPlayer
        ref={ref as any}
        url={src}
        controls={true}
        width="100%"
        height="50px"
      />
    </div>
  );
});

export default AudioPlayer;
