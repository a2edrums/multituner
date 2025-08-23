// Web Audio API utilities
export class AudioProcessor {
  constructor() {
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.dataArray = null;
    this.bufferLength = 2048;
  }

  async initialize() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: false,
          noiseSuppression: false,
          autoGainControl: false
        } 
      });
      
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.analyser = this.audioContext.createAnalyser();
      
      this.analyser.fftSize = this.bufferLength * 2;
      this.analyser.smoothingTimeConstant = 0.3;
      
      this.microphone.connect(this.analyser);
      this.dataArray = new Float32Array(this.bufferLength);
      
      return true;
    } catch (error) {
      console.error('Error initializing audio:', error);
      return false;
    }
  }

  getAudioData() {
    if (!this.analyser) return null;
    
    this.analyser.getFloatTimeDomainData(this.dataArray);
    return this.dataArray;
  }

  getSampleRate() {
    return this.audioContext ? this.audioContext.sampleRate : 44100;
  }

  dispose() {
    if (this.microphone) {
      this.microphone.disconnect();
    }
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}