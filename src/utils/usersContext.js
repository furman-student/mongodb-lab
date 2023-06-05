import { createContext, useState, useCallback, useMemo } from "react"

const UsersContext = createContext()

export const UsersContextProvider = ({ children }) => {
  const [currentUsers, setCurrentUsers] = useState([])

  // handlers
  const addUser = useCallback(
    (user) => setCurrentUsers(prev => [...prev, user]),
    [],
  )

  // context object
  const context = {
    addUser,
    currentUsers,
    setCurrentUsers,
  }

  return (
    <UsersContext.Provider value={context}>
      {children}
    </UsersContext.Provider>
  )
}

export default UsersContext
