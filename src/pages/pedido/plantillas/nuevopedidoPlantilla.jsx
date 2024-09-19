import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { ListGroup } from 'react-bootstrap'
import { BsArchive, BsArrowClockwise, BsArrowRightShort, BsBootstrap, BsCalendar3, BsCurrencyExchange, BsFileEarmarkPerson, BsList, BsPlusSquareFill, BsSearch, BsTrash, BsTrash3Fill, BsX } from 'react-icons/bs';
import { commercialContext } from '../../../context/ComercialContext';
import { getFormatShipDate, getFormatShipDate_peru, getHumanDateFormat, getHumanDateFormat_plus } from '../../../utils/humandateformat';
import { truncate } from '../../../utils/math';
import { getProductosBonificacion } from '../../../services/pedidoService';
import '../../../style/inputform.css'

const retornaDatos = (data, key) => {
    if (!!data){
        return data[key]
    }else{
        return ''
    }
}

function NuevoPedidoCabecera() {
    const { handleSearchModal, handleInputTextModal, nuevoPedido} = useContext(commercialContext);
    return (
    <>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
            variant="no style"
            >
            <div className="ms-2 me-auto tw-border-4 tw-border-indigo-600">
                <div className="header_section_title">Numero orden de venta:</div>
                <div className='header_section_content' dangerouslySetInnerHTML={{__html: `${nuevoPedido?.numero}&nbsp;`}}/>
            </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
            variant="no style"
            >
            <div className="ms-2 me-auto tw-border-4 tw-border-indigo-600">
            <div className="header_section_title">R.U.C:</div>
            <div className='header_section_content' dangerouslySetInnerHTML={{__html: `${retornaDatos(nuevoPedido, "ruc")}&nbsp;`}}/>
            </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
            variant="no style"
            >
            <div className="tw-ml-2 tw-mr-5  tw-flex tw-justify-between tw-w-full">
                <div className='tw-min-w-[330px]'>
                    <div className="header_section_title">Razon social:</div>
                    <div className='header_section_content' dangerouslySetInnerHTML={{__html: `${retornaDatos(nuevoPedido, "razonsocial")}&nbsp;`}}/>
                </div>
                <div className='tw-w-[20px]'>
                    <Button variant="outline-secondary" id="button-addon2" onClick={()=>handleSearchModal({show: true, modalTitle: 'Buscar cliente', operacion: 'Cliente', placeholder: 'Ingrese Razon Social o RUC'})} className='tw-px-3 tw-h-12'>
                        <BsSearch size={20}/>
                    </Button>
                </div>
            </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
            variant="no style"
            >
            <div className="ms-2 me-auto tw-border-4 tw-border-indigo-600">
            <div className="header_section_title">Telefono:</div>
            <div className='header_section_content' dangerouslySetInnerHTML={{__html: `${retornaDatos(nuevoPedido, "telefono")}&nbsp;`}}/>
            </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
            variant="no style"
            >
            <div className="ms-2 me-auto tw-border-4 tw-border-indigo-600">
            <div className="header_section_title">Fecha Contable:</div>
            <div className='header_section_content' dangerouslySetInnerHTML={{__html: `${getHumanDateFormat(nuevoPedido?.fcontable)}&nbsp;`}}/>
            </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
            variant="no style"
            >
            <div className="tw-ml-2 tw-mr-5  tw-flex tw-justify-between tw-w-full">
                <div className='tw-min-w-[330px]'>
                    <div className="header_section_title">Fecha de entrega:</div>
                    <div className='header_section_content' dangerouslySetInnerHTML={{__html: `${getFormatShipDate_peru({fecha: new Date(nuevoPedido?.fentrega)})}&nbsp;`}}/>
                </div>
                <div className='tw-w-[20px]'>
                    <Button variant="outline-secondary" id="button-addon2" onClick={()=>{
                        if(!!nuevoPedido.ruc && !!nuevoPedido.razonsocial){
                            handleInputTextModal({show: true, options: getFormatShipDate({fechacontable: new Date(nuevoPedido?.fcontable), moredays: 1}), modalTitle: 'Ingresar fecha de entrega', tipomodal: 'date', operacion: 'direccionentrega'})
                        }else{alert("Debe seleccionar un cliente")}}} className='tw-px-3 tw-h-12'>
                        <BsCalendar3 size={20}/>
                    </Button>
                </div>
            </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
            variant="no style"
            >
            <div className="tw-ml-2 tw-mr-5  tw-flex tw-justify-between tw-w-full">
                <div className='tw-min-w-[330px]'>
                    <div className="header_section_title">Dirección de entrega:</div>
                    <div className='header_section_content' dangerouslySetInnerHTML={{__html: `${!!nuevoPedido.direccionentrega && nuevoPedido?.direccionentrega[0] || ''}&nbsp;`}}/>
                </div>
                <div className='tw-w-[20px]'>
                    <Button variant="outline-secondary" onClick={()=>{
                        if(!!nuevoPedido.ruc && !!nuevoPedido.razonsocial){
                            handleInputTextModal({show: true, options: nuevoPedido.direccionentrega, modalTitle: 'Seleccionar dirección de entrega', tipomodal: 'combo', operacion: 'direccionentrega'})
                        }else{alert("Debe seleccionar un cliente")}
                    }}
                        className='tw-px-3 tw-h-12'>
                        <BsList size={20}/>
                    </Button>
                </div>
            </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
            variant="no style"
            >
            <div className="tw-ml-2 tw-mr-5  tw-flex tw-justify-between tw-w-full">
                <div className='tw-min-w-[330px]'>
                    <div className="header_section_title">RUC transportista:</div>
                    <div className='header_section_content' dangerouslySetInnerHTML={{__html: `${retornaDatos(nuevoPedido, "ructransporte")}&nbsp;`}}/>
                </div>
                <div className='tw-w-[20px]'>
                    <Button variant="outline-secondary" onClick={()=>handleInputTextModal({show: true, modalTitle: 'Ingresar RUC transportista', tipomodal: 'text'})} className='tw-px-3 tw-h-12'>
                        <BsFileEarmarkPerson  size={20}/>
                    </Button>
                </div>
            </div>
        </ListGroup.Item>

        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
            variant="no style"
            >
            <div className="ms-2 me-auto tw-border-4 tw-border-indigo-600">
            <div className="header_section_title">Moneda:</div>
            <div className='header_section_content' dangerouslySetInnerHTML={{__html: `${retornaDatos(nuevoPedido, "moneda")}&nbsp;`}}/>
            </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
            variant="no style"
            >
            <div className="ms-2 me-auto tw-border-4 tw-border-indigo-600">
            <div className="header_section_title">Grupo familiar:</div>
            <div className='header_section_content' dangerouslySetInnerHTML={{__html: `${retornaDatos(nuevoPedido, "grupo_familia") || 'NO TIENE'}&nbsp;`}}/>
            </div>
        </ListGroup.Item>
        <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
            variant="no style"
            >
        <div className="tw-ml-2 tw-mr-5  tw-flex tw-justify-between tw-w-full">
            <div className='tw-min-w-[330px]'>
                <div className="header_section_title">Condicion de pago:</div>
                <div className='header_section_content' dangerouslySetInnerHTML={{__html: `${!!nuevoPedido.condicionpago && nuevoPedido?.condicionpago[0] || ''}&nbsp;`}}/>
            </div>
            <div className='tw-w-[20px]'>
                <Button variant="outline-secondary" onClick={()=>{
                    if(!!nuevoPedido.ruc && !!nuevoPedido.razonsocial){
                        handleInputTextModal({show: true, modalTitle: 'Ingresar metodo de pago', tipomodal: 'combo', options: nuevoPedido?.condicionpago, operacion: 'condicionpago'})
                    }else{alert("Debe seleccionar un cliente")}
                    }} 
                    className='tw-px-3 tw-h-12'>
                    <BsCurrencyExchange  size={20}/>
                </Button>
            </div>
        </div>
        </ListGroup.Item>
    </>
  )
}

function NuevoPedidoProductos(){
    //maneja la apertura de modal de busqueda de productos
    const {nuevoPedido, handleSearchModal, handleNewSaleOrder, handleInputTextModal, showInputTextModal: modalValues} = useContext(commercialContext);
    //activate los botones para eliminar productos
    const [deleteMode,  setDeleteMode] = useState(false);
    //verifica cliente agregado en cabecera
    const isClientExits = !!nuevoPedido?.ruc && !!nuevoPedido?.razonsocial;
    const largo_productos = nuevoPedido?.products?.length;

    //activa solo cuando se modifica la tabla productos
    useEffect(()=>{
        !!largo_productos && calcularTotal()
        !largo_productos && setearCero()
    }, [nuevoPedido.products])

    //aplica el descuento por anticipo y nota de credito
    useEffect(()=>{
        let condition = (modalValues?.returnedValue === null || modalValues?.returnedValue === undefined)
        if((!condition) && typeof(modalValues?.returnedValue) === 'object' && 'anticipo' in modalValues?.returnedValue && 'nota_credito' in modalValues?.returnedValue){
            setearDescuentoCredAnti(modalValues.returnedValue)
        }
    }, [modalValues.returnedValue])

    
    const eliminarProducto = (item) => {
        let deleted_index = nuevoPedido?.products.findIndex((element)=>(element.codigo === item.codigo && element?.tipo === item?.tipo))
        let ghost_products = [...nuevoPedido?.products]
        //borrar hijos cuando es padre
        //primero buscamos si es padre
        if(ghost_products[deleted_index]?.tipo !== 'bonificado'){
            //verifica si existe mas productos del mismo codigo
            let indexes = ghost_products.reduce(function(a, e, i){ if ((e?.codigo === ghost_products[deleted_index]?.codigo)) a.push(i); return a}, [])
            //si es 1 o mayor elimina todos
            if(!!indexes.length){
                //ordenar indices de mayor a menor
                indexes.sort((a,b)=>b-a)
                for (let index of indexes){
                    ghost_products.splice(index, 1);
                }
            }
        }else{
            ghost_products.splice(deleted_index, 1);
        }
        handleNewSaleOrder({products: ghost_products})
    }


    const aplicarBonificacion = async() => {
        //se filtra los productos que nos son bonificados
        let request_body = nuevoPedido.products.map((item)=>{if(!('tipo' in item)) return {codigo_articulo: item?.codigo, cantidad: item?.cantidad, precio: item?.precio}});
        request_body = request_body.filter((item)=>item !== undefined);
        let response = await getProductosBonificacion(request_body);
        if (!!response?.length){
            //elimina los productos de tipo bonificados
            let ghost_products_for_delete = [...nuevoPedido.products]
            let indexes = ghost_products_for_delete.reduce(function(a, e, i){ if (('tipo' in e) && (e?.tipo === 'bonificado')) a.push(i); return a}, [])
            if(!!indexes.length){
                //ordenar indices de mayor a menor
                indexes.sort((a,b)=>b-a)
                for (let index of indexes){
                    ghost_products_for_delete.splice(index, 1)              
                }
            }
        //crea arrays de las bonificaciones aplicadas
            let tmpResponse = response.map((item)=>({...item, descuento: 100, tipo: 'bonificado'}))
            handleNewSaleOrder({products: [...ghost_products_for_delete, ...tmpResponse]})
        }
    }

    const calcularValorVenta = () => {
        if (largo_productos){
            let valorVenta = nuevoPedido?.products.reduce((acc, item)=>((item?.precio * item?.cantidad) + acc), 0);
            valorVenta = truncate(valorVenta, 2)
            //revisa que todos los productos esten con la misma unidad de moneda
            let unidad = {...nuevoPedido}?.products.map((item)=>(item?.unidad_moneda))
            unidad = unidad.filter((item, index)=>(unidad.indexOf(item) === index))
            if(unidad?.length === 1){
                return [valorVenta, unidad[0]]
            }else{
                let temporal_montos = {...nuevoPedido.montos, valor_venta: 0, unidad: null}
                alert("Unidades de precio deben ser iguales")
                return [0, null]
            }
        }else{
            let temporal_montos = {...nuevoPedido.montos, valor_venta: 0}
            return [0, null]
        }
    }

    const calcularImpuestos = () => {
        if (largo_productos){
            let impuestoTotal = nuevoPedido?.products.reduce((acc, item)=>((item?.precio * item?.cantidad * ((item?.impuesto?.valor) / 100)) + acc), 0);
            impuestoTotal = truncate(impuestoTotal, 2)
            //revisa que todos los productos esten con la misma unidad de moneda
            let unidad = {...nuevoPedido}?.products.map((item)=>(item?.unidad_moneda))
            unidad = unidad.filter((item, index)=>(unidad.indexOf(item) === index))
            if(unidad?.length === 1){
                return impuestoTotal
            }else{
                alert("Unidades de precio deben ser iguales")
                return null
            }
        }else{
            return 0;
        }
    }

    const calculartTotalNotaAnticipo = () => {
        if (largo_productos){
            let retornar = modalValues?.returnedValue?.anticipo + modalValues?.returnedValue?.nota_credito
                if(!!retornar){
                    return(retornar);
                }else{
                    return(0);
                }
        }else{
            return 0;
        }
    }

    const calcularTotal = () => {
        // if (largo_productos){
            let [sum_valorventa, unit] = calcularValorVenta();
            if (!!sum_valorventa && !!unit){
                let sum_impuesto = calcularImpuestos();
                let total = sum_valorventa + sum_impuesto;
                let total_cred_anti = total - (nuevoPedido.montos.anticipo + nuevoPedido.montos.nota_credito)
                let temporal_montos = {...nuevoPedido.montos, total: total, total_cred_anti: total_cred_anti, valor_venta: sum_valorventa, impuesto: sum_impuesto, unidad: unit}
                handleNewSaleOrder({montos: temporal_montos})
            }
            else{
                let temporal_montos = {...nuevoPedido.montos, total: 0, total_cred_anti: 0, valor_venta: 0, impuesto: 0}
                handleNewSaleOrder({montos: temporal_montos})
            }
        }
        
        const setearCero = () => {
            let temporal_montos = {...nuevoPedido.montos, total: 0, total_cred_anti: 0, valor_venta: 0, impuesto: 0, anticipo: 0, nota_credito: 0}

            handleNewSaleOrder({montos: temporal_montos})
        }
        
        const setearDescuentoCredAnti = () => {
            let sum_anti_cred = calculartTotalNotaAnticipo();
            let total_cred_anti = nuevoPedido.montos.total - sum_anti_cred;
            let temporal_montos = {...nuevoPedido.montos, total_cred_anti: total_cred_anti, anticipo: modalValues.returnedValue.anticipo, nota_credito: modalValues.returnedValue.nota_credito}
            handleNewSaleOrder({montos: temporal_montos})
        }

    return(
        <>
            <ListGroup.Item
            as="li"
            className="d-flex justify-content-end align-items-start active:tw-border-yellow-400 tw-pl-1 tw-gap-2"
            // variant="secondary"
            >
                <button variant="success" size="lg" className='button-4 tw-w-fit tw-text-base' disabled={!isClientExits?true:false} onClick={()=>handleSearchModal({show: true, modalTitle: 'Buscar producto', returnedValue: null, operacion: 'Producto', options: [{cliente_codigo: nuevoPedido?.cliente_codigo, products: nuevoPedido?.products}], placeholder: 'Ingrese nombre o codigo de producto'})}>
                    <BsPlusSquareFill size={22}/>
                </button>
                <button variant="danger" size="lg" className='button-4 tw-w-fit tw-text-base' disabled={!isClientExits?true:false} onClick={()=>{!!(largo_productos) && setDeleteMode(!deleteMode)}}>
                    {(!deleteMode) ?(<BsTrash3Fill size={22}/>):(<BsArrowClockwise size={22}/>)} 
                </button>
            </ListGroup.Item>
            <ListGroup.Item className='tw-px-2' variant='secondary'>
                <ListGroup as="ol" numbered={!!largo_productos ? true : false} className='tw-flex tw-gap-2 tw-pb-1'>
                        {!largo_productos?(
                            <ListGroup.Item as="li" className="d-flex tw-w-full tw-flex-row tw-justify-start tw-gap-2 tw-pl-2 product_card tw-relative" variant="no style">
                                <div className='tw-flex tw-justify-center tw-items-center tw-w-full tw-h-24 tw-font-medium'>
                                    {"Lista vacia"}&nbsp;&nbsp;&nbsp;<BsArchive size={28}/>
                                </div>
                            </ListGroup.Item>
                        ):(
                            nuevoPedido?.products.map((itx, index) => (
                                <ListGroup.Item key={(index + 4).toString()} as="li" className="d-flex tw-w-full tw-flex-row tw-justify-start tw-gap-2 tw-pl-2 product_card tw-relative" variant="no style">
                                    <div className='tw-w-full tw-h-24'>
                                        <div className='tw-text-sm tw-font-medium tw-h-10'>{itx?.descripcion} - {itx?.codigo}</div>
                                        <div className='tw-text-base'>Descuento: {itx?.descuento}%</div>
                                        <div className='tw-flex tw-justify-between'>
                                            <div className='tw-text-base'>pvp: <span className='tw-text-sm'>{itx?.unidad_moneda}</span> {itx?.precio}</div>
                                            <div className='tw-text-base'>cant: {itx?.cantidad}</div>
                                            <div className='tw-text-base'>subtotal: <span className='tw-text-sm'>{itx?.unidad_moneda}</span> {truncate(itx?.precio * itx?.cantidad, 2)}</div>
                                        </div>
                                        <div className={`tw-absolute button-4 tw-right-[-5px] tw-top-[-5px] tw-px-0 tw-py-0 tw-bg-black tw-text-white item-delete ${!deleteMode? 'tw-invisible tw-opacity-0': 'tw-visible tw-opacity-100'}`} onClick={()=>{eliminarProducto(itx)}}>
                                                <BsX size={20}/>
                                        </div>
                                        <div className={`tw-absolute button-4 tw-left-[0px] tw-bottom-[0px] tw-px-0 tw-py-0 tw-bg-yellow-400 tw-text-black item-delete ${itx?.tipo === 'bonificado'? 'tw-visible tw-opacity-100': 'tw-invisible tw-opacity-0'}`} onClick={()=>{eliminarProducto(itx)}}>
                                                <BsBootstrap size={20}/>
                                        </div>
                                    </div>
                                </ListGroup.Item>
                            ))
                            )
                        }
                </ListGroup>
            </ListGroup.Item>
            <ListGroup.Item className='tw-px-2 tw-py-1 tw-flex tw-justify-end tw-gap-2' variant='secondary'>
                <div className='myFontFamily tw-font-medium'>Valor venta:</div>
                <div className='myFontFamily tw-font-normal tw-bg-white product_card tw-rounded-sm tw-min-w-32 tw-text-end tw-px-2'>{nuevoPedido?.montos?.unidad} {nuevoPedido?.montos?.valor_venta}</div>
            </ListGroup.Item>
            <ListGroup.Item className='tw-px-2 tw-py-1 tw-flex tw-justify-end tw-gap-2' variant='secondary'>
                <div className='myFontFamily tw-font-medium'>Descuentos:</div>
                <div className='myFontFamily tw-font-normal tw-bg-white product_card tw-rounded-sm tw-min-w-32 tw-text-end tw-px-2'>{nuevoPedido?.montos?.descuento}</div>
            </ListGroup.Item>
            <ListGroup.Item className='tw-px-2 tw-py-1 tw-flex tw-justify-end tw-gap-2' variant='secondary'>
                <div className='myFontFamily tw-font-medium'>Impuestos:</div>
                <div className='myFontFamily tw-font-normal tw-bg-white product_card tw-rounded-sm tw-min-w-32 tw-text-end tw-px-2'>{nuevoPedido?.montos?.unidad} {nuevoPedido?.montos?.impuesto}</div>
            </ListGroup.Item>
            <ListGroup.Item className='tw-px-2 tw-py-1 tw-flex tw-justify-end tw-gap-2' variant='secondary'>
                <div className='myFontFamily tw-font-medium'>Importe total:</div>
                <div className='myFontFamily tw-font-normal tw-bg-green-300 product_card tw-rounded-sm tw-min-w-32 tw-text-end tw-px-2'>{nuevoPedido?.montos?.unidad} {truncate(nuevoPedido?.montos?.total, 2)}</div>
            </ListGroup.Item>
            <ListGroup.Item className='tw-px-2 tw-py-1 tw-flex tw-justify-end tw-gap-2' variant='secondary'>
                <div className='myFontFamily tw-font-medium'>**Importe total - FA - NC:</div>
                <div className='myFontFamily tw-font-normal tw-bg-white product_card tw-rounded-sm tw-min-w-32 tw-text-end tw-px-2'>{nuevoPedido?.montos?.unidad} {truncate(nuevoPedido?.montos?.total_cred_anti, 2)}</div>
            </ListGroup.Item>
            <ListGroup.Item
            as="li"
            className="d-flex tw-flex-col justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1 tw-gap-2"
            variant="no style"
            >
                <button className='button-4 tw-w-full' disabled={!isClientExits?true:false} onClick={()=>{aplicarBonificacion()}}>
                    Aplicar bonificación
                </button>
                <button className='button-4 tw-w-full' disabled={!isClientExits?true:false} onClick={()=>{console.log("Hola 1")}}>
                    Aplicar descuento
                </button>
                <button className='button-4 tw-w-full' disabled={!isClientExits?true:false} onClick={()=>{
                    handleInputTextModal({show: true, modalTitle: 'Notas de crédito y anticipos', tipomodal: 'Anticipo_Credito', options: nuevoPedido?.montos})}}>
                    Aplicar anticipos y notas de creditos
                </button>
            </ListGroup.Item>
            {isClientExits && (<hr></hr>)}
        </>
    )
}

export {NuevoPedidoCabecera, NuevoPedidoProductos}