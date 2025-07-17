const jwt = require('jsonwebtoken');
const User = require('../models/User');

let auth = async (req, res, next) => {
    // 토큰을 request headers에서 가져오기
    const authHeader = req.headers['authorization']; // 전체 가져옴 Bearer asdasfasda

    // Bearer ooerkogkeorkgoek.erogkoerkog.eorgkoerkgoerkgokg
    const token = authHeader && authHeader.split(' ')[1]; // Split으로 문자열 나눔 => Bearer 뺴고 토큰 가져옴.
    if (token === null) return res.sendStatus(401);

    try {
        // 토큰이 유효한 토큰인지 확인
        const decode = jwt.verify(token, process.env.JWT_SECRET); // 시크릿키(백엔드만 아는 키) 가지고 복호화. => 토큰 안에 있는 유저 아이디 가져옴
        const user = await User.findOne({ "_id": decode.userId }); // 가져온 유저 아이디 기반으로 해당 아이디의 정보를 DB에서 가져옴
        if (!user) {
            return res.status(400).send('없는 유저입니다.');
        }

        req.user = user; // 이렇게 routes의 users.js에 있는곳에 유저 정보 넘겨줌.
        next();
    } catch (error) {
        next(error);
    }
}

module.exports = auth;