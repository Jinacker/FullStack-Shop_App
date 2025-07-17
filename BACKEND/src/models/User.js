// 몽고DB 스키마 생성 => 몽구스 이용 ! => 몽구스는 다양한 기능들을 제공한다 몽고디비 더 편하게 쓰게해줌 ex) 유효성 검사

const {default: mongoose } = require("mongoose");

// 스키마 생성 (테이블 생성)
// 몽고 디비에서는 sql이랑 명칭이 좀 다름 ex) pk == _id
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true, // 빈칸 없애기
        unique:true
    },
    password: {
        type: String,
        minLength:5
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String
})

// npm install bcryptjs --save => 설치 복호화 라이브러리 => salt 랜덤하게 생성 => Hash에 곁들여 사용해서 보완.
// Hash로 암호화하면 양방향이 아니라 단방향 암호화는 가능한데 복호화는 불가능 => 보안에 좋다~
//비크립트 이용해서 유저 비번을 암호화해서 DB에 저장 
// 꼭 이 위치에 있어야함.

//import * as bcrypt from 'bcryptjs'; => 현재 commonJS 형식으로 모듈 연결이 되어있어서 import 쓰면 안됨 ㅠ
const bcrypt = require("bcryptjs"); // 이렇게 import

userSchema.pre('save', async function (next) {
    let user = this;

    if (user.isModified('password')) { // 비번 수정될때만
        const salt = await bcrypt.genSalt(10); // 소금쳐서 => 소금은 비크립트로 랜덤값 들어감.
        const hash = await bcrypt.hash(user.password, salt); // 소금까지 넣어서 해쉬 => 비번 암호화.
        user.password = hash; // 패스워드를 해쉬로 저장.
    }

    next();
});

const User = mongoose.model("User",userSchema); // 스키마를 모델로 생성

module.exports = User; // 모델을 모듈로 만듬 => 다른곳에서도 쓸수있다.