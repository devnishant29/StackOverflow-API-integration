import { useState } from 'react'
import SignUp from './assets/components/Signup'
import Login from './assets/components/Login'
import { Routes,Route} from 'react-router-dom'
import HomePage from './assets/components/Home'
import HistoryPage from './assets/components/History'
import Detail  from "./assets/components/detail"

import './App.css'
import Navbar from './assets/components/Navigation/Navbar'

function App() {


  return (
    <>
    <Navbar className="Navigation"/>
    <Routes>
    
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<SignUp />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/history" element={<HistoryPage />} />
    <Route path='/detail' element={<Detail/>}/>
      

    {/* <SignUp/>// */}


    </Routes>
    </>
  )
}

export default App
