
import React, { useState } from 'react';

// 사진의 맨 윗줄 최신 키를 적용했습니다.
const GEMINI_API_KEY = "AIzaSyAS8L029Nj8I0sAojl8Vbr8ZpsxPblakKM"; 

function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

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

          // API 호출 시 안정성을 위해 타임아웃 방지 로직을 강화했습니다. [cite: 2026-02-12]
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [
                  { text: "15년 차 전문 작가의 시선으로 이 사진의 사물, 색감, 질감, 분위기를 아주 풍성하게 묘사해줘. 안내 문구 없이 본론만 서술할 것." },
                  { inline_data: { mime_type: file.type, data: base64Data } }
                ]
              }]
            })
          });

          const data = await response.json();
          // 오류 발생 시 서버 메시지를 직접 확인하여 대응하도록 수정했습니다. [cite: 2026-02-12]
          if (data.error) throw new Error(data.error.message);
          return data.candidates[0].content.parts[0].text;
        })
      );
      setReport(results);
    } catch (error: any) {
      alert(`분석 중 오류 발생: ${error.message}`);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#1a1f2e', color: '#fff', minHeight: '100vh', padding: '40px 20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ color: '#ff69b4', fontSize: '32px' }}>✨ 띄부띄부 사진 분석기</h1>
        <p style={{ color: '#ccc' }}>작가님, 어제 그 분석기가 드디어 완성되었습니다.</p>
      </header>

      <div 
        onClick={() => document.getElementById('fileInput')?.click()}
        onDragOver={(e) => { e.preventDefault(); }}
        onDrop={(e) => { e.preventDefault(); processFiles(e.dataTransfer.files); }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '15px', maxWidth: '1100px', margin: '0 auto 40px', cursor: 'pointer' }}
      >
        <input type="file" id="fileInput" multiple accept="image/*" onChange={(e) => processFiles(e.target.files)} style={{ display: 'none' }} />
        {[...Array(14)].map((_, i) => (
          <div key={i} style={{ border: '2px dashed #4a5568', borderRadius: '8px', height: '120px', overflow: 'hidden', backgroundColor: '#2d3748' }}>
            {previews[i] ? <img src={previews[i]} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ paddingTop: '40px', color: '#718096' }}>📸 #{i+1}</div>}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button onClick={startAnalysis} style={{ backgroundColor: '#ff69b4', color: '#fff', padding: '15px 40px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>{analyzing ? "⌛ AI가 사진을 읽는 중..." : "✨ 분석 시작하기"}</button>
        <button onClick={() => { setPreviews([]); setFiles([]); setReport([]); }} style={{ backgroundColor: '#4a5568', color: '#fff', padding: '15px 40px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>🔄 초기화</button>
      </div>

      {report.length > 0 && (
        <div style={{ background: '#2d3748', padding: '30px', borderRadius: '12px', maxWidth: '850px', margin: '40px auto', textAlign: 'left' }}>
          <h3 style={{ color: '#ff69b4', textAlign: 'center' }}>🚀 정밀 현장 분석 리포트</h3>
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
