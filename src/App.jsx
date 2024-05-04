import { BrowserRouter } from 'react-router-dom'
import './App.css'
import Rotas from './Rotas'
import Navbar from './components/Navbar'
import { Authprovider } from './AuthContext'

function App() {
 
  
   return (
    <Authprovider>
      <BrowserRouter> 
        <Navbar/>
        <Rotas/>
      </BrowserRouter>
    </Authprovider>
  )
}

export default App
