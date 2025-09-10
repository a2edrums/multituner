import React from 'react';
import { Form } from 'react-bootstrap';

function AudioInputSelector({ devices, selectedDeviceId, onDeviceChange, disabled }) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>Audio Input Source</Form.Label>
      <Form.Select 
        value={selectedDeviceId} 
        onChange={(e) => onDeviceChange(e.target.value)}
        disabled={disabled}
        className="bg-secondary text-light border-secondary"
      >
        {devices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Microphone ${device.deviceId.slice(0, 8)}`}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
}

export default AudioInputSelector;