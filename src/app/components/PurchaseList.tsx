'use client';

import { FC } from 'react';

interface PurchaseItem {
  code: string;
  name: string;
  price: number;
  quantity: number;
}

interface PurchaseListProps {
  purchaseList: PurchaseItem[];
  selectItem: (item: PurchaseItem) => void;
  removeSelectedItem: () => void;
  selectedItem: PurchaseItem | null;
}

const PurchaseList: FC<PurchaseListProps> = ({ purchaseList, selectItem, removeSelectedItem, selectedItem }) => {
  return (
    <div>
      <h3 className="section-title">購入リスト</h3>
      <ul className="purchase-list">
        {purchaseList.map((item, index) => (
          <li 
            key={index} 
            onClick={() => selectItem(item)} 
            className={`purchase-item ${selectedItem && selectedItem.code === item.code ? 'selected' : ''}`}
          >
            {item.name} - {item.price}円 × {item.quantity}
            <button 
              onClick={removeSelectedItem} 
              className="remove-button"
            >
              削除
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PurchaseList;
