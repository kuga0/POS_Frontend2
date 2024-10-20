'use client';

import { FC } from 'react';

interface PurchaseButtonProps {
  handlePurchase: () => void;
}

const PurchaseButton: FC<PurchaseButtonProps> = ({ handlePurchase }) => {
  return (
    <button 
      onClick={handlePurchase} 
      className="purchase-button"
    >
      購入
    </button>
  );
};

export default PurchaseButton;
