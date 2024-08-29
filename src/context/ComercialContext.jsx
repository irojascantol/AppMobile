import React, { useState } from 'react'
import { createContext } from 'react'

const commercialContext = createContext()

function ComercialContext({children}) {
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem("CDTToken"));
    const [loading, setLoading] = useState(false);
    const [showSecurity, setShowSecurity] = useState(false);
    const handleShow = () => setShowSecurity(true);
    const handleClose = () => setShowSecurity(false);
  
  return (
    <commercialContext.Provider value={
      {
        isLogin,
        setIsLogin,
        loading,
        setLoading,
        showSecurity,
        handleShow,
        handleClose
      }
    }>
        {children}
    </commercialContext.Provider>
  )
}

export { ComercialContext, commercialContext} 
