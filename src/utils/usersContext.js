import { createContext, useState, useCallback, useMemo } from "react"

const UsersContext = createContext()

export const UsersContextProvider = (props) => {
  const [currentUsers, setCurrentUsers] = useState([])

  // handlers
  const addUser = useCallback(
    (user) => setCurrentUsers(prev => [...prev, user]),
    [],
  )

  // context object
  const values = useMemo(() => ({
    addUser,
    currentUsers,
    setCurrentUsers
  }), [])

  return (
    <UsersContext.Provider value={values}>
      {props.children}
    </UsersContext.Provider>
  )
}

export default UsersContext
