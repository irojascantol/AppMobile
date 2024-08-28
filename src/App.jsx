import { BrowserRouter } from "react-router-dom";
import { MiRutas } from './routers/rutas'
import { NavBar1 } from "./componentes/NavBar1";
import { ComercialContext } from "./context/ComercialContext";
// import './App.css'

function App() {
  return (
    <>
      <BrowserRouter basename="comercial">
        <ComercialContext>
          <div className='page-content'>
            <MiRutas/>
          </div>
        </ComercialContext>
      </BrowserRouter>
    </>
  )
}
export default App
