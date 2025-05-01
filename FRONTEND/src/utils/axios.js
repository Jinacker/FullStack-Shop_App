import axios from 'axios';

// 백엔드와 프론트엔드랑 통신을 쉽게하기 위한 HTTP 비동기 통신 라이브러리.

// axios를 인스턴스화 => http;//localhost:4000/ 같은 중복된 부분을 입력하지 않기 위해 인스턴스화 시킴.

const axiosInstance = axios.create({
    baseURL: import.meta.env.PROD ?
    '' : 'http://localhost:4000' // 아직 배포를 안해서 앞에껀 비워둠. 추후 채우면 됨.
})

export default axiosInstance;