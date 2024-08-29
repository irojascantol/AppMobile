import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Pendiente, Aprobado } from '../pages/pedido/listaPlantillas/pedidoPlantilla'; 

const plantillas = {
  pendiente: (item, key)=><Pendiente item={item} key={key}/>,
  aprobado:  (item, key)=><Aprobado item={item} key={key}/>
}

function MyListGroup({data, plantilla}) {
  if(plantilla in plantillas){
    return (
      <ListGroup as="ol" numbered>
        {data.map((item, index)=>(
          plantillas[plantilla](item, index)
        ))}
      </ListGroup>
    )
  }
}

export {MyListGroup}