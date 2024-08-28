import axios from "axios";
import { mainURL } from "../constants/globals";

const rutas_reportes = {
    pendiente: '/listarpedidopendiente',
    aprobado: '/listarpedidoaprobado',
    rechazado: '/listarrechazado'
}

export async function getPedido(innerParams, state) {
    try{
        if(state in rutas_reportes){
            const response = await axios(`${mainURL}/comercial/ventas/pedido${rutas_reportes[state]}`, {
                params: innerParams
            });
            if (!!response.data && response.status === 200){
                return response.data;
            }else
            {
                return [];
            }
        }else{
            return [];
        }

    }catch(error){
        console.log(`An Error ocurred: (PedidoService) _ ${error}`);
        alert(`An Error ocurred: (PedidoService) _ ${error}`)
        return [];
    }
}