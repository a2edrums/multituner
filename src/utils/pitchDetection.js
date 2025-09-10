// Autocorrelation-based pitch detection
export function detectPitch(audioBuffer, sampleRate) {
  const bufferLength = audioBuffer.length;
  
  // Check if signal is strong enough
  let rms = 0;
  for (let i = 0; i < bufferLength; i++) {
    rms += audioBuffer[i] * audioBuffer[i];
  }
  rms = Math.sqrt(rms / bufferLength);
  
  // Require minimum signal strength
  if (rms < 0.01) return null;
  
  const autocorrelation = new Float32Array(bufferLength);
  
  // Calculate autocorrelation
  for (let lag = 0; lag < bufferLength; lag++) {
    let sum = 0;
    for (let i = 0; i < bufferLength - lag; i++) {
      sum += audioBuffer[i] * audioBuffer[i + lag];
    }
    autocorrelation[lag] = sum;
  }
  
  // Normalize by the zero-lag value
  const zeroLag = autocorrelation[0];
  if (zeroLag === 0) return null;
  
  for (let i = 0; i < bufferLength; i++) {
    autocorrelation[i] /= zeroLag;
  }
  
  // Find the first peak after the initial peak
  let maxValue = 0;
  let bestLag = 0;
  
  // Skip the first few samples to avoid noise
  const minLag = Math.floor(sampleRate / 800); // 800 Hz max
  const maxLag = Math.floor(sampleRate / 80);  // 80 Hz min
  
  for (let lag = minLag; lag < maxLag && lag < bufferLength; lag++) {
    if (autocorrelation[lag] > maxValue) {
      maxValue = autocorrelation[lag];
      bestLag = lag;
    }
  }
  
  // Require minimum confidence
  if (bestLag === 0 || maxValue < 0.3) return null;
  
  // Interpolate for better accuracy
  const y1 = autocorrelation[bestLag - 1] || 0;
  const y2 = autocorrelation[bestLag];
  const y3 = autocorrelation[bestLag + 1] || 0;
  
  const a = (y1 - 2 * y2 + y3) / 2;
  const b = (y3 - y1) / 2;
  
  let adjustedLag = bestLag;
  if (a !== 0) {
    adjustedLag = bestLag - b / (2 * a);
  }
  
  return sampleRate / adjustedLag;
}

// Convert frequency to note name
export function frequencyToNote(frequency, referenceFreq = 440) {
  if (!frequency || frequency <= 0) return null;
  
  const A4 = referenceFreq;
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  
  const noteNumber = 12 * Math.log2(frequency / A4) + 69;
  const noteIndex = Math.round(noteNumber) % 12;
  const octave = Math.floor(Math.round(noteNumber) / 12) - 1;
  
  return {
    note: noteNames[noteIndex],
    octave: octave,
    cents: Math.round((noteNumber - Math.round(noteNumber)) * 100)
  };
}