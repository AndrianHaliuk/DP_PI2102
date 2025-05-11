import React from 'react';

interface ProgressProps {
  value: number;
}

export const Progress: React.FC<ProgressProps> = ({ value }) => (
  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
    />
  </div>
);