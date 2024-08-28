import { mainURL } from '../constants/globals';

const meServidorBackend = mainURL

const cabecera = {'Content-type': 'application/json; charset=UTF-8'}

export async function Login(pLogin,pPass,pCia)
{ 
    const data = ({usuario_login : pLogin, usuario_contraseña : pPass, usuario_empresa : pCia})
    const requestOptions = {
        method: 'POST',
        headers: cabecera,
        body: JSON.stringify(data)
    };
    const respuesta = await fetch(`${meServidorBackend}/login/`,requestOptions)
    const responseJson = await respuesta.json()
    return responseJson
}