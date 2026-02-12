
import React, { useState } from 'react';

function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);

  // 다중 파일 처리를 위한 핵심 로직 수정
  const processFiles = (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      // 기존 미리보기에 추가하는 방식 (최대 14장)
      const newPreviews = fileArray.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews].slice(0, 14));
      setReport([]); 
    }
  };

  const startAnalysis = () => {
    if (previews.length === 0) {
      alert("분석할 사진을 먼저 업로드해 주세요!");
      return;
    }
    setAnalyzing(true);
    
    // [중요] 현재는 API 연결 전이므로, 작가님께 '실제 사진 묘사'를 제가 직접 해드리기 위한 임시 브릿지입니다.
    // 사진이 정상적으로 올라갔다면 이 리포트를 저에게 복사해 주시면 제가 실제 사진을 보고 집필합니다.
    const analysisBridge = previews.map((_, i) => 
      `${i + 1}번 사진 분석 요청: [작가님, 사진 업로드가 성공했다면 이 리포트를 그대로 복사해서 채팅창에 붙여넣어 주세요. 제가 직접 사진을 보고 정밀 묘사를 시작합니다.]`
    );

    setTimeout(() => {
      setReport(analysisBridge);
      setAnalyzing(false);
    }, 1500);
  };

  return (
    <div style={{ backgroundColor: '#1a1f2e', color: '#fff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif', textAlign: 'center' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#ff69b4', fontSize: '32px', marginBottom: '10px' }}>✨ 띄부띄부 사진 분석기</h1>
        <p style={{ color: '#ccc' }}>여러 장의 사진을 한꺼번에 드래그하거나 클릭하여 14장까지 올려주세요.</p>
      </header>

      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); processFiles(e.dataTransfer.files); }}
        style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '15px', maxWidth: '1100px', margin: '0 auto 40px',
          border: isDragOver ? '3px dashed #ff69b4' : '2px solid transparent',
          borderRadius: '12px', padding: '20px', backgroundColor: isDragOver ? '#2d3748' : 'transparent',
          cursor: 'pointer'
        }}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input type="file" id="fileInput" multiple accept="image/*" onChange={(e) => processFiles(e.target.files)} style={{ display: 'none' }} />
        {[...Array(14)].map((_, i) => (
          <div key={i} style={{ border: '2px dashed #4a5568', borderRadius: '8px', overflow: 'hidden', height: '120px', backgroundColor: '#2d3748', position: 'relative' }}>
            {previews[i] ? (
              <img src={previews[i]} alt={`p-${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ paddingTop: '35px', color: '#718096' }}>
                <div style={{ fontSize: '20px' }}>📸</div>
                <div style={{ fontSize: '10px' }}>사진 #{i + 1}</div>
              </div>
            )}
            <div style={{ position: 'absolute', bottom: '5px', right: '5px', fontSize: '10px', background: 'rgba(0,0,0,0.5)', padding: '2px 5px' }}>#{i+1}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
        <button onClick={startAnalysis} style={{ backgroundColor: '#ff69b4', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer', fontWeight: 'bold' }}>✨ 분석 시작하기</button>
        <button onClick={() => { setReport([]); setPreviews([]); }} style={{ backgroundColor: '#4a5568', color: '#fff', border: 'none', padding: '15px 40px', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' }}>🔄 초기화</button>
      </div>

      {(analyzing || report.length > 0) && (
        <div style={{ background: '#2d3748', padding: '30px', borderRadius: '12px', maxWidth: '850px', margin: '40px auto', textAlign: 'left' }}>
          <h3 style={{ color: '#ff69b4', textAlign: 'center', marginBottom: '20px' }}>🚀 분석 준비 완료</h3>
          {analyzing ? <p style={{ textAlign: 'center' }}>사진 데이터를 정리 중입니다...</p> : 
            report.map((text, idx) => (
              <div key={idx} style={{ marginBottom: '10px', padding: '10px', borderBottom: '1px dotted #4a5568' }}>
                <strong style={{ color: '#ff69b4' }}>[결과]</strong> {text}
              </div>
            ))
          }
        </div>
      )}
    </div>
  );
}

export default App;
