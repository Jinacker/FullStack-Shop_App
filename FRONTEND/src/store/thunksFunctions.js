import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

// Thunk 함수 만들기
//이 코드는 Redux Toolkit에서 createAsyncThunk를 이용해 비동기 작업(Thunk)을 처리하는 예시야. 
// 목적은 회원가입 API 요청을 처리하고, 그 결과를 리덕스 상태로 관리하기 위함이야.

// 이 코드는 회원가입 요청을 서버에 보내고, 그 결과를 Redux 상태로 관리하기 위한 비동기 액션 생성기다.
// 리액트 컴포넌트에서 dispatch(registerUser(...)) 하면 API 호출 + 상태 관리가 자동으로 처리됨.

export const registerUser = createAsyncThunk(
    "user/registerUser", 
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post('users/register',body); // 백엔드 서버 => users/register로 요청 보냄
            return response.data;
        } catch(error) {
            console.log(error);
            
            // 에러 메세지 못받는 오류 고치기 => 좀 더 안전한 
  const message =
    error?.response?.data?.message || // API 에러 메시지
    error?.message ||                 // Axios 에러 메시지 (ex. "Network Error")
    '알 수 없는 에러';
  return thunkAPI.rejectWithValue(message);
        }
    }
)

//"Redux 상태"란 쉽게 말해서, 
// 앱 전체에서 공유하는 중앙 저장소(Central Store)에 저장된 데이터를 뜻해. 
// 컴포넌트들이 각각 따로 state를 관리하면 복잡해지니까, Redux에서는 모든 상태를 하나의 큰 트리 구조로 관리해.


////////////////////////

// 유저 로그인용
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (body, thunkAPI) => {
        try {
            const response = await axiosInstance.post(
                `/users/login`,
                body
            )

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)

// 유저 로그인 인증용 Auth
export const authUser = createAsyncThunk(
    "user/authUser",
    async (_, thunkAPI) => { // thunkAPI는 항상 두번째라 앞에 _ 해서 냄둠 ~
        try {
            const response = await axiosInstance.get(
                `/users/auth`
            );

            return response.data;
        } catch (error) {
            console.log(error);
            return thunkAPI.rejectWithValue(error.response.data || error.message);
        }
    }
)
