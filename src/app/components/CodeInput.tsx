'use client';

import { FC } from 'react';

interface CodeInputProps {
  scannedCode: string;
  setScannedCode: (code: string) => void;
  handleCodeInput: () => void;
}

const CodeInput: FC<CodeInputProps> = ({ scannedCode, setScannedCode, handleCodeInput }) => {
  return (
    <div className="code-input">
      <input 
        type="text" 
        value={scannedCode}
        onChange={(e) => setScannedCode(e.target.value)} 
        placeholder="コード入力"
        className="input-field"
      />
      <button 
        onClick={handleCodeInput} 
        className="control-button"
      >
        コードで商品追加
      </button>
    </div>
  );
};

export default CodeInput;
