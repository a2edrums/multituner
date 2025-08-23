import React from 'react';
import { Card } from 'react-bootstrap';

function FrequencyDisplay({ frequency, note }) {
  return (
    <Card className="bg-secondary text-light mb-4">
      <Card.Body className="text-center">
        <div className="display-4 mb-2">
          {note ? `${note.note}${note.octave}` : '--'}
        </div>
        <div className="h5 text-muted">
          {frequency ? `${frequency.toFixed(1)} Hz` : 'No signal'}
        </div>
        {note && note.cents !== 0 && (
          <div className={`h6 ${note.cents > 0 ? 'text-warning' : 'text-info'}`}>
            {note.cents > 0 ? '+' : ''}{note.cents} cents
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default FrequencyDisplay;