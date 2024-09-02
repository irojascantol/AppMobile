import { useContext, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { commercialContext } from '../../../context/ComercialContext';

function PedidoCarusel({children}) {
    const {indexPedidoCarusel} = useContext(commercialContext)
    return (
        <Carousel activeIndex={indexPedidoCarusel} slide={true}>
            {children}
        </Carousel>
    );
}

export {PedidoCarusel};