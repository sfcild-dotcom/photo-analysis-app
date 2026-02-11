
import React, { useState } from 'react';

function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string[]>([]);

  // 가상의 분석 실행 함수 (추후 Gemini API와 연결 시 이 로직이 리포트를 생성합니다)
  const startAnalysis = () => {
    setAnalyzing(true);
    // 불필요한 안내 문구를 배제하고 각 사진에 대한 묘사 데이터만 배열로 생성
    const mockData = Array.from({ length: 14 }, (_, i) => 
      `${i + 1}번 사진 분석 결과: [사진 ${i + 1}의 시각적 요소, 색감, 구체적 사물 묘사가 여기에 들어갑니다.]`
    );
    setTimeout(() => {
      setReport(mockData);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div style={{ backgroundColor: '#1a1f2e', color: '#fff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#ff69b4', fontSize: '32px', marginBottom: '10px' }}>✨ 띄부띄부 사진 분석기</h1>
        <p style={{ color: '#ccc' }}>안내 문구 없이 사진별 디테일 분석만 정밀하게 추출합니다.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '15px', maxWidth: '1000px', margin: '0 auto' }}>
        {[...Array(14)].map((_, i) => (
          <div key={i} style={{ border: '2px dashed #4a5568', borderRadius: '8px', padding: '20px 10px', backgroundColor: '#2d3748' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🖼️</div>
            <div style={{ fontSize: '12px', color: '#a0aec0' }}>사진 #{i + 1}</div>
          </div>
        ))}
      </div>

      <button 
        onClick={startAnalysis}
        style={{ marginTop: '40px', backgroundColor: '#4a5568', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        ✨ 분석 시작하기
      </button>

      {(analyzing || report.length > 0) && (
        <div style={{ marginTop: '40px', background: '#2d3748', padding: '30px', borderRadius: '12px', maxWidth: '800px', margin: '40px auto', textAlign: 'left' }}>
          <h3 style={{ color: '#ff69b4', textAlign: 'center' }}>🚀 실시간 현장 분석 데이터</h3>
          {analyzing ? (
            <p style={{ textAlign: 'center' }}>데이터를 정밀하게 추출 중입니다...</p>
          ) : (
            report.map((text, idx) => (
              <div key={idx} style={{ marginBottom: '15px', padding: '10px', borderBottom: '1px solid #4a5568' }}>
                <strong style={{ color: '#ff69b4' }}>[{idx + 1}]</strong> {text}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default App;
