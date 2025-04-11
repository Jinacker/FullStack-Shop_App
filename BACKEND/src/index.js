// 엔트리 파일 => 프론트 요청이 여기로 들어옴.
// 노드JS의 진입점이 되는 파일.

const express = require('express');

const app = express();
const port = 4001;

app.get('/',(req,res) =>{
    res.send('안녕하세요');
})

app.listen(port, () => {console.log(`${port}번에서 실행 되었습니다.`)}); // 서버 실행할때 node index.js 치기.

// nodemon index.js 얘 쓰면 자동 재시작. => 서버 다시 켜짐.

// 필수 패키지 이것저것... 
// npm install bcryptjs cors dotenv jsonwebtoken mongoose
