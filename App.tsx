
import React, { useState } from 'react';

function App() {
  const [analyzing, setAnalyzing] = useState(false);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>띄부띄부 사진 분석기</h1>
      <p>원고 작성을 위한 사진 14장을 업로드해 주세요.</p>
      
      <div style={{ border: '2px dashed #ccc', padding: '40px', textAlign: 'center', marginBottom: '20px' }}>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={() => setAnalyzing(true)}
          style={{ display: 'block', margin: '0 auto' }}
        />
        <p style={{ marginTop: '10px', color: '#666' }}>사진 14장을 한꺼번에 선택해 주세요.</p>
      </div>

      {analyzing && (
        <div style={{ background: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
          <h3>AI 분석 리포트 생성 중...</h3>
          <p>분석이 완료되면 여기에 텍스트가 나타납니다. 해당 내용을 복사해서 저에게 알려주세요!</p>
        </div>
      )}
    </div>
  );
}

export default App;
