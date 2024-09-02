import React from 'react'
import { Pendiente, Aprobado, Rechazado } from '../plantillas/pedidoPlantilla'; 
import { ListGroup } from 'react-bootstrap'
import { obj2map } from '../../../utils/mapobj';

const plantillas = {
  pendiente: (item)=><Pendiente item={item}/>,
  aprobado:  (item)=><Aprobado item={item}/>,
  rechazado:  (item)=><Rechazado item={item}/>,
  general: (item)=><General item={item}/>
}

function MyListGroup({data, plantilla, handleCarusel}) {
  if(['pendiente', 'aprobado', 'rechazado'].includes(plantilla)){
    return (
      <ListGroup as="ol" numbered>
        {data.map((item, index)=>(
            <li key={(index + 1).toString()} onClick={()=>{handleCarusel(item)}}>
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start active:tw-border-yellow-400"
                >
                {plantillas[plantilla](item)}
              </ListGroup.Item>
            </li>
        ))}
      </ListGroup>
    )
  }else{
    obj2map(data || {}, (x)=>(x))
    return(
      <>
        {
          [1,2,3].map((x)=>(<div>hola</div>))
        }
      </>
    )
  }
}

export {MyListGroup}

// Object.keys(data).forEach((key, index)=>
//   (<div>hola mundo</div>)
// )

//catch on click event at listgroup?
//data[key] *= 2