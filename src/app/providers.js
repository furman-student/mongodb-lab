"use client"

import { SessionProvider } from "next-auth/react"
import { UsersContextProvider } from "@/utils/usersContext"

export const NextAuthProvider = ({ children }) => {
  return <SessionProvider>
    <UsersContextProvider>
      {children}
    </UsersContextProvider>
  </SessionProvider>
}
