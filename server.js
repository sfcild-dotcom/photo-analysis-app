
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// 빌드된 정적 파일 서비스 (Vite 빌드 후 dist 폴더 기준)
app.use(express.static(path.join(__dirname, 'dist')));

// 모든 경로에 대해 index.html 반환 (SPA 설정)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 실행 중입니다.`);
});
