// 엔트리 파일 => 프론트 요청이 여기로 들어옴.
// 노드JS의 진입점이 되는 파일.

const express = require('express');

const path = require('path');
const cors = require('cors')
const app = express();
const port = 4001;

app.get('/',(req,res) =>{
    res.send('안녕하세요');
})

//////////미들웨어 사용 app.use 사용

// static => 정적인 파일 제공 가능해짐
app.use(express.static(path.join(__dirname,'../uploads'))); // 이러면 이제 uploads 폴더에 있는 파일들을 클라이언트에게 전달 가능.

//cors => origin이 다르면 서로 통신 못함 (4000 != 3000) => Cross- Origin Resource Sharing (CORS) 사용해서 교차 출처 자원 공유를 해야함.
app. use(cors());



// 서버 실행
app.listen(port, () => {console.log(`${port}번에서 실행 되었습니다.`)}); // 서버 실행할때 node index.js 치기.

// nodemon index.js 얘 쓰면 자동 재시작. => 서버 다시 켜짐.

// 필수 패키지 이것저것... 
// npm install bcryptjs cors dotenv jsonwebtoken mongoose
