import { useState } from 'react'
import styles from '@/styles/components/Form.module.scss'

import Tab from './Tab'
import Login from './Login'
import Register from './Register'

export default function Form() {
  const [currentForm, setCurrentForm] = useState('login')

  return (
    <div className="container">
      <div className={styles.formWrapper}>

        <div className={styles.tabs}>

          <Tab active={currentForm === 'login'} handleClick={setCurrentForm('login')}>Login</Tab>
          <Tab active={currentForm === 'register'} handleClick={setCurrentForm('register')}>Register</Tab>

        </div>

        {currentForm === 'login' ? <Login /> : <Register />}
      </div>
    </div>
  )
}
