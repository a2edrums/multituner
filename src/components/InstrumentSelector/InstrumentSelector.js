import React from 'react';
import { Row, Col, Form } from 'react-bootstrap';

function InstrumentSelector({ 
  selectedInstrument, 
  selectedTuning, 
  setSelectedInstrument, 
  setSelectedTuning,
  getInstrumentList,
  getTuningList 
}) {
  const handleInstrumentChange = (e) => {
    setSelectedInstrument(e.target.value);
    setSelectedTuning('standard'); // Reset to standard tuning
  };

  return (
    <Row className="mb-4">
      <Col md={6}>
        <Form.Group>
          <Form.Label>Instrument</Form.Label>
          <Form.Select 
            value={selectedInstrument}
            onChange={handleInstrumentChange}
            className="bg-secondary text-light border-secondary"
          >
            {getInstrumentList().map(instrument => (
              <option key={instrument.id} value={instrument.id}>
                {instrument.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
      <Col md={6}>
        <Form.Group>
          <Form.Label>Tuning</Form.Label>
          <Form.Select 
            value={selectedTuning}
            onChange={(e) => setSelectedTuning(e.target.value)}
            className="bg-secondary text-light border-secondary"
          >
            {getTuningList().map(tuning => (
              <option key={tuning.id} value={tuning.id}>
                {tuning.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Col>
    </Row>
  );
}

export default InstrumentSelector;