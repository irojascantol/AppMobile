import React, { useState } from 'react'
import { createContext } from 'react'

const commercialContext = createContext()

function ComercialContext({children}) {
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem("CDTToken"));
    const [loading, setLoading] = useState(false);
  
  return (
    <commercialContext.Provider value={
      {
        isLogin,
        setIsLogin,
        loading,
        setLoading
      }
    }>
        {children}
    </commercialContext.Provider>
  )
}

export { ComercialContext, commercialContext} 
