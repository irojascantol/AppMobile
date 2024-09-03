import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { getHumanDateFormat } from '../../../utils/humandateformat';
import { ListGroup } from 'react-bootstrap'

function Pendiente({item}) {
  return (
    <ListGroup.Item
    as="li"
    className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
    >
      <div className="ms-2 me-auto">
        <div className="tw-font-semibold">{item.CardName}</div>
        <div className='text-secondary tw-text-md'>RUC: {item.LicTradNum}</div>
      </div>
      <div className='tw-h-12 tw-flex tw-flex-col tw-justify-between'>
        <Badge bg="primary" pill>
          S/.{item.DocTotal}
        </Badge>
        <div className='text-secondary'>{getHumanDateFormat(item.DocDueDate)}</div>
      </div>
    </ListGroup.Item>
  )
}

function Aprobado({item}) {
  return (
    <ListGroup.Item
    as="li"
    className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
    >
      <div className="ms-2 me-auto">
        <div className="tw-font-semibold">{item.CardName}</div>
        <div className='text-secondary tw-text-md'>RUC: {item.LicTradNum}</div>
      </div>
      <div className='tw-h-12 tw-flex tw-flex-col tw-justify-between'>
        <Badge bg="primary" pill>
        S/.{item.DocTotal}
        </Badge>
        <div className='text-secondary'>{getHumanDateFormat(item.DocDueDate)}</div>
      </div>
    </ListGroup.Item>
  )
}

function Rechazado({item}) {
  return (
    <ListGroup.Item
    as="li"
    className="d-flex justify-content-between align-items-start active:tw-border-yellow-400 tw-pl-1"
    >
      <div className="ms-2 me-auto">
        <div className="tw-font-semibold">{item.CardName}</div>
        <div className='text-secondary tw-text-md'>RUC: {item.LicTradNum}</div>
      </div>
      <div className='tw-h-12 tw-flex tw-flex-col tw-justify-between'>
        <Badge bg="primary" pill>
          S/.{item.DocTotal}
        </Badge>
        <div className='text-secondary'>{getHumanDateFormat(item.DocDueDate)}</div>
      </div>
    </ListGroup.Item>
  )
}

function Contenido_Articulos({item}) {
  return (
    <ListGroup.Item
        as="li"
        className="tw-grid tw-grid-cols-7 tw-px-1"
        variant="no style"
      >
        <div className="ms-2 me-auto tw-col-span-5 tw-flex tw-flex-col tw-justify-between tw-gap-1">
          <div>
            <div className="tw-font-normal text-primary">Descripción:</div>
            <div className='text-secondary tw-text-xs'>{item?.descripcion || 'NO PRECISA'}</div>
          </div>
          <div>
            <div className="tw-font-normal text-primary">Precio unitario:</div>
            <div className='text-secondary tw-text-md'>S/.{item?.precio_unitario || 'NO PRECISA'}</div>
          </div>
        </div>

        <div className="ms-2 me-auto tw-col-span-2 tw-flex tw-flex-col tw-items-end tw-justify-between">
          <div className='tw-flex tw-flex-col tw-items-end'>
            <div className="tw-font-normal text-primary">Cantidad:</div>
            <div className='text-secondary tw-text-md'>{item?.cantidad || 'NO PRECISA'}</div>
          </div>
          <div className='tw-flex tw-flex-col tw-items-end'>
            <div className="tw-font-normal text-primary">Precio Total:</div>
            <div className='text-secondary tw-text-md'>S/.{item?.total_linea || '0'}</div>
          </div>
        </div>
      </ListGroup.Item>
  )
}

export { Pendiente, Aprobado, Rechazado, Contenido_Articulos}

//CREATE BUTTON REACT jsx?
