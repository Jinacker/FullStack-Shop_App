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

const User = mongoose.model("User",userSchema); // 스키마를 모델로 생성

module.exports = User; // 모델을 모듈로 만듬 => 다른곳에서도 쓸수있다.