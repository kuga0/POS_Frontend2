'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function HomePage() {
  const [greeting, setGreeting] = useState<string>('');
  const [testVariable, setTestVariable] = useState<string | undefined>(undefined); // テスト用の環境変数
  const router = useRouter();

  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const apiBaseUrl = 'https://tech0-gen-7-step4-studentwebapp-pos-4-gyazakdjdne5h0a3.eastus-01.azurewebsites.net';
        const response = await axios.get<{ message: string }>(`${apiBaseUrl}/greeting`);
        setGreeting(response.data.message);
      } catch (error) {
        console.error('挨拶メッセージの取得に失敗しました:', error);
      }
    };
    fetchGreeting();

    // 環境変数のテスト用コード
    const testValue = process.env.NEXT_PUBLIC_TEST_VARIABLE;
    console.log('Test Variable from Azure:', testValue);
    setTestVariable(testValue);
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

      {/* 環境変数のテスト表示部分 */}
      <div style={{ marginTop: '30px', backgroundColor: '#f3f4f6', padding: '20px', borderRadius: '8px' }}>
        <h2>Test Variable:</h2>
        <p>{testVariable ? testVariable : '環境変数が読み込まれていません'}</p>
      </div>
    </div>
  );
}

