'use client';

import { FC } from 'react';

interface Product {
  code: string;
  name: string;
  price: number;
}

interface ProductListProps {
  products: Product[];
  addToPurchaseList: (product: Product) => void;
}

const ProductList: FC<ProductListProps> = ({ products, addToPurchaseList }) => {
  return (
    <div>
      <h3 className="section-title">商品マスタ一覧</h3>
      <ul className="product-list">
        {products.map((product, index) => (
          <li key={index} className="product-item">
            {product.name} - {product.price}円
            <button 
              onClick={() => addToPurchaseList(product)} 
              className="add-button"
            >
              追加
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
