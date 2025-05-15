// index.js 에 안하는 이유 => 너무 지저분 해짐

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // 몽고DB 릴레이션 만든거 가져옴


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

module.exports = router