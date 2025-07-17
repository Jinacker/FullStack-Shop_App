// index.js 에 안하는 이유 => 너무 지저분 해짐

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // 몽고DB 릴레이션 만든거 가져옴
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

// 인증 받는 api
router.get('/auth', auth, async (req, res, next) => {

    return res.json({ // middleware 에서 가져온 req.user 프로퍼티 안에서 정보 꺼내옴.
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    })
})

// 회원가입 요청 받는 api 
router.post('/register', async (req,res)=> { // 이렇게 async 비동기 해줘야함.
    // 유저 데이터 저장
    console.log('회원가입 요청: ',req.body)
    try {
        const user = new User(req.body); // 새 객체 생성
        await user.save(); // 저장 될때까지 기다림. (비동기 요청) => 몽고DB에 save 됨.
        return res.sendStatus(200);
    } catch (error) {
  console.error('회원가입 에러:', error);
  return res.status(500).json({
    success: false,
    message: error.message || '회원가입 중 에러 발생',
  });
}
});



// login 해서 JWT 기반으로 엑세스 토큰 건내주는 API
router.post('/login', async (req, res, next) => {
    // req.body   password , email
    try {

        // 존재하는 유저인지 체크
        const user = await User.findOne({ email: req.body.email }); // 유저 이름이 존재하는지 검색

        if (!user) { // 없는 유저일시
            return res.status(400).send("Auth failed, email not found");
        }

        // 비밀번로가 올바른 것인지 체크
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(400).send('Wrong password');
        }

        const payload = {
            userId: user._id.toHexString(), // 페이로드 => 즉 정보는 유저 아이디만 전달.
            // toHexString => 몽고DB에서는 id가 object 아이디로 되어있어서 이렇게 변경해줘야함.
        }

        // token을 생성
        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }) // 엑세스 토큰 유효기간도 정해주기.

        return res.json({ user, accessToken })

    } catch (error) {
        next(error)
    }
})


module.exports = router