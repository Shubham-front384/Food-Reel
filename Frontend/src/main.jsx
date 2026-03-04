import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router'
import Router from './routes/Router.jsx'
import { AuthProvider } from './auth/auth.context.jsx'
import { FoodProvider } from './auth/food.context.jsx'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <FoodProvider>
        <Router />
        <ToastContainer position="top-right" autoClose={3000} />
      </FoodProvider>
    </AuthProvider>  
  </BrowserRouter>
)
