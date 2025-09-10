import { useState, useEffect, useRef } from 'react';
import { detectPitch, frequencyToNote } from '../utils/pitchDetection';

export function usePitchDetection(getAudioData, getSampleRate, isActive = true, referenceFreq = 440) {
  const [frequency, setFrequency] = useState(null);
  const [note, setNote] = useState(null);
  const intervalRef = useRef();
  const frequencyHistoryRef = useRef([]);

  // Clear history when becoming inactive
  useEffect(() => {
    if (!isActive) {
      frequencyHistoryRef.current = [];
    }
  }, [isActive]);

  useEffect(() => {
    if (!isActive || !getAudioData) {
      return;
    }

    const analyze = () => {
      const audioData = getAudioData();
      const sampleRate = getSampleRate();
      
      if (audioData) {
        const detectedFreq = detectPitch(audioData, sampleRate);
        
        if (detectedFreq) {
          // Add to history for smoothing
          frequencyHistoryRef.current.push(detectedFreq);
          if (frequencyHistoryRef.current.length > 5) {
            frequencyHistoryRef.current.shift();
          }
          
          // Calculate smoothed frequency
          const smoothedFreq = frequencyHistoryRef.current.reduce((a, b) => a + b, 0) / frequencyHistoryRef.current.length;
          const detectedNote = frequencyToNote(smoothedFreq, referenceFreq);
          
          setFrequency(smoothedFreq);
          setNote(detectedNote);
        }
      }
    };

    // Reduce update rate to 10fps for stability
    intervalRef.current = setInterval(analyze, 100);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [getAudioData, getSampleRate, isActive, referenceFreq]);

  return { frequency, note };
}