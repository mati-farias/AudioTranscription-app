"use client"
import React, {useState} from 'react';
import { UiFileInputButton } from './UiFileInputButton';
import AudioPlayerContainer from './AudioPlayerContainer';
import { Message } from '@/Types';
type Props = {
  children?: React.ReactNode;
  messages: Message[];
};

function HomeContainer(props: Props) {
  const { children, messages} = props;
  
  const [myFileLocation, setMyFileLocation] = useState<null | string>(null);


  const getFilePathCallback = (filePath: string) => {
   
    function getRelativePath(filePath: string) {
      // Find the index of "/public/" in the path
      const publicIndex = filePath.indexOf('\\public\\') + '\\public\\'.length;
    
      // Extract the part of the path after "/public/"
      let relativePath = filePath.slice(publicIndex);
    
      // Replace backslashes with forward slashes for URL compatibility
      relativePath= relativePath.replace(/\\/g, '/');
    
      return '/' + relativePath;  // Ensure the path starts with a '/'
    }

    const relativePath = getRelativePath(filePath);
    setMyFileLocation(relativePath);
    console.log("myFileLocation", relativePath)
   }
  


  return (
    <div>
      <div className='mb-6 text-white'>
        <UiFileInputButton
          label='Upload File'
          uploadFileName='theFiles'
          getFilePathCallback={getFilePathCallback}
        />
      </div>
      <div className='mb-6'>
        <AudioPlayerContainer
          src={myFileLocation ?? '/audios/Test_Call.wav'}
          messages={messages}
        />
      </div>
    </div>
  );
}

export default HomeContainer;
