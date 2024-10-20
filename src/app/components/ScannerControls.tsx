'use client';

import { FC } from 'react';

interface ScannerControlsProps {
  isScanning: boolean;
  startScanner: () => void;
  stopScanner: () => void;
}

const ScannerControls: FC<ScannerControlsProps> = ({ isScanning, startScanner, stopScanner }) => {
  return (
    <div className="scanner-controls">
      <button 
        onClick={startScanner} 
        className="control-button"
      >
        スキャン開始
      </button>
      {isScanning && (
        <button 
          onClick={stopScanner} 
          className="control-button"
        >
          スキャナーを停止
        </button>
      )}
    </div>
  );
};

export default ScannerControls;
