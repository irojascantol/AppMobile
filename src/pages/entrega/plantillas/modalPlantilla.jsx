import { useEffect, useState } from "react";
import { Dropdown, DropdownButton, ListGroup } from "react-bootstrap";
import { BsFillWalletFill, BsListCheck, BsTruck } from "react-icons/bs"
import { obtenerEntregaDetalle } from "../../../services/entregaService";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import '../../../style/modalPlantillaEntrega.css'

function Selector({modalValues, handleModal, handleModalDetalle}){
    return (
        <div className="tw-flex tw-justify-evenly">
            <div className="tw-flex tw-flex-col tw-items-center tw-w-12">
                <button className="tw-p-2 tw-rounded"><BsListCheck size={22} onClick={()=>{
                    handleModal({show: false});
                    handleModalDetalle({show: true, tipomodal: 'detalle', modalTitle: 'Detalle de entrega', options: modalValues?.options});
                }}/></button>
                <p className="tw-text-center tw-leading-[19px]">Ver detalle</p>
            </div>
            <div className="tw-flex tw-flex-col tw-items-center tw-w-12">
                <button className="tw-p-2 tw-rounded"><BsFillWalletFill size={22} onClick={()=>{
                    handleModal({show: false});
                    handleModalDetalle({show: true, tipomodal: 'cobro', modalTitle: 'Registrar cobro', options: []});
                }}/></button>
                <p className="tw-text-center tw-leading-[19px]">Registrar cobro</p>
            </div>
            <div className="tw-flex tw-flex-col tw-items-center tw-w-12">
                <button className="tw-p-2 tw-rounded"><BsTruck size={22}/></button>
                <p className="tw-text-center tw-leading-[19px]">Actualizar entrega</p>
            </div>
        </div>
    )
}

function DetalleEntrega({modalDetalle, handleModalDetalle}){
    //estado cabecera
    const [fields, setFields] = useState(
    [
        {key:'Estado de entrega:', value: null , clave: 'estado_entrega'},
        {key:'Estado de liquidación:', value: null , clave: 'estado_liquidacion'},
        {key:'Comentario chofer:', value: null , clave: 'comentario_chofer'},
        {key:'Contacto:', value: null , clave: 'contacto'},
        {key:'Telefono:', value: null , clave: 'telefono'},
        {key:'Condición de pago', value: null , clave: 'condicion_pago'},
        {key:'Total', value: null , clave: 'total'},
        {key:'Moneda', value: null , clave: 'tipo_moneda'},
    ]
    )

    //estado productos
    const [products, setProducts] = useState([])

    const handleFields = (fields_) => setFields(fields_);
    const handleProducts = (obj) => setProducts(obj);

    //const fetch cabecera y detalle
     useEffect(()=>{
        const fetchDetalleEntrega = async () => {
            let body = {
                numero_documento: modalDetalle?.options
            }
            const response = await obtenerEntregaDetalle(body);
            //aqui llena con data los valores de los campos
            if (Array.isArray(response) && !!response.length){
                let tmpFields = [...fields];
                Object.keys(response[0]).forEach(key=>{
                    let index = fields.findIndex(item=>item.clave === key);
                    if (index !== -1){
                        let tmpField = {...fields[index]};
                        tmpField = {...tmpField, value: response[0][key]};
                        tmpFields[index] = tmpField;
                    }
                })
                handleFields(tmpFields)
                //aqui actualiza los productos
                let tmpLines = [...response[0]?.lineas]
                handleProducts(tmpLines)
            }
        }
        fetchDetalleEntrega();
     }, []) 
     
        const objeto = fields.reduce((acc, {key, value, clave}) => {
        acc[clave] = value;
        return acc;
        }, {});

         return (
                <>
                <Tabs
                    defaultActiveKey="home"
                    id="uncontrolled-tab-example"
                    className="mb-3"
                >
                    <Tab eventKey="home" title="General">
                        <ListGroup as="ol" className='tw-flex tw-gap-2 tw-pb-1'>
                            {fields.map((item, index)=>(
                                <ListGroup.Item className='tw-px-2 tw-py-1 tw-gap-0' variant='secondary' key={(index + 3).toString()}>
                                    <div className='myFontFamily tw-font-medium tw-text-left tw-w-[188px]'>{item?.key}</div>
                                    <div className='tw-flex tw-justify-start tw-w-full'>
                                        {`${item?.value || ''}`}&nbsp;
                                    </div>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Tab>
                    <Tab eventKey="products" title="Productos">
                        <div className="tw-bg-white tw-h-[517px] tw-p-1 tw-rounded-md tw-overflow-y-scroll" style={{border: '1px solid gray'}}>
                            <ListGroup as="ol" className='tw-flex tw-gap-2 tw-pb-1'>
                                {products.map((item, index)=>(
                                    <ListGroup.Item className='tw-px-2 tw-py-2 tw-flex tw-justify-between' variant='secondary' key={(index + 3).toString()}>
                                        <div>
                                            <div>
                                            <div className="tw-text-sm tw-font-medium">Descripción:</div>
                                            <div className='myFontFamily tw-font-normal tw-text-left'>{item?.descripcion}</div>
                                            </div>
                                            <div>
                                            <div className="tw-text-sm tw-font-medium">Código:</div>
                                            <div className='myFontFamily tw-font-normal tw-justify-betweenm tw-text-left'>{item?.codigo_articulo}</div>
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-flex-col tw- tw-justify-between">
                                            <div>
                                            <div className="tw-text-sm tw-font-medium">Cantidad:</div>
                                            <div className='myFontFamily tw-font-normal tw-text-left'>{item?.cantidad}</div>
                                            </div>
                                            <div>
                                            <div className="tw-text-sm tw-font-medium">Precio:</div>
                                            <div className='myFontFamily tw-font-normal tw-text-left'>{`${objeto?.tipo_moneda} ${item?.precio}`}</div>
                                            {/* <div className='myFontFamily tw-font-normal tw-text-left'>{item?.precio}</div> */}
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    </Tab>
                </Tabs>

                <button className='button-4 tw-w-full tw-mt-3' onClick={()=>{handleModalDetalle({show: false})}}>
                    {'Regresar'}
                </button>
                </>

            )
        }

function RegistrarCobro({modalDetalle, handleModalDetalle}){
    //estado productos
    // const [products, setProducts] = useState([])

    // const handleFields = (fields_) => setFields(fields_);
    // const handleProducts = (obj) => setProducts(obj);

    // //const fetch cabecera y detalle
    //  useEffect(()=>{
    //     const fetchDetalleEntrega = async () => {
    //         let body = {
    //             numero_documento: modalDetalle?.options
    //         }
    //         const response = await obtenerEntregaDetalle(body);
    //         //aqui llena con data los valores de los campos
    //         if (Array.isArray(response) && !!response.length){
    //             let tmpFields = [...fields];
    //             Object.keys(response[0]).forEach(key=>{
    //                 let index = fields.findIndex(item=>item.clave === key);
    //                 if (index !== -1){
    //                     let tmpField = {...fields[index]};
    //                     tmpField = {...tmpField, value: response[0][key]};
    //                     tmpFields[index] = tmpField;
    //                 }
    //             })
    //             handleFields(tmpFields)
    //             //aqui actualiza los productos
    //             let tmpLines = [...response[0]?.lineas]
    //             handleProducts(tmpLines)
    //         }
    //     }
    //     fetchDetalleEntrega();
    //  }, []) 
     
    //     const objeto = fields.reduce((acc, {key, value, clave}) => {
    //     acc[clave] = value;
    //     return acc;
    //     }, {});

         return (
                <>
                <div className="tw-bg-red tw-h-[517px] tw-p-1 tw-rounded-md tw-overflow-y-scroll">
                    <ListGroup as="ol" className='tw-flex tw-gap-2 tw-pb-1'>
                        <ListGroup.Item className='tw-px-2 tw-py-2 tw-flex tw-justify-between'>
                                    <Dropdown data-bs-theme="light">
                                        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
                                            Estado entrega
                                        </Dropdown.Toggle>

                                        {/* <Dropdown.Menu variant="secondary" className="tw-w-full" style={{ backgroundColor: '#f8f9fa', color: '#000' }}> */}
                                        <Dropdown.Menu className="tw-w-full" style={{ backgroundColor: '#f8f9fa', color: '#000' }}>
                                            <Dropdown.Item variant="" href="#/action-1" active>Pendiente</Dropdown.Item>
                                            <Dropdown.Item variant="" href="#/action-2">Despacho con cobranza</Dropdown.Item>
                                            <Dropdown.Item variant="" href="#/action-2">Despacho sin cobranza</Dropdown.Item>
                                            <Dropdown.Item variant="" href="#/action-2">Despacho a courier</Dropdown.Item>
                                            <Dropdown.Item variant="" href="#/action-3">No despachado</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <button className='button-4 tw-w-full tw-mt-3' onClick={()=>{handleModalDetalle({show: false})}}>
                    {'Regresar'}
                </button>
                </>

            )
        }

export {Selector, DetalleEntrega, RegistrarCobro}