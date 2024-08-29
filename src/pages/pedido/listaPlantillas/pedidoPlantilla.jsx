import React from 'react'
import Badge from 'react-bootstrap/Badge';
import { ListGroup } from 'react-bootstrap'

function Pendiente({item, key}) {
  const getHumanDateFormat = (data) => {
    const date = new Date(data);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'
    };
    return date.toLocaleDateString('es-PE', options);
  }

  return (
    <ListGroup.Item
    key={(key + 1).toString()}
    as="li"
    className="d-flex justify-content-between align-items-start"
  >
    <div className="ms-2 me-auto">
      <div className="fw-bold">{item.CardName}</div>
      <div className='text-secondary'>{item.DocEntry}</div>
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

function Aprobado({item, key}) {
  const getHumanDateFormat = (data) => {
    const date = new Date(data);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'
    };
    return date.toLocaleDateString('es-PE', options);
  }

  return (
    <ListGroup.Item
    key={(key + 1).toString()}
    as="li"
    className="d-flex justify-content-between align-items-start"
  >
    <div className="ms-2 me-auto">
      <div className="fw-bold">{item.CardName}</div>
      <div className='text-secondary'>{item.DocNum}</div>
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

export { Pendiente, Aprobado}
