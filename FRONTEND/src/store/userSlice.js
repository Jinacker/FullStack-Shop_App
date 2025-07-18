import {createSlice } from "@reduxjs/toolkit";
import { registerUser,loginUser,authUser } from "./thunksFunctions";
import { toast } from "react-toastify";

// 리덕스 만드는곳
const initialState = {
    userData: {
        id: "",
        email: "",
        name: "",
        role: 0,
        image: "",
    },
    isAuth: false,
    isLoading: false,
    error: '',
} 

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => { // 이렇게 registerUser redux에 등록해줘야함.
        builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }) 
        .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false; 
        toast.info('회원가입을 성공했습니다.'); // 성공 !
        })
        .addCase(registerUser.rejected, (state, action)=> {
        state.isLoading = false;
        state.error = action.payload;
        console.log(action.payload)
        toast.error(action.payload) // 실패... => 에러 출력
        })
// extraReducers: (builder) => { // 이렇게 registerUser redux에 등록해줘야함.
// registerUser 비동기 액션의 상태 변화에 따라 Redux 상태를 업데이트함.

// 상태 처리
// pending → isLoading = true (요청 중)
// fulfilled → isLoading = false (요청 성공)
// rejected → isLoading = false, error = 에러내용 (요청 실패)
// 회원가입 API 요청의 진행 상태(로딩, 성공, 실패)를 Redux로 관리하려는 목적.


////// 로그인 상태처리
        .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.userData = action.payload;
            state.isAuth = true;
            localStorage.setItem('accessToken', action.payload.accessToken); // 이것도 토큰 넘겨줌 ~~~
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
            toast.error(action.payload);
        })

/////// 인증인가 상태처리
        .addCase(authUser.pending, (state) => { // 인증 요청중
            state.isLoading = true;
        })
        .addCase(authUser.fulfilled, (state, action) => { // 인증인가 성공
            state.isLoading = false;
            state.userData = action.payload; 
            state.isAuth = true;
        })
        .addCase(authUser.rejected, (state, action) => { // 인증인가 실패시
            state.isLoading = false;
            state.error = action.payload;
            state.userData = initialState.userData;
            state.isAuth = false;
            localStorage.removeItem('accessToken');
        })


    }
})

export default userSlice.reducer;

//  npm install @reduxjs/toolkit react-redux => 리덕스 패키지 설치
// Reducer => 리액트의 계층성을 무시하고 바로바로 컴포넌트 넘겨줄수있음!
