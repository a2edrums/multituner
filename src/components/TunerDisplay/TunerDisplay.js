import React, { useState } from 'react';
import { Container, Row, Col, Alert, Form, Button } from 'react-bootstrap';
import { useAudioInput } from '../../hooks/useAudioInput';
import { usePitchDetection } from '../../hooks/usePitchDetection';
import { useInstrumentData } from '../../hooks/useInstrumentData';
import PitchMeter from '../PitchMeter/PitchMeter';
import FrequencyDisplay from '../FrequencyDisplay/FrequencyDisplay';
import InstrumentSelector from '../InstrumentSelector/InstrumentSelector';
import StringIndicator from '../StringIndicator/StringIndicator';
import FrequencySelector from '../FrequencySelector/FrequencySelector';
import AudioInputSelector from '../AudioInputSelector/AudioInputSelector';
import logo from '../../logo.png'
import {PiWaveSineFill} from "react-icons/pi";


function TunerDisplay() {
  const { isInitialized, error, audioDevices, selectedDeviceId, initialize, changeDevice, getAudioData, getSampleRate } = useAudioInput();
  const [referenceFreq, setReferenceFreq] = useState(440);
  const [showFreqSelector, setShowFreqSelector] = useState(false);
  const { frequency, note } = usePitchDetection(getAudioData, getSampleRate, isInitialized, referenceFreq);
  const instrumentData = useInstrumentData();

  return (
    <Container fluid className="bg-dark text-light min-vh-100 py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center gap-3">
              <PiWaveSineFill size={50} className="gradient-logo" />
              <h1>Multi Tuner</h1>
            </div>
            <div className="d-flex align-items-center gap-2">
              <Button 
                variant="outline-light" 
                size="sm"
                onClick={() => setShowFreqSelector(true)}
              >
                {referenceFreq}Hz
              </Button>
              <Form.Check 
                type="switch"
                id="tuner-switch"
                label={isInitialized ? "ON" : "OFF"}
                checked={isInitialized}
                onChange={() => isInitialized ? window.location.reload() : initialize()}
                className="fs-5"
              />
            </div>
          </div>
          
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}
          
          <AudioInputSelector 
            devices={audioDevices}
            selectedDeviceId={selectedDeviceId}
            onDeviceChange={changeDevice}
            disabled={isInitialized}
          />
          <InstrumentSelector {...instrumentData} />
          <FrequencyDisplay frequency={frequency} note={note} />
          <PitchMeter 
            frequency={frequency} 
            note={note} 
            targetTuning={instrumentData.getCurrentTuning()}
          />
          <StringIndicator 
            tuning={instrumentData.getCurrentTuning()}
            currentNote={note}
          />
          <div className="text-center mt-4">
            <p className="mb-2">powered by:</p>
            <img alt="logo" src={logo} />
          </div>
        </Col>
      </Row>
      
      <FrequencySelector 
        show={showFreqSelector}
        onHide={() => setShowFreqSelector(false)}
        onSelectFrequency={setReferenceFreq}
        currentFrequency={referenceFreq}
      />
    </Container>
  );
}

export default TunerDisplay;