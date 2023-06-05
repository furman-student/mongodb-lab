"use client"

import { useState } from 'react'
import { UsersContextProvider } from "@/utils/usersContext"
import styles from '@/styles/components/Form.module.scss'

import Login from './Login'
import Register from './Register'

export default function Form() {
  const [currentForm, setCurrentForm] = useState('login')

  return (
    <UsersContextProvider>
      <div className="container">
        <div className={styles.formWrapper}>
          <div className={styles.tabs}>
            <button
              className={styles.tab}
              data-active={currentForm === 'login'}
              onClick={() => setCurrentForm('login')}
            >
              Login
            </button>
            <button
              className={styles.tab}
              data-active={currentForm === 'register'}
              onClick={() => setCurrentForm('register')}
            >
              Register
            </button>
          </div>
          {currentForm === 'login' ? <Login /> : <Register />}
        </div>
      </div>
    </UsersContextProvider>
  )
}
