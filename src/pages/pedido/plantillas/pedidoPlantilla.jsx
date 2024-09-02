import React from 'react'
import Badge from 'react-bootstrap/Badge';

function Pendiente({item}) {
  const getHumanDateFormat = (data) => {
    const date = new Date(data);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'
    };
    return date.toLocaleDateString('es-PE', options);
  }
  return (
    <>
      <div className="ms-2 me-auto">
        <div className="fw-bold">{item.CardName}</div>
        <div className='text-secondary tw-text-md'>RUC: {item.LicTradNum}</div>
      </div>
      <div className='tw-h-12 tw-flex tw-flex-col tw-justify-between'>
        <Badge bg="primary" pill>
          S/.{item.DocTotal}
        </Badge>
        <div className='text-secondary'>{getHumanDateFormat(item.DocDueDate)}</div>
      </div>
    </>
  )
}

function Aprobado({item}) {
  const getHumanDateFormat = (data) => {
    const date = new Date(data);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'
    };
    return date.toLocaleDateString('es-PE', options);
  }

  return (
    <>
      <div className="ms-2 me-auto">
        <div className="fw-bold">{item.CardName}</div>
        <div className='text-secondary tw-text-md'>RUC: {item.LicTradNum}</div>
      </div>
      <div className='tw-h-12 tw-flex tw-flex-col tw-justify-between'>
        <Badge bg="primary" pill>
        S/.{item.DocTotal}
        </Badge>
        <div className='text-secondary'>{getHumanDateFormat(item.DocDueDate)}</div>
      </div>
    </>
  )
}

function Rechazado({item}) {
  const getHumanDateFormat = (data) => {
    const date = new Date(data);
    const options = { year: 'numeric', month: 'numeric', day: 'numeric'
    };
    return date.toLocaleDateString('es-PE', options);
  }
  return (
    <>
      <div className="ms-2 me-auto">
        <div className="fw-bold">{item.CardName}</div>
        <div className='text-secondary tw-text-md'>RUC: {item.LicTradNum}</div>
      </div>
      <div className='tw-h-12 tw-flex tw-flex-col tw-justify-between'>
        <Badge bg="primary" pill>
          S/.{item.DocTotal}
        </Badge>
        <div className='text-secondary'>{getHumanDateFormat(item.DocDueDate)}</div>
      </div>
  </>
  )
}

export { Pendiente, Aprobado, Rechazado}

//CREATE BUTTON REACT jsx?
