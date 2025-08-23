import React from 'react';
import { Container, Row, Col, Alert, Form } from 'react-bootstrap';
import { useAudioInput } from '../../hooks/useAudioInput';
import { usePitchDetection } from '../../hooks/usePitchDetection';
import { useInstrumentData } from '../../hooks/useInstrumentData';
import PitchMeter from '../PitchMeter/PitchMeter';
import FrequencyDisplay from '../FrequencyDisplay/FrequencyDisplay';
import InstrumentSelector from '../InstrumentSelector/InstrumentSelector';
import StringIndicator from '../StringIndicator/StringIndicator';
import logo from '../../logo.png'


function TunerDisplay() {
  const { isInitialized, error, initialize, getAudioData, getSampleRate } = useAudioInput();
  const { frequency, note } = usePitchDetection(getAudioData, getSampleRate, isInitialized);
  const instrumentData = useInstrumentData();

  return (
    <Container fluid className="bg-dark text-light min-vh-100 py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1>Multi-Instrument Tuner</h1>
            <Form.Check 
              type="switch"
              id="tuner-switch"
              label={isInitialized ? "ON" : "OFF"}
              checked={isInitialized}
              onChange={() => isInitialized ? window.location.reload() : initialize()}
              className="fs-5"
            />
          </div>
          
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}
          
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
    </Container>
  );
}

export default TunerDisplay;