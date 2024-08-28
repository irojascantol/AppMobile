import React, { useState } from "react";
import { MySelector } from "../../componentes/Selector";
import { Form, Button, Alert, Dropdown } from "react-bootstrap";
import { Login } from "../../services/login";
import { delay } from "../../utils/delay";
import Logo from "./assets/distrimax.png";
import 'C:/AppMobile/src/style/login.css'
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [inputCompany,  setInputCompany] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //inicia proceso de autenticacion
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const responseJson = await Login(inputUsername, inputPassword, inputCompany);
    await delay(200);
    setLoading(false);
    if (!responseJson.detail) {
      sessionStorage.setItem("CDTToken", responseJson);
      setShow(false);
      navigate('/main')
    } else {            
      setShow(true);
    }
  };
  
  const handlePassword = () => {alert("Contactar con TI Cantol")};

  return (
    <div
      className="sign-in__wrapper tw-bg-gray-100 tw-flex tw-items-center tw-h-screen"
    >
      {/* Overlay */}
      <div className="sign-in__backdrop tw-bg-gray-100 tw-h-screen"></div>
      {/* Form */}
      <Form className="shadow p-4 bg-white rounded" onSubmit={handleSubmit}>
        {/* Header */}
        {/* Comienza logo */}
        <div style={{width: "200px", margin: "0 auto"}}>
            <img
            className="img-thumbnail mx-auto d-block mb-2"
            style={{minWidth: "100%"}}
            src={Logo}
            alt="logo"
            />
        </div>
        {/* Termina logo */}

        <div className="h4 mb-2 text-center">Ventas Mobile</div>
        {/* Empieza aviso contraseña o clave incorrecta */}
        {show ? (
          <Alert
            className="mb-2"
            variant="danger"
            onClose={() => setShow(false)}
            dismissible
          >
            Usuario o contraseña incorrecta
          </Alert>
        ) : (
          <div />
        )}

        {/* Empieza combo empresa */}
        <div className="tw-my-3 tw-w-full">
          <MySelector width={'w-100'} initText={'Empresa'} setInputCompany={setInputCompany}/>
        </div>
        {/* Termina combo empresa */}

        {/* Termina aviso contraseña o clave incorrecta */}
        <Form.Group className="mb-2" controlId="username">
          <Form.Label>Usuario</Form.Label>
          <Form.Control
            type="text"
            value={inputUsername}
            placeholder="Usuario"
            onChange={(e) => setInputUsername(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-2" controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={inputPassword}
            placeholder="Contraseña"
            onChange={(e) => setInputPassword(e.target.value)}
            required
          />
        </Form.Group>
        {!loading ? (
          <Button className="w-100 tw-mt-3" variant="primary" type="submit">
            Ingresar
          </Button>
        ) : (
          <Button className="w-100 tw-mt-3" variant="primary" type="submit" disabled>
            Ingresando...
          </Button>
        )}
        <div className="d-grid justify-content-end">
          <Button
            className="text-muted px-0"
            variant="link"
            onClick={handlePassword}
          >
            Olvidaste la contraseña?
          </Button>
        </div>
      </Form>
      {/* Footer */}
      {/* <div className="w-100 mb-2 position-absolute bottom-0 start-50 translate-middle-x text-white text-center">
        Made by Hendrik C | &copy;2022
      </div> */}
    </div>
  );
};

export default LoginForm;
