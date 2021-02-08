import { createContext, useState, useMemo } from 'react'

export const AppContext = createContext(null)

const AppProvider = ({ children }) => {
  const [isShowOrderACall, setShowOrderACall] = useState(false)

  const contextValue = {
    orderACall: useMemo(() => ({
      isShowOrderACall,
      setShowOrderACall
    }), [isShowOrderACall])
  }

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider