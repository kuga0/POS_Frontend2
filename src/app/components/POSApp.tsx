'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Quagga from 'quagga';
import ProductList from './ProductList';
import PurchaseList from './PurchaseList';
import ScannerControls from './ScannerControls';
import CodeInput from './CodeInput';
import PurchaseButton from './PurchaseButton';

interface Product {
  code: string;
  name: string;
  price: number;
}

interface PurchaseItem extends Product {
  quantity: number;
}

export default function POSApp() {
  const [products, setProducts] = useState<Product[]>([]);
  const [purchaseList, setPurchaseList] = useState<PurchaseItem[]>([]);
  const [scannedCode, setScannedCode] = useState<string>('');
  const [selectedItem, setSelectedItem] = useState<PurchaseItem | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const videoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await axios.get<Product[]>(`${apiBaseUrl}/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('商品一覧取得エラー:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const totalAmount = purchaseList.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalAmount);
  }, [purchaseList]);

  const addToPurchaseList = (product: Product) => {
    const existingItem = purchaseList.find(item => item.code === product.code);
    if (existingItem) {
      setPurchaseList(purchaseList.map(item =>
        item.code === product.code ? { ...item, quantity: Math.min(item.quantity + 1, 99) } : item
      ));
    } else {
      setPurchaseList([...purchaseList, { ...product, quantity: 1 }]);
    }
  };

  const startScanner = () => {
    Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: videoRef.current!,
            constraints: { facingMode: 'environment' }
          },
          decoder: { readers: ['ean_reader'] }
        },
        (err: Error | null) => {
          if (err) {
            console.error(err);
            return;
          }
          Quagga.start();
          setIsScanning(true);
        }
      );
      

    Quagga.onDetected((result: { codeResult?: { code?: string } }) => {
      if (result?.codeResult?.code) {
        const scannedCode = result.codeResult.code;
        setScannedCode(scannedCode);
        const product = products.find((p) => p.code === scannedCode);
        if (product) {
          addToPurchaseList(product);
          alert('リストに商品を追加しました！');
        } else {
          alert('商品が見つかりませんでした。');
        }
      } else {
        console.warn('コードの読み取りに失敗しました。');
      }
    });
  };

  const stopScanner = () => {
    Quagga.stop();
    setIsScanning(false);
  };

  return (
    <div className="app-container">
      <ScannerControls isScanning={isScanning} startScanner={startScanner} stopScanner={stopScanner} />
      <div ref={videoRef} className="video-container" style={{ display: isScanning ? 'block' : 'none' }}></div>
      <CodeInput scannedCode={scannedCode} setScannedCode={setScannedCode} handleCodeInput={() => {}} />
      <ProductList products={products} addToPurchaseList={addToPurchaseList} />
      <PurchaseList purchaseList={purchaseList} selectItem={() => {}} removeSelectedItem={() => {}} selectedItem={null} />
      <h3 className="section-title">合計: {total}円（税込）</h3>
      <PurchaseButton handlePurchase={() => {}} />
    </div>
  );
}
