import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { FavoritesProvider } from './Context/FavoriteContext.jsx'
import { AuthContextProvider } from './Context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthContextProvider>
   <FavoritesProvider>
    <App /> 
   </FavoritesProvider> 
  </AuthContextProvider>
   
    
  </BrowserRouter>
    
   
  
)
