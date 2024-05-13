'use client';
import React, { useState } from 'react';
import { useStore } from '../store';
import { formatMessages } from '../../utils/utils';
require('dotenv').config();

interface SubmitAudioProps {
  label: string;
  uploadFileName: string;
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
}

type TFileResponse = {
  message: string;
  filepath: string;
};

export const SubmitAudio: React.FC<SubmitAudioProps> = ({
  label,
  uploadFileName,
  acceptedFileTypes = '',
  allowMultipleFiles = false,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState(new FormData());
  const [fileName, setFileName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const setFilePath = useStore((state) => state.setFilePath);
  const setMessages = useStore((state) => state.setMessages);
  

  // Gladia API functions for tanscription

  async function makeFetchRequest(url: string, options: any) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    } catch (error: any) {
      console.error("Fetch error:", error.message);
      setIsLoading(false);
      alert("A problem occurred with the network request. Check if your file is in the correct format.");
      throw error;
    }
  }

  async function pollForResult(resultUrl: string, headers: any) {
    try {
      while (true) {
        
        const pollResponse = await makeFetchRequest(resultUrl, { headers });

        if (pollResponse.status === 'done') {
          
          setIsLoading(false);
          
          const messages = formatMessages(pollResponse.result.transcription.utterances);
          setMessages(messages);
          break;
        } else {
          
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    } catch (error: any) {
      console.error("Polling error:", error.message);
      setIsLoading(false);
      alert("Failed to poll for results.");
    }
  }

  async function startTranscription(audioUrl: string) {
    try {
      const gladiaKey = process.env.NEXT_PUBLIC_GLADIA_API_KEY;
      const requestData = {
        audio_url: audioUrl,
        detect_language: true,
        enable_code_switching: true,
        language: 'en',
        diarization: true,
        diarization_config: {
          min_speakers: 1,
          max_speakers: 5,
        },
        sentences: true,
      };

      const gladiaUrl = 'https://api.gladia.io/v2/transcription/';
      const headers = {
        'x-gladia-key': gladiaKey,
        'Content-Type': 'application/json',
      };

      
      const initialResponse = await makeFetchRequest(gladiaUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestData),
      });


      if (initialResponse.result_url) {
        await pollForResult(initialResponse.result_url, headers);
      }
    } catch (error: any) {
      console.error("Transcription error:", error.message);
      setIsLoading(false);
      alert("Failed to start transcription.");
    }
  }

  // end of Gladia API functions for tanscription

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }
    const file = event.target.files[0];
    setFileName(file.name);
    const url = URL.createObjectURL(file);
    setFilePath(url);
    const formData = new FormData();
    formData.append('audio', file);
    setForm(formData);
  };

  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    

    const options = {
      method: 'POST',
      headers: {
        'x-gladia-key': 'eb8eb294-d535-4add-8aea-f318a19fc633',
      },
    };

    (options as any).body = form;

    fetch('https://api.gladia.io/v2/upload', options)
      .then((response) => response.json())
      .then((response) => startTranscription(response.audio_url))
      .catch((err) => setError('There was an error uploading the file: '+ err ));
  };

  return (
    <div className='flex items-center justify-center h-auto border-purple-500  border-2 p-4'>
      <form
        onSubmit={onSubmitHandler}
        className='flex flex-col items-center justify-center w-full max-w-2xl p-8'
        encType="multipart/form-data"
      >
        <h2 className='text-2xl font-bold mb-2 text-white'>{label}</h2>
        <p className='text-gray-400 mb-6'>
          Select an audio file to transcribe and press the button
        </p>
        <p className='text-gray-400 mb-6'>
          Be patient, it may take a few moments
        </p>
        <div className='flex items-center justify-between w-full '>
        
          <input
            id='file-upload'
            type='file'
            className='text-gray-200 border-gray-200 file:border-none file:px-4 file:py-2 file:rounded-lg file:text-white hover:file:bg-blue-400 file:bg-purple-700 focus:outline-none file:mr-4'
            accept={acceptedFileTypes}
            multiple={allowMultipleFiles}
            name={uploadFileName}
            onChange={onChangeHandler}
            ref={fileInputRef}
          />
          <button
            type='submit'
            className='px-4 py-2 bg-purple-700 text-white rounded hover:bg-blue-400 transition-colors focus:outline-none'>
          {isLoading ? 'Transcribing...' : 'Transcribe'}
          </button>
        </div>
        {isLoading ? <div className="w-8 h-8 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div> : ''}
      </form>
      
    </div>
  );
  
  
};
