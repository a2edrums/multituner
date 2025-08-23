import { useState } from 'react';
import instrumentsData from '../data/instruments.json';

export function useInstrumentData() {
  const [instruments] = useState(instrumentsData);
  const [selectedInstrument, setSelectedInstrument] = useState('guitar6');
  const [selectedTuning, setSelectedTuning] = useState('standard');

  const getCurrentInstrument = () => {
    return instruments[selectedInstrument];
  };

  const getCurrentTuning = () => {
    const instrument = getCurrentInstrument();
    return instrument?.tunings[selectedTuning];
  };

  const getInstrumentList = () => {
    return Object.keys(instruments).map(key => ({
      id: key,
      name: instruments[key].name
    }));
  };

  const getTuningList = () => {
    const instrument = getCurrentInstrument();
    if (!instrument) return [];
    
    return Object.keys(instrument.tunings).map(key => ({
      id: key,
      name: instrument.tunings[key].name
    }));
  };

  return {
    instruments,
    selectedInstrument,
    selectedTuning,
    setSelectedInstrument,
    setSelectedTuning,
    getCurrentInstrument,
    getCurrentTuning,
    getInstrumentList,
    getTuningList
  };
}