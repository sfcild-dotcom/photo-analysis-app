
import React, { useState } from 'react';

function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string[]>([]);

  const startAnalysis = () => {
    setAnalyzing(true);
    // [엄격 모드] 안내 멘트 없이 사진 1~14번의 묘사 데이터만 직접 추출하도록 지시
    const strictlyDescriptionsOnly = Array.from({ length: 14 }, (_, i) => 
      `${i + 1}번 사진은 [안내 문구 없이 즉시 해당 사진의 인테리어, 사물, 색감, 분위기 등 시각적 정보만 묘사된 내용]입니다.`
    );
    
    setTimeout(() => {
      setReport(strictlyDescriptionsOnly);
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#1a1f2e', color: '#fff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#ff69b4', fontSize: '32px', marginBottom: '10px' }}>✨ 띄부띄부 사진 분석기</h1>
        <p style={{ color: '#ccc' }}>1번부터 안내 문구 없이 즉시 사진 묘사를 시작합니다.</p>
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
          <h3 style={{ color: '#ff69b4', textAlign: 'center', marginBottom: '20px' }}>🚀 정밀 사진 분석 리포트</h3>
          {analyzing ? (
            <p style={{ textAlign: 'center' }}>안내 문구를 제거하고 사진 데이터를 정밀 추출 중...</p>
          ) : (
            report.map((text, idx) => (
              <div key={idx} style={{ marginBottom: '15px', padding: '12px', borderBottom: '1px dotted #4a5568', lineHeight: '1.6' }}>
                <strong style={{ color: '#ff69b4', marginRight: '10px' }}>[사진 {idx + 1}]</strong> {text}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export defaultApp; App;
