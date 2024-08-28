import { Routes, Route, Outlet} from "react-router-dom";
import LoginForm from "../pages/login/LoginForm";
import ProtectedRoute from "../componentes/seguridad/VentanaProteccion";
import { NavBar1 } from "../componentes/NavBar1";
import NuevoPedido from "../pages/operaciones/nuevopedido";
import ReportePedido from "../pages/pedido/ReportePedido";
import Entrega from "../pages/operaciones/entrega";
import { NotFound } from "../pages/defecto/NotFound";

export function MiRutas() {
    return (
        <>
        <Routes>
            <Route path="/" element={<LoginForm/>} />
            <Route path="/login" element={<LoginForm/>} />
            <Route path="/main"element={<NavBar1/>}>
                <Route path="entrega" element={<Entrega/>}/>
                <Route path="nuevopedido" element={<NuevoPedido/>}/>
                <Route path="pedido/:reporte" element={<ReportePedido/>}/>
            <Route path="*" element={<NotFound/>} />
            </Route>
        </Routes>
        </>
    );
}
