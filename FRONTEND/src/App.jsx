
import { Outlet, Route, Routes } from 'react-router-dom'
import './App.css'

// Pages import
import LandingPage from "./pages/LandingPage";
import LoginPage  from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// 메인 페이지 컴포넌트들 import
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";

function Layout() {
  return (
    <div className = 'flex flex-col h-screen justify-between'>
      <Navbar></Navbar>
      <main className = 'mb-auto w-10/12 max-w-4xl mx-auto'>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  )
} 

function App() {

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