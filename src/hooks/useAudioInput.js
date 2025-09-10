import { useState, useEffect, useRef } from 'react';
import { AudioProcessor } from '../utils/audioProcessor';

export function useAudioInput() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const audioProcessorRef = useRef(null);

  const getAudioDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(device => device.kind === 'audioinput');
      setAudioDevices(audioInputs);
      if (audioInputs.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(audioInputs[0].deviceId);
      }
    } catch (err) {
      console.error('Error enumerating devices:', err);
    }
  };

  const initialize = async (deviceId = selectedDeviceId) => {
    try {
      if (audioProcessorRef.current) {
        audioProcessorRef.current.dispose();
      }
      audioProcessorRef.current = new AudioProcessor();
      const success = await audioProcessorRef.current.initialize(deviceId);
      
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

  const changeDevice = async (deviceId) => {
    setSelectedDeviceId(deviceId);
    if (isInitialized) {
      await initialize(deviceId);
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

  useEffect(() => {
    getAudioDevices();
  }, [selectedDeviceId]);

  return {
    isInitialized,
    error,
    audioDevices,
    selectedDeviceId,
    initialize,
    changeDevice,
    getAudioData,
    getSampleRate
  };
}