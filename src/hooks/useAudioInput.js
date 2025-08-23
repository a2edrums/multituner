import { useState, useEffect, useRef } from 'react';
import { AudioProcessor } from '../utils/audioProcessor';

export function useAudioInput() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const audioProcessorRef = useRef(null);

  const initialize = async () => {
    try {
      audioProcessorRef.current = new AudioProcessor();
      const success = await audioProcessorRef.current.initialize();
      
      if (success) {
        setIsInitialized(true);
        setError(null);
      } else {
        setError('Failed to initialize audio');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const getAudioData = () => {
    return audioProcessorRef.current?.getAudioData();
  };

  const getSampleRate = () => {
    return audioProcessorRef.current?.getSampleRate() || 44100;
  };

  useEffect(() => {
    return () => {
      if (audioProcessorRef.current) {
        audioProcessorRef.current.dispose();
      }
    };
  }, []);

  return {
    isInitialized,
    error,
    initialize,
    getAudioData,
    getSampleRate
  };
}