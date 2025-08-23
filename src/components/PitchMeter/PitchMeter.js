import React from 'react';
import { Card } from 'react-bootstrap';
import './PitchMeter.css';

function PitchMeter({ frequency, note }) {
  const getCentsOffset = () => {
    return note ? Math.max(-50, Math.min(50, note.cents)) : 0;
  };

  const getIndicatorPosition = () => {
    const cents = getCentsOffset();
    return 50 + (cents * 0.8); // Scale to 0-100% range
  };

  const getIndicatorColor = () => {
    if (!note) return '#6c757d';
    const absCents = Math.abs(note.cents);
    if (absCents <= 5) return '#28a745';
    if (absCents <= 15) return '#ffc107';
    return '#dc3545';
  };

  return (
    <Card className="bg-secondary text-light">
      <Card.Body>
        <div className="pitch-meter">
          <div className="meter-scale">
            <div className="scale-mark" style={{left: '10%'}}>-40</div>
            <div className="scale-mark" style={{left: '30%'}}>-20</div>
            <div className="scale-mark center" style={{left: '50%'}}>0</div>
            <div className="scale-mark" style={{left: '70%'}}>+20</div>
            <div className="scale-mark" style={{left: '90%'}}>+40</div>
          </div>
          <div className="meter-track">
            <div 
              className="meter-indicator"
              style={{
                left: `${getIndicatorPosition()}%`,
                backgroundColor: getIndicatorColor()
              }}
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default PitchMeter;