import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./style.css"
import { Button, Offcanvas, Collapse, Form, NavItem, NavLink, NavbarToggle  } from 'react-bootstrap';
import { useState } from 'react';

function NavBar1() {
    const [isOpen, setIsOpen] = useState(false);

    const navBarData = [
        {
            label: "Tutorials",
            submenu: [
                {
                    label: "React",
                    url: "/react",
                    submenu: [
                        {
                            label: "Hooks",
                            url: "/react/hooks",
                        },
                        {
                            label: "Context",
                            url: "/react/context",
                        },
                    ],
                },
                {
                    label: "JavaScript",
                    url: "/javascript",
                },
            ],
        },
        {
            label: "Home",
            url: "/",
        },
        {
            label: "About",
            url: "/about",
        },
    ];

    const menuShow = (mItems) => {
        return mItems.map(
            (item, index) => {
                if (item.submenu) {
                    return (
                        <NavDropdown
                            data-bs-theme="dark"
                            title={
                                item.label
                            }
                            key={index}
                            className="dropdown-menu-dark dropend"
                                >
                            {menuShow(
                                item.submenu
                            )}
                        </NavDropdown>
                    );
                } else {
                    return (
                        <Nav.Link
                            href={
                                item.url
                            }
                            key={index}
                            >
                            {item.label}
                        </Nav.Link>
                    );
                }
            }
        );
    };

    const navStyle = {
        color: "dark",
        fontWeight: "bold",
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Toggle Offcanvas
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="start" className="bg-dark text-white">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Empresa cantol</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <div>
                <div className='tw-h-32'>
                    <NavLink href="#" onClick={handleClose} className='text-white'>Link</NavLink>
                </div>
                <div>
                <NavLink href="#" onClick={handleClose} className='text-white'>Link</NavLink>
                </div>
                <div>
                <NavLink href="#" onClick={handleClose} className='text-white'>Link</NavLink>
                </div>
            </div>
            {/* <Nav className="ms-auto">
                    <NavItem>
                        <NavLink href="#" className='text-white'>Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#">Link</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="#" onClick={handleClose}>Link</NavLink>
                    </NavItem>
            </Nav> */}
          {/* Produccion */}
        </Offcanvas.Body>
      </Offcanvas>
    </>
    // <Navbar expand="lg" bg="dark" variant="dark" className="justify-content-end">
        //     <Navbar.Brand href="#">Navbar</Navbar.Brand>
        //     <NavbarToggle aria-controls="basic-navbar-nav" onClick={handleToggle}>
        //     <span className="navbar-toggler-icon" />
        //     </NavbarToggle>
        //     <Collapse in={isOpen} direction="rtl" className="navbar-collapse">
        //         <Nav className="ms-auto">
        //         <NavItem>
        //             <NavLink href="#">Home</NavLink>
        //         </NavItem>
        //         <NavItem>
        //             <NavLink href="#">Link</NavLink>
        //         </NavItem>
        //         <NavItem>
        //             <NavLink href="#">Link</NavLink>
        //         </NavItem>
        //         </Nav>
        //     </Collapse>
        // </Navbar>
    // // <Navbar expand="lg" bg="dark" variant="dark" className="bg-body-tertiary">
    // // <Navbar collapseOnSelect expand={true} bg="dark" variant="dark">
    // // <Navbar expand="lg" className='tw-bg-black'>
    // <Navbar collapseOnSelect expand="lg" bg="dark" variant='dark'>
    //   {/* <Container> */}
    //     <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    //     <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //     {/* <Navbar.Collapse id="basic-navbar-nav"> */}
    //     <Collapse in={true}>
    //             <Nav className="ms-auto">
    //                 <NavItem>
    //                 <NavLink href="#">Home</NavLink>
    //                 </NavItem>
    //                 <NavItem>
    //                 <NavLink href="#">Link</NavLink>
    //                 </NavItem>
    //                 {/* {menuShow(navBarData)} */}
    //             </Nav>
    //     </Collapse>
    //     {/* </Navbar.Collapse> */}
    //   {/* </Container> */}
    // </Navbar>
  );
}
//react?

export default NavBar1;