"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { signIn } from 'next-auth/react'
import styles from '@/styles/components/Form.module.scss'

import ErrorMsg from "./ErrorMsg"

export default function Login() {
  const {
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const router = useRouter()

  const onSubmit = async (data) => {
    const { error } = await signIn('credentials', {
      redirect: false,
      username: data.username,
      password: data.password,
    })

    if (error) {
      setError('login', { type: 'custom', message: 'Wrong credentials' })
      return
    }

    router.push("/dashboard")
    reset()
  }

  return (<>
    <h2 className={styles.title}>Login Form</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset data-error={errors?.login ? 'true' : 'false'}>
        <legend>
          {errors?.login ? errors?.login?.message : "Enter Your Credentials"}
        </legend>

        <div className={styles.field}>
          <input type="text" placeholder="username or email"
            {...register("username", {
              required: true,
              minLength: 8,
              maxLength: 20,
            })}
            aria-invalid={errors?.username ? "true" : "false"}
          />
          <label htmlFor="username">Username or email</label>
          <ErrorMsg error={errors?.username} />
        </div>

        <div className={styles.field}>
          <input type="password" placeholder="password"
            /* nChange={clearLoginError} */
            {...register("password", { required: true })}
            aria-invalid={errors?.password ? "true" : "false"}
          />
          <label htmlFor="password">Password</label>
          <ErrorMsg error={errors?.password} />
        </div>
      </fieldset>

      <button className={styles.button} type="submit">Login</button>
    </form>
  </>)
}
