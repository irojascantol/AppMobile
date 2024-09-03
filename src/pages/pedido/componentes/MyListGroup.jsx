import React from 'react'
import {DetallePlantillaGeneral, DetallePlantillaLogistica, DetallePlantillaFinanzas, DetallePlantillaContenido} from '../plantillas/detallePlantilla';
import { Pendiente, Aprobado, Rechazado } from '../plantillas/pedidoPlantilla'; 
import { ListGroup } from 'react-bootstrap'

const plantillas = {
  pendiente: (item)=><Pendiente item={item}/>,
  aprobado:  (item)=><Aprobado item={item}/>,
  rechazado:  (item)=><Rechazado item={item}/>,
  general: (data)=><DetallePlantillaGeneral data={data}/>,
  logistica: (data)=><DetallePlantillaLogistica data={data}/>,
  finanzas: (data)=><DetallePlantillaFinanzas data={data}/>,
  contenido: (data)=><DetallePlantillaContenido data={data}/>
}

function MyListGroup({data, plantilla, handleCarusel}) {
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
        {plantillas[plantilla](data)}
      </ListGroup>
    )
  }
}

export {MyListGroup}