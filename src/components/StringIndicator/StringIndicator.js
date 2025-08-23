import React from 'react';

function StringIndicator({ tuning, currentNote }) {
  if (!tuning || !tuning.notes) return null;

  const isStringInTune = (targetNote, current) => {
    if (!current || !targetNote) return false;
    const targetBase = targetNote.replace(/\d+/, '');
    const currentBase = current.note;
    return targetBase === currentBase && Math.abs(current.cents) < 10;
  };

  return (
    <div className="mt-4 p-3 bg-secondary rounded">
      <div className="d-flex justify-content-center align-items-center">
        {tuning.notes.slice().reverse().map((note, index) => (
          <div key={index} className="text-center mx-2">
            <div className="fw-bold mb-1">{note.replace(/\d+/, '')}</div>
            <div 
              className="rounded-circle mx-auto"
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: isStringInTune(note, currentNote) ? '#28a745' : '#dc3545'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default StringIndicator;