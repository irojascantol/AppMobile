import { useContext, useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { MyListGroup } from './componentes/MyListGroup';
import '../../style/accordion.css'
import PedidoModal from '../../componentes/modal/pedidoModal';
import { Anticipo_Credito, BuscarModal, IngresarFecha, IngresarTexto, SelectorCombo } from './plantillas/modalPlantilla';
import { commercialContext } from '../../context/ComercialContext';
import { getNuevoPedidoClave } from '../../services/pedidoService';
import { decodeJWT } from '../../utils/decode';
import { getFormatShipDate} from '../../utils/humandateformat';

const tipoModal = {
  text: (nuevopedido, modalValues, handlemodal, setSaleOrder)=>(<IngresarTexto nuevopedido={nuevopedido} modalValues={modalValues} handleInputTextModal={handlemodal} handleNewSaleOrder={setSaleOrder} type={'number'}/>),
  combo: (nuevopedido, modalValues, handlemodal, setSaleOrder)=>(<SelectorCombo nuevopedido={nuevopedido} modalValues={modalValues} handleInputTextModal={handlemodal} handleNewSaleOrder={setSaleOrder} type={'text'}/>),
  date: (nuevopedido, modalValues, handlemodal, setSaleOrder)=>(<IngresarFecha nuevopedido={nuevopedido} modalValues={modalValues} handleInputTextModal={handlemodal} handleNewSaleOrder={setSaleOrder} type={'date'}/>),
  Anticipo_Credito: (nuevopedido, modalValues, handlemodal, setSaleOrder, tipo)=>(<Anticipo_Credito nuevopedido={nuevopedido} modalValues={modalValues} handleInputTextModal={handlemodal} handleNewSaleOrder={setSaleOrder} />)
}

export default function NuevoPedido() {
  const { 
          //Handle nuevo cliente
          handleSearchModal, 
          searchClientModal: buscarModalValues,
          //handle nuevo pedido
          nuevoPedido,
          handleNewSaleOrder, 
          //handle input modals combo/ date/ text field
          showInputTextModal: modalValues,
          handleInputTextModal} = useContext(commercialContext);

  //Trae clave mobile y fecha contable
  useEffect(()=>{
    const doFetch = async () => 
      {
        const data_token = await decodeJWT();
        const response = await getNuevoPedidoClave({usuario_codigo: data_token.username});
        !!response && handleNewSaleOrder({numero: response.code_sale, fcontable: response.fecha, ruc:'', razonsocial:'', telefono: '', fentrega: getFormatShipDate({fechacontable: new Date(response.fecha), moredays: 1}), direccionentrega:'', ructransporte: '', moneda:'', codigogrupo: '', condicionpago:''})
      }
      doFetch();
  },[])


  return (
    <>
    {/* modal buscar cliente y buscar producto */}
    <PedidoModal modalTitle={buscarModalValues.modalTitle} handleClose={()=>handleSearchModal({show: false})} show={buscarModalValues.show}>
      <BuscarModal buscarModalValues={buscarModalValues} handleNewSaleOrder={handleNewSaleOrder} handleCloseModal={()=>handleSearchModal({show: false})}/>
    </PedidoModal>
    
    {/* modal general para tipo combo / text field / date */}
    {!!modalValues.tipomodal && (
      <PedidoModal modalTitle={modalValues.modalTitle} handleClose={()=>handleInputTextModal({show: false})} show={modalValues.show}>
        {tipoModal[modalValues.tipomodal](nuevoPedido, modalValues, handleInputTextModal, handleNewSaleOrder)}
      </PedidoModal>
    )}

    <h6 className='tw-text-center bg-secondary tw-text-white tw-rounded-md' style={{marginBottom: 0, padding: "5px 0"}}>NUEVA ORDEN DE VENTA</h6>
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Datos del cliente</Accordion.Header>
        <Accordion.Body>
          <MyListGroup plantilla="nuevopedidocabecera" data={undefined}/>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Productos</Accordion.Header>
        <Accordion.Body>
          <MyListGroup plantilla="nuevopedidoproductos"/>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    </>
  );
}

export { NuevoPedido }

// {/* <Accordion.Item eventKey="2">
//   <Accordion.Header>Total</Accordion.Header>
//   <Accordion.Body>
//     <MyListGroup plantilla="nuevopedidototal"/>
//   </Accordion.Body>
// </Accordion.Item> */}