// 엔트리 파일 => 프론트 요청이 여기로 들어옴.
// 노드JS의 진입점이 되는 파일.

const express = require('express');

const path = require('path');

const cors = require('cors')
const app = express();
const mongoose = require('mongoose')

const dotenv = require('dotenv') // 환경변수 사용
dotenv.config(); // 연결

const port = 4001;

//////////미들웨어 등록 app.use 사용

// static => 정적인 파일 제공 가능해짐
app.use(express.static(path.join(__dirname,'../uploads'))); // 이러면 이제 uploads 폴더에 있는 파일들을 클라이언트에게 전달 가능.

//cors => origin이 다르면 서로 통신 못함 (4000 != 3000) => Cross- Origin Resource Sharing (CORS) 사용해서 교차 출처 자원 공유를 해야함.
app.use(cors());

//express.json => JSON 쓸수있게됨. 파싱 가능
app.use(express.json());
 
// 몽고DB 연결 => npm install mongoose => 몽고디비 코넥트 url + 패스워드 기입
mongoose.connect(process.env.MONGO_URI) // github에 이 코넥트 url 올라가면 안되니까 env.에 환경변수로 만들어서 넣기. => env.는 깃이그노어됨.
.then(()=>{
    console.log('연결완료');
}) 
.catch(err=>{
    console.error(err);
})
///////////////////


// HTTP GET 메서드
app.get('/',(req,res) =>{
    res.send('안녕하세요');
})

// HTTP POST 메서드
app.post('/',(req,res)=> {
    console.log(req.body);
    res.json(req.body);
})


// 서버 실행
app.listen(port, () => {console.log(`${port}번에서 실행 되었습니다.`)}); // 서버 실행할때 node index.js 치기.

// nodemon index.js 얘 쓰면 자동 재시작. => 서버 다시 켜짐.

// 필수 패키지 이것저것... 
// npm install bcryptjs cors dotenv jsonwebtoken mongoose
