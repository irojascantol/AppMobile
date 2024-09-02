import axios from "axios";
import { mainURL } from "../constants/globals";

const rutas_reportes = {
    pendiente: '/listarpedidopendiente',
    aprobado: '/listarpedidoaprobado',
    rechazado: '/listarpedidorechazado'
}

async function getPedido(innerParams, state) {
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
        console.log(`An Error ocurred: (getPedido) _ ${error}`);
        undefined;
    }
}

async function getDetallePedidoCabecera(innerParams) {
    try{
        const response = await axios(`${mainURL}/comercial/ventas/pedido/listarrechazadocabecera`, {
            params: innerParams
        });
        if (!!response.data && response.status === 200){
            return response.data;
        }else
        {
            return [];
        }
    }catch(error){
        console.log(`An Error ocurred: (getDetallePedidoCabecera) _ ${error}`);
        undefined;
    }
}

export {getPedido, getDetallePedidoCabecera}