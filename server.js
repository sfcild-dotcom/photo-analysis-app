
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Vercel 환경 변수에서 API 키를 가져옵니다.
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.post('/api/generate', async (req, res) => {
  try {
    const { image } = req.body;
    
    // 모델 설정 (현재 가장 안정적인 flash 모델 사용)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "이 사진의 시각적 요소(색감, 사물, 분위기)를 매우 구체적으로 설명해주세요.";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: image,
          mimeType: "image/png"
        }
      }
    ]);

    const response = await result.response;
    res.json({ text: response.text() });
  } catch (error) {
    console.error("Error details:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
