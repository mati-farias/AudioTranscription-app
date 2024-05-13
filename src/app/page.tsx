import { Message } from '@/Types';
import HomeContainer from './components/HomeContainer';
require('dotenv').config();

const Home = () => {
  

  return (
    <div className='container mx-auto px-4 flex flex-col items-center justify-center'>
      <div className='max-w-4xl w-full mb-6 flex flex-col items-center justify-center'>
        <h1 className='text-8xl font-bold text-white mb-6 '>Transcript App</h1>{' '}
      
        <p className='text-gray-400 leading-relaxed'>
      
          The Transcript App allows you to upload an audio file involving up to two people and receive a transcription of the audio in a convinient format. Upload your audio file (mp3, wav, etc.) and the app will return a beautifuly created chat. The app is built using the Gladia API, which is a powerful tool for speech recognition and transcription.
          
        </p>
      </div>
      <HomeContainer />
    </div>
  );
};

export default Home;
