import React, { useContext } from 'react'
import { commercialContext } from '../../context/ComercialContext'
import MyTabPedido from './componentes/MyTabPedido'
import { MyListGroup } from './componentes/MyListGroup'

export default function DetallePedido({itemSelected = {}}) {
    const {handlePedidoCarusel} = useContext(commercialContext)
    console.log(itemSelected)
    return (
        <>
        <MyTabPedido components={[<MyListGroup data={itemSelected} plantilla='general'/>, <div></div>, <div></div>, <div></div>]}/>
        <button className='tw-mt-56 tw-ml-56' onClick={()=>{console.log("si da click aqui");handlePedidoCarusel(0)}}>regresar</button>
        </>
    )
}
