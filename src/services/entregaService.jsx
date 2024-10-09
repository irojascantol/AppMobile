import axios from "axios";
import { mainURL } from "../constants/globals";

//requestBody: usuario_codigo
async function obtenerEntregaPendiente(innerParams) {
    try{
        const response = await axios.get(`${mainURL}/despacho_mobile/entregas/entrega/listarentregaschoferpendiente`, {
            params: innerParams
        });
        if (!!response.data && response.status === 200){
            return response.data;
        }else
        {
            return null;
        }
    }catch(error){
        console.log(`An Error ocurred: (obtenerEntregaPendiente) _ ${error}`);
        return null;
    }
}

async function obtenerEntregaCompleto(innerParams) {
    try{
        const response = await axios.get(`${mainURL}/despacho_mobile/entregas/entrega/listarentregaschofercerrado`, {
            params: innerParams
        });
        if (!!response.data && response.status === 200){
            return response.data;
        }else
        {
            return null;
        }
    }catch(error){
        console.log(`An Error ocurred: (obtenerEntregaCompleto) _ ${error}`);
        return null;
    }
}

async function obtenerEntregaDetalle(innerParams) {
    try{
        const response = await axios.get(`${mainURL}/despacho_mobile/entregas/entrega/listardetallentrega`, {
            params: innerParams
        });
        if (!!response.data && response.status === 200){
            return response.data;
        }else
        {
            return null;
        }
    }catch(error){
        console.log(`An Error ocurred: (obtenerEntregaCompleto) _ ${error}`);
        return null;
    }
}

export {obtenerEntregaPendiente, obtenerEntregaCompleto, obtenerEntregaDetalle}