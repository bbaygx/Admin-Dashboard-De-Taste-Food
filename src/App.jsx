import { useState } from 'react'

import './App.css'
import {Routes, Route} from 'react-router-dom'
import { Sigin, Home, Table, Add, Edit,PrivateRoute } from './pages'
import {Footer, Navbar} from './components'

function App() {
  

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/sign-in" element={<Sigin/>} />
        <Route path="/table" element={<PrivateRoute><Table/></PrivateRoute>} />
        <Route path="/table/add" element={<PrivateRoute><Add/></PrivateRoute>} />
        <Route path="/table/edit/:id" element={<PrivateRoute><Edit/></PrivateRoute>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
