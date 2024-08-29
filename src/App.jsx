import { BrowserRouter } from "react-router-dom";
import { MiRutas } from './routers/rutas'
import { ComercialContext } from "./context/ComercialContext";
import NoAutorizado from "./componentes/modal/autorizacion";
// import './App.css'

function App() {
  return (
    <>
      <BrowserRouter basename="comercial">
        <ComercialContext>
          <NoAutorizado/>
          <div className='page-content'>
            <MiRutas/>
          </div>
        </ComercialContext>
      </BrowserRouter>
    </>
  )
}
export default App
