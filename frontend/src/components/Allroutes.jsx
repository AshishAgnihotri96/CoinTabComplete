import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './HomePage'
import LoginPage from './LoginPage'
import Protected from './Protected'
import Register from './Register'

const Allroutes = () => {
  return (
        <Routes>
                <Route path='/' element={<Protected><HomePage/></Protected>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<Register/>}/>
        </Routes>
  )
}

export default Allroutes
