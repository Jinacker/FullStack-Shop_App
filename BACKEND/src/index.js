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
    throw new Error('it is an error'); // 이렇게 에러 내면 => 서버가 다운되어버림 => 에러처리기 필요.
})

// HTTP POST 메서드
app.post('/',(req,res)=> {
    console.log(req.body);
    res.json(req.body);
})

/////////////////////

// 에러 처리기 => 에러 받아서 처리 => 이제 서버 다운(크래쉬) 안됨 !
// 실행 메서드 아래에 위치해야함.
app.use((error,req,res,next)=>{
    res.status(err.status || 500); // 이렇게 에러 상태코드랑
    res.send(error.message || "서버에 에러가 났습니다"); // 에러 메세지 출력. || 없는거는 여기로 가서 실행됨.
})

// 근데 비동기 에러처리는 못함!! => 비동기 에러처리는 next()로 감싸줘서 처리해야 에러 처리기한테 들어감.


// 서버 실행
app.listen(port, () => {console.log(`${port}번에서 실행 되었습니다.`)}); // 서버 실행할때 node index.js 치기.

// nodemon index.js 얘 쓰면 자동 재시작. => 서버 다시 켜짐.

// 필수 패키지 이것저것... 
// npm install bcryptjs cors dotenv jsonwebtoken mongoose
