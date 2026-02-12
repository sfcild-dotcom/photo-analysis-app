
import React, { useState } from 'react';

// 사진 속 맨 윗줄(...Ddmg) 최신 키를 여기에 정확히 넣어주세요. [cite: 2026-02-12]
const GEMINI_API_KEY = "AIzaSyDmg_여기에_복사한_키_붙여넣기"; 

function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const processFiles = (uploadedFiles: FileList | null) => {
    if (uploadedFiles) {
      const fileArray = Array.from(uploadedFiles);
      setFiles(prev => [...prev, ...fileArray].slice(0, 14));
      const newPreviews = fileArray.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews].slice(0, 14));
      setReport([]);
    }
  };

  const startAnalysis = async () => {
    if (files.length === 0) return alert("분석할 사진을 먼저 올려주세요!");
    setAnalyzing(true);

    try {
      const results = await Promise.all(
        files.map(async (file) => {
          const reader = new FileReader();
          const base64Data = await new Promise<string>((resolve) => {
            reader.onload = () => resolve((reader.result as string).split(',')[1]);
            reader.readAsDataURL(file);
          });

          // [해결] 가장 범용적인 v1 버전 경로로 수정했습니다. [cite: 2026-02-12]
          const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: "15년 차 전문 작가의 시선으로 이 사진의 인테리어, 사물의 질감, 색감, 분위기를 아주 풍성하게 묘사해줘. 안내 문구 없이 본론만 서술할 것." },
                  { inline_data: { mime_type: file.type, data: base64Data } }
                ]
              }]
            })
          });

          const data = await response.json();
          if (data.error) throw new Error(data.error.message);
          return data.candidates[0].content.parts[0].text;
        })
      );
      setReport(results);
    } catch (error: any) {
      alert(`분석 오류: ${error.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#1a1f2e', color: '#fff', minHeight: '100vh', padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#ff69b4', fontSize: '32px' }}>✨ 띄부띄부 사진 분석기</h1>
        <p style={{ color: '#ccc' }}>드래그 기능과 API 경로가 모두 정상화되었습니다.</p>
      </header>

      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); processFiles(e.dataTransfer.files); }}
        onClick={() => document.getElementById('fileInput')?.click()}
        style={{ 
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '15px', maxWidth: '1100px', margin: '0 auto 40px',
          border: isDragOver ? '3px dashed #ff69b4' : '2px solid transparent',
          borderRadius: '12px', padding: '20px', backgroundColor: isDragOver ? '#2d3748' : 'transparent',
          cursor: 'pointer'
        }}
      >
        <input type="file" id="fileInput" multiple accept="image/*" onChange={(e) => processFiles(e.target.files)} style={{ display: 'none' }} />
        {[...Array(14)].map((_, i) => (
          <div key={i} style={{ border: '2px dashed #4a5568', borderRadius: '8px', height: '120px', overflow: 'hidden', backgroundColor: '#2d3748', position: 'relative' }}>
            {previews[i] ? <img src={previews[i]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ paddingTop: '40px', color: '#718096' }}>📸 #{i+1}</div>}
            <div style={{ position: 'absolute', bottom: '5px', right: '5px', fontSize: '10px', background: 'rgba(0,0,0,0.5)', padding: '2px 5px' }}>#{i+1}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
        <button onClick={startAnalysis} style={{ backgroundColor: '#ff69b4', color: '#fff', padding: '15px 40px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>{analyzing ? "⌛ 분석 중..." : "✨ 분석 시작하기"}</button>
        <button onClick={() => { setPreviews([]); setFiles([]); setReport([]); }} style={{ backgroundColor: '#4a5568', color: '#fff', padding: '15px 40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>🔄 초기화</button>
      </div>

      {report.length > 0 && (
        <div style={{ background: '#2d3748', padding: '30px', borderRadius: '12px', maxWidth: '850px', margin: '40px auto', textAlign: 'left' }}>
          <h3 style={{ color: '#ff69b4', textAlign: 'center', marginBottom: '20px' }}>🚀 정밀 현장 분석 리포트</h3>
          {report.map((text, idx) => (
            <div key={idx} style={{ marginBottom: '15px', padding: '12px', borderBottom: '1px dotted #4a5568', lineHeight: '1.6' }}>
              <strong>[사진 {idx + 1}]</strong> {text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
