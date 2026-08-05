import { Outlet } from 'react-router-dom'
import './App.css'
import Background from './layouts/background/Background'
import Header from './layouts/header/Header'

function App() {
  return (
    <Background>
        <Header />
        <Outlet />
    </Background>
  )
    
}

export default App
