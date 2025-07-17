
import { Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authUser } from './store/thunksFunctions'
import { useEffect } from 'react'
import './App.css'

// Pages import
import LandingPage from "./pages/LandingPage";
import LoginPage  from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// 메인 페이지 컴포넌트들 import
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

// 리액트 toast 설치 ! => npm install react-toastify 
// => 위에 머 실행 완료! 이런창 띄워주는 용도임.
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // 이렇게 css도 import 해줘야함.

function Layout() {
  return (
    <div className = 'flex flex-col h-screen justify-between'>

      <ToastContainer
      position='bottom-right'
      theme = 'light'
      pauseOnHover
      autoClose={1500}
      ></ToastContainer>
      
      <Navbar></Navbar>
      <main className = 'mb-auto w-10/12 max-w-4xl mx-auto'>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  )
} 

function App() {

  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch])


  return ( // tailwind css를 써보자 ~ ! 이렇게 css 없이 바로바로 넣어서 만들수있다!
    <Routes>
      <Route path ='/' element = {<Layout></Layout>} >
        <Route index element = {<LandingPage></LandingPage>}></Route>
        
        <Route path = '/login' element ={<LoginPage></LoginPage>}></Route>
        <Route path = '/register' element ={<RegisterPage></RegisterPage>}></Route>
        
      </Route>
    </Routes>
  )
}

export default App

// npm install react-icons => 리액트 아이콘 설치
// https://react-icons.github.io/react-icons/
// 여기서 원하는거 찾아서 바로 쓸수 있게 해줌 !