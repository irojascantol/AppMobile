import axios from "axios";
import { mainURL } from "../constants/globals";

const rutas_reportes = {
    pendiente: '/listarpedidopendiente',
    aprobado: '/listarpedidoaprobado',
    rechazado: '/listarpedidorechazado'
}

const rutas_general = {
    pendiente: '/listarpendientegeneral',
    aprobado: '/listaraprobadogeneral',
    rechazado: '/listarrechazadogeneral'
}

const rutas_contenido = {
    pendiente: '/listarpendientecontenido',
    aprobado: '/listaraprobadocontenido',
    rechazado: '/listarrechazadocontenido',
}

const rutas_logistica = {
    pendiente: '/listarpendientelogistica',
    aprobado: '/listaraprobadologistica',
    rechazado: '/listarrechazadologistica',
}

const rutas_finanzas = {
    pendiente: '/listarpendientefinanzas',
    aprobado: '/listaraprobadofinanzas',
    rechazado: '/listarrechazadofinanzas',
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

async function getDetallePedidoGeneral(innerParams, tipoPedido) {
    try{
        const response = await axios(`${mainURL}/comercial/ventas/pedido${rutas_general[tipoPedido]}`, {
            params: innerParams
        });
        if (!!response.data && response.status === 200){
            return response.data;
        }else
        {
            return [];
        }
    }catch(error){
        console.log(`An Error ocurred: (getDetallePedidoGeneral) _ ${error}`);
        undefined;
    }
}

async function getDetallePedidoLogistica(innerParams, tipoPedido) {
    try{
        const response = await axios(`${mainURL}/comercial/ventas/pedido${rutas_logistica[tipoPedido]}`, {
            params: innerParams
        });
        if (!!response.data && response.status === 200){
            return response.data;
        }else
        {
            return [];
        }
    }catch(error){
        console.log(`An Error ocurred: (getDetallePedidoLogistica) _ ${error}`);
        undefined;
    }
}

async function getDetallePedidoFinanzas(innerParams, tipoPedido) {
    try{
        const response = await axios(`${mainURL}/comercial/ventas/pedido${rutas_finanzas[tipoPedido]}`, {
            params: innerParams
        });
        if (!!response.data && response.status === 200){
            return response.data;
        }else
        {
            return [];
        }
    }catch(error){
        console.log(`An Error ocurred: (getDetallePedidoLogistica) _ ${error}`);
        undefined;
    }
}

async function getDetallePedidoContenido(innerParams, tipoPedido) {
    try{
        const response = await axios(`${mainURL}/comercial/ventas/pedido${rutas_contenido[tipoPedido]}`, {
            params: innerParams
        });
        if (!!response.data && response.status === 200){
            return response.data;
        }else
        {
            return [];
        }
    }catch(error){
        console.log(`An Error ocurred: (getDetallePedidoLogistica) _ ${error}`);
        undefined;
    }
}

export {getPedido, getDetallePedidoGeneral, getDetallePedidoLogistica, getDetallePedidoFinanzas, getDetallePedidoContenido}