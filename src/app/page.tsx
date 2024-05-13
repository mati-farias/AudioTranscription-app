import { Message } from '@/Types';
import HomeContainer from './components/HomeContainer';
require('dotenv').config();

const Home = () => {
  

  return (
    <div className='container mx-auto px-4 flex flex-col items-center justify-center w-screen pt-4 lg:pt-0'>
      <div className='w-full mb-6 flex flex-col items-center justify-center'>
        <h1 className='text-4xl lg:text-6xl text-white font-bold lg:text-white mb-6'>Transcript App</h1>
      
        <p className='text-gray-400 leading-relaxed text-center lg:px-6'>
          The Transcript App allows you to upload an audio file involving up to a two people conversation and receive a transcription of the audio in a convinient format. Upload your audio file (mp3, wav, etc.) and the app will return a beautifuly created chat. The app is built using the Gladia API, which is a powerful tool for speech recognition and transcription.
        </p>
      </div>
      <HomeContainer />
    </div>
  );
};

export default Home;
