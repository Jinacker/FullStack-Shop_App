/* eslint-disable no-unused-vars */
import React from 'react'
import { useForm } from 'react-hook-form' // 리액트 훅 폼 => 로그인 유효성 검사를 쉽게 해줌.

const RegisterPage = () => {
const {register, handleSubmit, formState: {errors}, reset } = useForm({mode: 'onChange' }) // 이벤트 핸들러 생성

const onSubmit = ({email,password,name}) => { // onSubmit => 회원가입 버튼 눌리면 => 해당 값들 리셋
  reset();
}

const userEmail = { // 유효성 검사 실패시 문구
  required: "필수 필드입니다."
}

const userName ={
  required: "필수 필드입니다." // 아무것도 안넣어서 빈 경우
}

const userPassword = {
  required: "필수 필드입니다.",
  minLength: { // 유효성 검사 조건
    value: 6,
    message: "최소 6자입니다."
  }
}

  return (
    <section className='flex flex-col justify-center mt-20 max-w-[400px] m-auto'>
      <div className = 'p-6 bg-white rounded-md shadow-md'>
      <div>
        <h1 className='text-3xl font-semibold text-center'>
        회원가입
        </h1>
      </div>
    <form className='mt-6' onSubmit={handleSubmit(onSubmit)} /*이벤트 핸들러 연결*/> 
        <div className ='mb-2'>
          <label
          htmlFor = 'email'
          className='block text-sm font-semibold text-gray-800 text-left' 
          >Email</label>
          <input 
          type='email'
          id ='email'
          className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
          {...register('email',userEmail)} /* 해당 input을 리액트훅 Form의 관리 대상으로 정함.*/
          ></input>
          {errors?.email && /*오류 발생시 오류 메세지 출력*/
          <div>
            <span className = "text-red-500">
              {errors.email.message}
            </span>
          </div>
          }
        </div>

        <div className ='mb-2'>
          <label
          htmlFor = 'name'
          className='block text-left text-sm font-semibold text-gray-800' 
          >Name</label>
          <input 
          type='name'
          id ='name'
          className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
          {...register('name',userName)}
          ></input>
          {errors?.name &&
          <div>
            <span className = "text-red-500">
              {errors.name.message}
            </span>
          </div>
          }
        </div>

        <div className ='mb-2'>
          <label
          htmlFor = 'password'
          className='block text-left text-sm font-semibold text-gray-800' 
          >Password</label>
          <input 
          type='password'
          id ='password'
          className='w-full px-4 py-2 mt-2 bg-white border rounded-md'
          {...register('password',userPassword)}
          ></input>
          {errors?.password &&
          <div>
            <span className = "text-red-500">
              {errors.password.message}
            </span>
          </div>
          }
        </div>

        <div className='mt-6'>
        <button type='submit' className = 'w-full bg-black text-white px-4 py-2 rounded-md hover:bg-gray-700 duration-200'>
          회원가입
        </button>
      </div>

      <p className = 'mt-8 text-xs font-light text-center text-gray-700'>
        아이디가 있다면? {" "}
      <a href='/login' className = 'font-medium hover:underline'>
      로그인
      </a>
      </p>
    </form>
    </div>
    </section>
  )
}

export default RegisterPage