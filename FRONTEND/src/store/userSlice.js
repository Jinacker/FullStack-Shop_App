/* eslint-disable no-unused-vars */
import {createSlice } from "@reduxjs/toolkit";

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
    extraReducers: (builder) => {}
})

export default userSlice.reducer;

//  npm install @reduxjs/toolkit react-redux => 리덕스 패키지 설치
// Reducer => 리액트의 계층성을 무시하고 바로바로 컴포넌트 넘겨줄수있음!
