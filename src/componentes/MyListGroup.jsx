import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { Pendiente } from '../pages/pedido/listaPlantillas/pedidoPlantilla'; 

const plantillas = {
  pendiente: (item)=><Pendiente item={item}/>
}

function MyListGroup({data, plantilla}) {
  if(plantilla in plantillas){
    return (
      <ListGroup as="ol" numbered>
        {data.map((item)=>(
          plantillas[plantilla](item)
        ))}
      </ListGroup>
    )
  }
}

export {MyListGroup}