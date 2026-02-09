const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();

// 1. 발급받은 새 API 키를 여기에 넣으세요
const genAI = new GoogleGenerativeAI("여기에_새_API_키_입력");

// 2. 모델 설정 (현재 리스트에 있는 2.0 버전 명칭 사용)
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

app.post("/api/generate", async (req, res) => {
  try {
    const { images } = req.body; 

    // 작가님의 '사진 설명' 전용 프롬프트
    const prompt = `
      너는 사진 분석 전문 작가야. 업로드된 사진들을 보고 다음 규칙을 엄격히 지켜서 작성해줘.
      1. 각 사진의 파일명(예: 01.jpg)을 첫 줄에 쓴다.
      2. 사진 속 사물, 색감, 텍스트, 분위기를 3~4줄로 아주 상세하게 묘사한다.
      
      예시:
      01.jpg
      연두색 표지의 PRESTIGE CLASS 안내문 클로즈업.
      중앙에 정갈한 폰트로 문구가 적혀 있으며 손으로 가볍게 쥐고 있는 모습.
    `;

    const imageParts = images.map((img) => ({
      inlineData: { data: img.base64, mimeType: img.mimeType },
    }));

    // 분석 요청 (2.0 모델은 멀티모달 성능이 더 뛰어납니다)
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    
    res.json({ text: response.text() });
  } catch (error) {
    console.error("Gemini 에러:", error);
    res.status(500).json({ error: "분석 중 오류가 발생했습니다." });
  }
});
