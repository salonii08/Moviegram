import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Login from './Pages/Login/Login'
import {Route, Routes} from 'react-router-dom'
import SignUp from './Pages/SignUp/SignUp'
import Home from './Pages/Home/Home'
import SinglePage from './Pages/SInglePage/SinglePage'
import FavoritesPage from './Pages/Favourites/FavoritesPage'
import Profile from './Pages/Profile/Profile'
import Update from './Pages/Update/Update'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>} />
        <Route path='/' element={<Home/>} />
        <Route path='/singlePage/:id'element={<SinglePage/>}/>
        <Route path="/favorites" element={<FavoritesPage />} /> 
        <Route path='/profile' element= {<Profile/>} />
        <Route path='/update' element = {<Update/>} />
      </Routes>
    </div>
  )
}

export default App
