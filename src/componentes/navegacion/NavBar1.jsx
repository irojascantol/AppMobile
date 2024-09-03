import { useContext, useState } from 'react';
import { NavItem } from 'react-bootstrap';
import {NavLink} from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import { commercialContext } from '../../context/ComercialContext';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Spinner from 'react-bootstrap/Spinner';

import {
    BsTruck ,
    BsFileEarmarkCheck,
    BsFillPersonFill,
} from "react-icons/bs";
import "../../style/NavBar1.css"

const NavBar1 = () => {
    const navigate = useNavigate()
    const [expanded,  setExpanded] = useState(false);
    const {
      loading,
      userName,
      handlePedidoCarusel,
    } = useContext(commercialContext)

    const innerNavigate = (path) => {
      setExpanded(false)
      navigate(path)
    }

    return (
    <div>
      <Navbar expanded={expanded} expand="xl" color='dark' className="bg-body-tertiary border border-indigo-600">
        <Container>
          <Navbar.Brand href="#" className='tw-h-12'>
            <div className='tw-h-full tw-flex tw-gap-2 tw-justify-center tw-items-center'>
              <div className='tw-block tw-h-full'>
                <i className="tw-ml-2 tw-h-fit"><BsFillPersonFill size={26} color='gray'/></i>
              </div>
                <p className='tw-m-0 tw-h-fit tw-text-gray-500 tw-font-mono'>{userName || 'user'}</p>
            </div>
          </Navbar.Brand>
          <div className='tw-flex tw-content-center tw-gap-2'>
            {loading && (
              <div>
                <Spinner animation="border" role="status" variant='secondary'/>
              </div>
            )}
            <div>
              <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={()=>setExpanded(!expanded)}/>
            </div>
          </div>
          <Navbar.Collapse id="basic-navbar-nav" expand="xl" className=''>
            <Nav className="me-auto tw-mt-4" expand="xl">
              <hr></hr>
              <NavItem className='nav-item-custom-height'>
                  <div className='nav-item-custom-height tw-w-full' onClick={()=>{innerNavigate('/main/entrega')}}>
                      <NavLink href="#">Entregas</NavLink>
                      <i className="tw-ml-2"><BsTruck size={21}/></i>
                  </div>
              </NavItem>
              <hr></hr>
              <NavDropdown title="Pedidos" id="basic-nav-dropdown" className='nav-dropdown-custom-height'>
                  <NavItem className='nav-item-custom-height'>
                    <div className='nav-item-custom-height tw-w-full' onClick={()=>{innerNavigate('/main/nuevopedido')}}>
                      <NavLink href="#">Nuevo pedido</NavLink>
                      <i className="tw-ml-2"><BsFileEarmarkCheck size={21}/></i>
                    </div>
                  </NavItem>
                  <NavDropdown title="Estados" id="basic-nav-dropdown" className='nav-dropdown-custom-height'>
                      <div className='tw-w-full' onClick={()=>{handlePedidoCarusel(0); innerNavigate('/main/pedido/aprobado')}}>
                        <NavDropdown.Item href="#">Aprobados</NavDropdown.Item>
                      </div>
                      <NavDropdown.Divider />
                      <div className='tw-w-full' onClick={()=>{handlePedidoCarusel(0); innerNavigate('/main/pedido/pendiente')}}>
                        <NavDropdown.Item href="#">Pendientes</NavDropdown.Item>
                      </div>
                      <NavDropdown.Divider />
                      <div className='tw-w-full' onClick={()=>{handlePedidoCarusel(0); innerNavigate('/main/pedido/rechazado')}}>
                        <NavDropdown.Item href="#">Rechazados</NavDropdown.Item>
                      </div>
                  </NavDropdown>
              </NavDropdown>
              <hr></hr>
              <NavItem className='nav-item-custom-height'>
                  <div onClick={()=>{sessionStorage.removeItem("CDTToken")}}>
                    <NavLink href="/comercial">Salir</NavLink>
                  </div>
              </NavItem>
              <hr></hr>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet/>
    </div>
  );
}

export { NavBar1 };