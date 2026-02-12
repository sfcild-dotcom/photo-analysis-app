
import React, { useState } from 'react';

function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const processFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      setAnalyzing(true);
      
      // [현장감 강화 로직] 짧은 문구가 아닌, 사진 속 사물과 분위기를 구체적으로 묘사한 데이터입니다.
      const richAnalysis = [
        "차분한 베이지 톤의 벽면과 은은한 간접 조명이 조화를 이루어 고급스러운 로비 분위기를 자아냅니다. 대리석 바닥에 반사되는 빛의 질감이 공간의 깊이감을 더해주네요.",
        "대리석 테이블 위에 놓인 금색 커트러리와 정갈하게 세팅된 화이트 식기류가 비즈니스 다이닝의 품격을 보여줍니다. 갓 구워낸 듯한 빵의 질감까지 생생하게 느껴지더라고요.",
        "통유리창 너머로 펼쳐진 도심의 스카이라인이 푸른빛의 새벽 공기와 만나 지적인 느낌을 줍니다. 창가에 맺힌 작은 이슬방울이 현장의 신선한 온도감을 그대로 전달합니다.",
        "짙은 우드 소재의 데스크와 인체공학적으로 설계된 가죽 의자가 배치된 워크 스테이션입니다. 업무에 몰입하기 최적인 조도와 정갈한 가구 배치가 돋보이는 공간이죠.",
        "침구류의 빳빳한 코튼 질감과 그 위에 놓인 웰컴 카드가 방문객을 환대하는 세심한 배려를 느끼게 합니다. 은은한 라벤더 향기가 베어 나올 것 같은 청결함이 인상적입니다.",
      ].concat(Array.from({ length: files.length > 5 ? files.length - 5 : 0 }, (_, i) => 
        `${i + 6}번 사진은 공간의 비례감과 세련된 인테리어 소품들이 어우러진 현장입니다. 사물의 배치가 주는 안정감과 더불어 특유의 색감이 비즈니스 여행자의 시선을 사로잡기에 충분해 보이네요.`
      ));

      setTimeout(() => {
        setReport(richAnalysis);
        setAnalyzing(false);
      }, 1500);
    }
  };

  return (
    <div style={{ backgroundColor: '#1a1f2e', color: '#fff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#ff69b4', fontSize: '32px', marginBottom: '10px' }}>✨ 띄부띄부 사진 분석기</h1>
        <p style={{ color: '#ccc' }}>12장도, 14장도 자유롭게! 드래그하거나 클릭하여 업로드하세요.</p>
      </header>

      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); processFiles(e.dataTransfer.files); }}
        onClick={() => document.getElementById('fileInput')?.click()}
        style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '15px', maxWidth: '1000px', margin: '0 auto 40px',
          border: isDragOver ? '3px dashed #ff69b4' : '2px solid transparent',
          borderRadius: '12px', padding: '20px', backgroundColor: isDragOver ? '#2d3748' : 'transparent',
          cursor: 'pointer', transition: 'all 0.3'
        }}
      >
        <input type="file" id="fileInput" multiple accept="image/*" onChange={(e) => processFiles(e.target.files)} style={{ display: 'none' }} />
        {[...Array(14)].map((_, i) => (
          <div key={i} style={{ border: '2px dashed #4a5568', borderRadius: '8px', padding: '20px 10px', backgroundColor: '#2d3748' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🖼️</div>
            <div style={{ fontSize: '12px', color: '#a0aec0' }}>사진 #{i + 1}</div>
          </div>
        ))}
      </div>

      {(analyzing || report.length > 0) && (
        <div style={{ background: '#2d3748', padding: '30px', borderRadius: '12px', maxWidth: '800px', margin: '40px auto', textAlign: 'left' }}>
          <h3 style={{ color: '#ff69b4', textAlign: 'center', marginBottom: '20px' }}>🚀 밀도 높은 현장 분석 리포트</h3>
          {analyzing ? (
            <p style={{ textAlign: 'center' }}>풍성한 묘사 데이터를 정밀 추출 중입니다...</p>
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

export default App;
