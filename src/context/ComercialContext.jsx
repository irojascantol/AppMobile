import React, { useState } from 'react'
import { createContext } from 'react'

import meLogo from '../pages/login/assets/cantol_black.png'
import tecnoLogo from '../pages/login/assets/tecnopress_alt.png'
import distriLogo from '../pages/login/assets/distrimax_azul.png'

const commercialContext = createContext()

const logos = {
  CNT: meLogo,
  TCN: tecnoLogo,
  DTM: distriLogo,
}

function ComercialContext({children}) {
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem("CDTToken"));
    const [loading, setLoading] = useState(false);
    const [logo_c, setLogo_C] = useState(!!sessionStorage.getItem("CDTToken") ? logos[sessionStorage.getItem("Logo")] : logos["CNT"]);
    const [userName,  setUserName] = useState("")
    const [showSecurity, setShowSecurity] = useState(false);
    const [indexPedidoCarusel, setIndexPedidoCarusel] = useState(0);
    const [tabActivePedido,  setTabActivePedido] = useState('general');

    
    //handlers
    const handleShow = () => setShowSecurity(true);
    const handleClose = () => setShowSecurity(false);
    const handleLogo = (logo_) => setLogo_C(logos[logo_]);
    const handleUser = (name) => setUserName(name);
    const handlePedidoCarusel = (index) => setIndexPedidoCarusel(index)
    const handleTabPedido = (tabPedido) => setTabActivePedido(tabPedido)
  
  return (
    <commercialContext.Provider value={
      {
        isLogin,
        setIsLogin,
        loading,
        userName,
        logo_c,
        indexPedidoCarusel,
        tabActivePedido,
        setLoading,
        showSecurity,
        handleShow,
        handleClose,
        handleLogo,
        handleUser,
        handlePedidoCarusel,
        handleTabPedido
      }
    }>
        {children}
    </commercialContext.Provider>
  )
}

export { ComercialContext, commercialContext} 
