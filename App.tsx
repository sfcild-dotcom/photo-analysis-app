
import React, { useState, useCallback } from 'react';

function App() {
  const [analyzing, setAnalyzing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      setAnalyzing(true);
      // 여기에 Gemini API 분석 로직이 연결됩니다.
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>띄부띄부 사진 분석기</h1>
      <p>원고에 사용할 사진을 자유롭게 업로드해 주세요. (드래그 가능)</p>
      
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        style={{ 
          border: isDragOver ? '3px dashed #007bff' : '2px dashed #ccc', 
          borderRadius: '12px',
          padding: '60px 20px', 
          textAlign: 'center', 
          backgroundColor: isDragOver ? '#f0f7ff' : '#fff',
          transition: 'all 0.3s ease',
          cursor: 'pointer'
        }}
      >
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={(e) => handleFiles(e.target.files)}
          style={{ display: 'none' }}
          id="fileInput"
        />
        <label htmlFor="fileInput" style={{ cursor: 'pointer' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>📸</div>
          <strong style={{ fontSize: '18px' }}>사진을 이곳에 드래그하거나 클릭하여 선택하세요</strong>
          <p style={{ color: '#888', marginTop: '10px' }}>사진 개수 제한 없이 자유롭게 추가 가능합니다.</p>
        </label>
      </div>

      {analyzing && (
        <div style={{ marginTop: '30px', background: '#f8f9fa', padding: '20px', borderRadius: '10px', borderLeft: '5px solid #007bff' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>🚀 AI 현장 분석 리포트 생성 중...</h3>
          <p style={{ color: '#555' }}>작가님이 올리신 사진의 디테일을 분석하고 있습니다. 완료 후 나타나는 텍스트를 복사해서 저에게 알려주세요!</p>
        </div>
      )}
    </div>
  );
}

export default App;
