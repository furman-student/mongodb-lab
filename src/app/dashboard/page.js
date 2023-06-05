"use client"

import { useRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'
import UsersContext from '@/utils/usersContext'

import { API } from '@/utils/const'
import Loader from '@/components/Loader'
import styles from '@/styles/components/Dashboard.module.scss'
import { useSession } from 'next-auth/react'

export default function Dashboard() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const { currentUsers, setCurrentUsers } = useContext(UsersContext)

  async function updateUsers(params) {
    setIsLoading(true)

    const users = await API.getUsers(params)
    setCurrentUsers(() => [...users])

    setIsLoading(false)
  }

  useEffect(() => {
    if (!session?.user && status !== 'loading') {
      router.push("/")
      return
    }

    updateUsers()
  }, [])

  if (!session?.user && status !== 'loading') return null

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainTitle}>Welcome to the dashboard, {session?.user?.name}!</h1>

      <div className={styles.filters}>
        <div className={styles.filter}>
          <select required
            onChange={({ target }) => target?.value
              ? updateUsers({ position: target?.value })
              : updateUsers({})}
          >
            <option value="" disabled defaultValue hidden>Select Position..</option>
            <option value="">All Positions</option>
            <option value="account_manager">Account Manager</option>
            <option value="developer">Developer</option>
            <option value="team_leader">Team Leader</option>
            <option value="hr_representative">HR Representative</option>
            <option value="office_manager">Office Manager</option>
          </select>
          <span></span>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <tr>
            <th>Full Name</th>
            <th>Position</th>
            <th>Username</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
          {currentUsers?.map((user, index) => <tr key={index}>
            <td>{user.fullName}</td>
            <td>{user.position}</td>
            <td>{user.username}</td>
            <td>{user.age}</td>
            <td>{user.email}</td>
            <td>{user.phone}</td>
          </tr>)}
        </table>

        <Loader isLoading={isLoading} />
      </div>
    </div>
  )
}
