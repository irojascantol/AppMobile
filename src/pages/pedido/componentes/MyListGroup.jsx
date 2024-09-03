import React from 'react'
import {DetallePlantillaGeneral, DetallePlantillaLogistica, DetallePlantillaFinanzas, DetallePlantillaContenido} from '../plantillas/detallePlantilla';
import { Pendiente, Aprobado, Rechazado } from '../plantillas/pedidoPlantilla'; 
import { ListGroup } from 'react-bootstrap'

const plantillas = {
  pendiente: (item)=><Pendiente item={item}/>,
  aprobado:  (item)=><Aprobado item={item}/>,
  rechazado:  (item)=><Rechazado item={item}/>,
  general: (data, tipoPedido)=><DetallePlantillaGeneral data={data} tipoPedido={tipoPedido}/>,
  logistica: (data, tipoPedido)=><DetallePlantillaLogistica data={data} tipoPedido={tipoPedido}/>,
  finanzas: (data, tipoPedido)=><DetallePlantillaFinanzas data={data} tipoPedido={tipoPedido}/>,
  contenido: (data, tipoPedido)=><DetallePlantillaContenido data={data} tipoPedido={tipoPedido}/>
}

function MyListGroup({data, plantilla, handleCarusel, tipoPedido}) {
  if(['pendiente', 'aprobado', 'rechazado'].includes(plantilla)){
    return (
      <ListGroup as="ol">
        {data.map((item, index)=>(
            <li key={(index + 1).toString()} onClick={()=>{handleCarusel(item)}}>
                {plantillas[plantilla](item)}
            </li>
        ))}
      </ListGroup>
    )
  }else{
    return(
      <ListGroup as="ol">
        {plantillas[plantilla](data, tipoPedido)}
      </ListGroup>
    )
  }
}

export {MyListGroup}