
import React, { useState } from 'react';

function App() {
  const [analyzing, setAnalyzing] = useState(false);

  return (
    <div style={{ backgroundColor: '#1a1f2e', color: '#fff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#ff69b4', fontSize: '32px', marginBottom: '10px' }}>✨ 띄부띄부 사진 분석기</h1>
        <p style={{ color: '#ccc', fontSize: '14px' }}>1장부터 14장까지 원하는 수의 사진을 업로드하면 Gemini가 생생하게 분석해 드립니다.</p>
        <p style={{ color: '#aaa', fontSize: '13px' }}>12장으로도 충분히 멋진 분석이 가능합니다!</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '15px', maxWidth: '1000px', margin: '0 auto' }}>
        {[...Array(14)].map((_, i) => (
          <div key={i} style={{ border: '2px dashed #4a5568', borderRadius: '8px', padding: '20px 10px', backgroundColor: '#2d3748' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🖼️</div>
            <div style={{ fontSize: '12px', color: '#a0aec0' }}>사진 #{i + 1}</div>
            <div style={{ fontSize: '10px', color: '#718096' }}>클릭 또는 드래그</div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => setAnalyzing(true)}
        style={{ marginTop: '40px', backgroundColor: '#4a5568', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        ✨ 분석 시작하기
      </button>

      {analyzing && (
        <div style={{ marginTop: '40px', background: '#2d3748', padding: '30px', borderRadius: '12px', maxWidth: '800px', margin: '40px auto' }}>
          <h3 style={{ color: '#ff69b4' }}>🚀 AI 현장 분석 리포트 생성 중...</h3>
          <p style={{ color: '#ccc' }}>결과가 나오면 텍스트를 복사해서 저에게 알려주세요!</p>
        </div>
      )}
    </div>
  );
}

export default App;
