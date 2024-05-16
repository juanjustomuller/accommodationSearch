import './layout.scss'
import NavBar from '../../components/Navbar/Navbar'
import { Navigate, Outlet } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Layout = () => {
  return (
    
    <div className="layout">
    <div className="navbar">
    <NavBar />
    </div>

    <div className="content">
    <Outlet />
    </div>
    </div>
    
  )
}
//los permisos de las paginas los va a manejar el layout, para no repetir codigo en cada componente o ruta
const RequireAuthLayout = () => {

  const {currentUser} = useContext(AuthContext)
  
  //hago un useEffect y le digo si no hay currentUser mandame a logear, si hay current user mandame a la profilepage
  /*useEffect(() => {
  if(!currentUser){
  <Navigate to="/login" />
  }
  }, [currentUser])*/

  //en vez de hacer todo eso, directamente hago un condicional, si no hay usuario actual (currentUser), anda a logearme
  // y si hay usuario mostrame el layout

  return !currentUser ? (
     <Navigate to="/login" /> 
    ) : (
    <div className="layout">
    <div className="navbar">
    <NavBar />
    </div>
    <div className="content">
    <Outlet />
    </div>
    </div>
    )
}

export {Layout, RequireAuthLayout}