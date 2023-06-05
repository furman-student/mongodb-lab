import { createContext, useState } from "react"

const UsersContext = createContext()

export const UsersContextProvider = (props) => {
  const [currentUsers, setCurrentUsers] = useState([])

  // handlers
  const addUser = (user) => setCurrentUsers(prev => [...prev, user])

  // context object
  const context = {
    addUser,
    currentUsers,
    setCurrentUsers
  }

  return (
    <UsersContext.Provider value={context}>
      {props.children}
    </UsersContext.Provider>
  )
}

export default UsersContext
