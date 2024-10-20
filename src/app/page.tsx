'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function HomePage() {
  const [greeting, setGreeting] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        // ここにバックエンドのURLを直打ち
        const apiBaseUrl = 'https://tech0-gen-7-step4-studentwebapp-pos-4-gyazakdjdne5h0a3.eastus-01.azurewebsites.net';
        console.log('Using hardcoded API URL:', apiBaseUrl);
        const response = await axios.get<{ message: string }>(`${apiBaseUrl}/greeting`);
        setGreeting(response.data.message);
      } catch (error) {
        console.error('挨拶メッセージの取得に失敗しました:', error);
      }
    };
    fetchGreeting();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{greeting}</h1>
      <button 
        onClick={() => router.push('/pos-app')} 
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#1E3A8A',
          color: 'white',
          borderRadius: '8px',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0F172A'}
        onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1E3A8A'}
      >
        アプリを起動
      </button>
    </div>
  );
}


