/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return ( // tailwind css를 써보자 ~ ! 이렇게 css 없이 바로바로 넣어서 만들수있다!
    <>
      <div className = "App">
        <h1 className='text-3xl font-bold underline'>
          Hello world !
        </h1>
      </div>
    </>
  )
}

export default App
