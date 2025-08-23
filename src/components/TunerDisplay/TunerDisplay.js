import React from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { useAudioInput } from '../../hooks/useAudioInput';
import { usePitchDetection } from '../../hooks/usePitchDetection';
import { useInstrumentData } from '../../hooks/useInstrumentData';
import PitchMeter from '../PitchMeter/PitchMeter';
import FrequencyDisplay from '../FrequencyDisplay/FrequencyDisplay';
import InstrumentSelector from '../InstrumentSelector/InstrumentSelector';
import StringIndicator from '../StringIndicator/StringIndicator';

function TunerDisplay() {
  const { isInitialized, error, initialize, getAudioData, getSampleRate } = useAudioInput();
  const { frequency, note } = usePitchDetection(getAudioData, getSampleRate, isInitialized);
  const instrumentData = useInstrumentData();

  return (
    <Container fluid className="bg-dark text-light min-vh-100 py-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <h1 className="text-center mb-4">Multi-Instrument Tuner</h1>
          
          {error && (
            <Alert variant="danger" className="mb-4">
              {error}
            </Alert>
          )}
          
          {!isInitialized ? (
            <div className="text-center">
              <Button 
                variant="primary" 
                size="lg" 
                onClick={initialize}
                className="mb-4"
              >
                Start Tuner
              </Button>
              <p className="text-muted">
                Click to enable microphone access
              </p>
            </div>
          ) : (
            <>
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
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default TunerDisplay;