import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function FrequencySelector({ show, onHide, onSelectFrequency, currentFrequency }) {
  const [frequency, setFrequency] = useState(currentFrequency || 440);

  const presetFrequencies = [432, 440, 442, 444];

  const handleSave = () => {
    onSelectFrequency(frequency);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered data-bs-theme="dark">
      <Modal.Header closeButton className="bg-dark text-light border-secondary">
        <Modal.Title>Select Reference Frequency (A4)</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark text-light">
        <div className="mb-3">
          {presetFrequencies.map(freq => (
            <Button
              key={freq}
              variant={frequency === freq ? "primary" : "outline-primary"}
              className="me-2 mb-2"
              onClick={() => setFrequency(freq)}
            >
              {freq} Hz
            </Button>
          ))}
        </div>
        <Form.Group>
          <Form.Label>Custom Frequency</Form.Label>
          <Form.Control
            type="number"
            min="400"
            max="480"
            value={frequency}
            onChange={(e) => setFrequency(Number(e.target.value))}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer className="bg-dark border-secondary">
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary" onClick={handleSave}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FrequencySelector;