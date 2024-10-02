import { useContext, useEffect, useState } from 'react'
import Accordion from 'react-bootstrap/Accordion';
import { MyListGroup } from './componentes/MyListGroup';
import '../../style/accordion.css'
import PedidoModal from '../../componentes/modal/pedidoModal';
import { Anticipo_Credito, BuscarModal, IngresarFecha, IngresarTexto, SelectorCombo , Institucional_Campo} from './plantillas/modalPlantilla';
import { commercialContext } from '../../context/ComercialContext';
import { getNuevoPedidoClave, guardarNuevoPedido } from '../../services/pedidoService';
import { decodeJWT } from '../../utils/decode';
import { getFormatShipDate} from '../../utils/humandateformat';
import { getCurrentLocation } from '../../utils/location';
import ReCAPTCHA from "react-google-recaptcha";
import { mergeComments } from './utils';

const tipoModal = {
  text: (nuevopedido, modalValues, handlemodal, setSaleOrder)=>(<IngresarTexto nuevopedido={nuevopedido} modalValues={modalValues} handleInputTextModal={handlemodal} handleNewSaleOrder={setSaleOrder} type={'number'}/>),
  combo: (nuevopedido, modalValues, handlemodal, setSaleOrder)=>(<SelectorCombo nuevopedido={nuevopedido} modalValues={modalValues} handleInputTextModal={handlemodal} handleNewSaleOrder={setSaleOrder} type={'text'}/>),
  date: (nuevopedido, modalValues, handlemodal, setSaleOrder)=>(<IngresarFecha nuevopedido={nuevopedido} modalValues={modalValues} handleInputTextModal={handlemodal} handleNewSaleOrder={setSaleOrder} type={'date'}/>),
  Anticipo_Credito: (nuevopedido, modalValues, handlemodal, setSaleOrder, tipo)=>(<Anticipo_Credito nuevopedido={nuevopedido} modalValues={modalValues} handleInputTextModal={handlemodal} handleNewSaleOrder={setSaleOrder} />),
  Institucional_Campos: (nuevopedido, modalValues, handlemodal, setSaleOrder, tipo)=>(<Institucional_Campo nuevopedido={nuevopedido} modalValues={modalValues} handleInputTextModal={handlemodal} handleNewSaleOrder={setSaleOrder} />),
  Final_Pedido: (nuevopedido, modalValues, handlemodal)=>(<Final_Pedido nuevopedido={nuevopedido} modalValues={modalValues} handleInputTextModal={handlemodal} handleNewSaleOrder={setSaleOrder}/>)
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
        
  const [mensaje, setMensaje] = useState('Temporal');

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

  //guardar OV
  const guardarOV = async () => {
    console.log(nuevoPedido)
    let body = {
        CardCode: nuevoPedido?.cliente_codigo,
        DocDueDate: nuevoPedido?.fentrega,
        U_MSSM_CLM: nuevoPedido?.numero,
        DiscountPercent: nuevoPedido?.montos?.descuento || 0,
        Comments: mergeComments(nuevoPedido?.comentarios.vendedor, nuevoPedido?.comentarios.nota_anticipo),
        PaymentGroupCode: nuevoPedido?.condicionpago[0]?.PaymentGroupCode,
        FederalTaxID: nuevoPedido?.ruc || '',
        ShipToCode: nuevoPedido?.direccionentrega[0]?.direccion_codigo || '',
        U_MSSL_RTR: nuevoPedido?.ructransporte?.documento_transporte || '',
        U_MSSF_CEX1: nuevoPedido?.institucional?.cmp1,
        U_MSSF_CEX2: nuevoPedido?.institucional?.cmp2,
        U_MSSF_CEX3: nuevoPedido?.institucional?.cmp3,
        U_MSSF_ORDC: nuevoPedido?.institucional?.oc,
        grupo_familia: nuevoPedido?.grupo_familia,
        DocumentLines: nuevoPedido?.products?.map((product)=>({
          ItemCode: product?.codigo,
          Quantity: product?.cantidad,
          TaxCode: product?.impuesto?.codigo,
          UnitPrice: product?.precio,
          DiscountPercent: product?.dsct_porcentaje,
          U_MSSC_NV1: product?.dsct_porcentaje,
          U_MSSC_NV2: 0,
          U_MSSC_NV3: 0,
          U_MSSC_DSC: product?.dsct_porcentaje,
          U_MSS_ITEMBONIF: ('tipo' in product)?'Y':'N',
          U_MSSC_BONI: ('tipo' in product)?'Y':'N',
        }))
    }
    console.log(body)
    const response = await guardarNuevoPedido(body);
    // let currentLocation = await getCurrentLocation();
    // // setMensaje(`Latitud:${currentLocation.latitud} & Longitud:${currentLocation.longitud}`)
    // if ('message' in currentLocation){
    //   setMensaje(currentLocation?.message)
    // }else{
    //   setMensaje(`Latitud:${currentLocation.latitud} & Longitud:${currentLocation.longitud}`)
    // }
  }

  function onChange(value) {
    console.log("Captcha value:", value);
  }

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
    <div className='tw-flex tw-flex-col tw-items-center tw-border-2'>
      <button className='button-14 tw-w-2/3 tw-h-10 tw-my-4 tw-font-sans tw-font-medium' disabled={false} style={{margin: '0 auto'}} onClick={guardarOV}>
        Grabar Orden de Venta
      </button>
      <ReCAPTCHA
        sitekey="6Lfiy1MqAAAAAHcepIzS3inu4JEisDbyKWfaXuDp"
        onChange={onChange}
      />,
    </div>
    {/* <h1>{mensaje}</h1> */}
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