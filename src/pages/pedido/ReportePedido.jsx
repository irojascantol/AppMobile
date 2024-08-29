import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { getPedido } from '../../services/pedidoService'
import { MyListGroup } from '../../componentes/MyListGroup';
import { commercialContext } from '../../context/ComercialContext';
import { decodeJWT } from '../../utils/decode';

export default function ReportePedido() {
    const params = useParams();
    const [listReporte, setListReporte] = useState([]);
    const {
        setLoading,
        handleShow,
    } = useContext(commercialContext);

    useEffect(()=>{
        const waitFunc = async () => {
            setLoading(true);
            const {username} = await decodeJWT();
            const response = await getPedido({usuario_codigo: username}, params.reporte)
            !!response.lenght || handleShow()
            setLoading(false);
            await setListReporte(response);
    };
        waitFunc();
    }, [params]);

    return (
        <MyListGroup data={listReporte} plantilla={params.reporte}/>
    )
}
