import React from 'react'
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom'
import Home from './Components/Home.jsx'
import './App.css'
const App = () => {
  return (
    //<h1 className='text-blue-500'>App</h1>
    //415a77
    <>
    <div className='app'>
       <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
        </Routes>
       </Router>
    </div>
    </>
  )
}

export default App