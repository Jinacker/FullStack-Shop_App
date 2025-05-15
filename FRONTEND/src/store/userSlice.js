/* eslint-disable no-unused-vars */
import {createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./thunksFunctions";

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
        })
        .addCase(registerUser.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload;
        })
// extraReducers: (builder) => { // 이렇게 registerUser redux에 등록해줘야함.
// registerUser 비동기 액션의 상태 변화에 따라 Redux 상태를 업데이트함.

// 상태 처리
// pending → isLoading = true (요청 중)
// fulfilled → isLoading = false (요청 성공)
// rejected → isLoading = false, error = 에러내용 (요청 실패)
// 회원가입 API 요청의 진행 상태(로딩, 성공, 실패)를 Redux로 관리하려는 목적.
    }
})

export default userSlice.reducer;

//  npm install @reduxjs/toolkit react-redux => 리덕스 패키지 설치
// Reducer => 리액트의 계층성을 무시하고 바로바로 컴포넌트 넘겨줄수있음!
