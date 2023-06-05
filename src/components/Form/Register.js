"use client"

import { useContext } from "react"
import { useForm } from "react-hook-form"
import styles from '@/styles/components/Form.module.scss'

import UsersContext from "@/utils/usersContext"
import { API, regexPatterns } from "@/utils/const"

import ErrorMsg from "./ErrorMsg"

export default function Register() {
  const {
    watch,
    reset,
    register,
    setError,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const { addUser } = useContext(UsersContext)

  const onSubmit = async (formData) => {
    const { status, data } = await API.register(formData)

    if (status === 201) {
      addUser(formData)
      reset()
      return
    }

    // display errors
    const errorTypes = data?.types ?? []

    if (errorTypes.some(type => type === 'emailExists')) {
      setError('email', { type: 'emailExists' })
    }

    if (errorTypes.some(type => type === 'usernameExists')) {
      setError('username', { type: 'usernameExists' })
    }
  }

  if (isSubmitSuccessful) return <div className={styles.successMsg}>
    <h2 className={styles.title}>Welcome to our team!</h2>
    <p>You have been registered successfully, please use your credentials to login :) </p>
  </div>

  return (<>
    <h2 className={styles.title}>Registration Form</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        <legend>General Information</legend>

        <div className={styles.field}>
          <input type="text" placeholder="email"
            {...register("email", {
              required: true,
              pattern: regexPatterns.get('email'),
            })}
            aria-invalid={errors?.email ? "true" : "false"}
          />
          <label htmlFor="email">Email</label>
          <ErrorMsg
            error={errors?.email}
            errorType={errors?.email?.type === 'pattern' ? 'email' : undefined}
          />
        </div>

        <div className={styles.field}>
          <input type="text" placeholder="username"
            {...register("username", {
              required: true,
              minLength: 8,
              maxLength: 20,
            })}
            aria-invalid={errors?.username ? "true" : "false"}
          />
          <label htmlFor="username">Username</label>
          <ErrorMsg error={errors?.username} />
        </div>

        <div className={styles.field}>
          <input type="password" placeholder="password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 20,
            })}
            aria-invalid={errors?.password ? "true" : "false"}
          />
          <label htmlFor="password">Password</label>
          <ErrorMsg error={errors?.password} />
        </div>

        <div className={styles.field}>
          <input type="password" placeholder="re-type password"
            {...register("passwordCheck", {
              required: true,
              validate: (val) => {
                if (watch('password') != val) return ''
              },
            })}
            aria-invalid={errors?.passwordCheck ? "true" : "false"}
          />
          <label htmlFor="passwordCheck">Re-type Password</label>
          <ErrorMsg
            error={errors?.passwordCheck}
            errorType={errors?.passwordCheck?.type === 'validate' ? 'passwordCheck' : undefined}
          />
        </div>
      </fieldset>

      <fieldset>
        <legend>Profile Settings</legend>

        <div className={styles.field}>
          <input type="text"
            placeholder="full name"
            {...register("fullName", { pattern: regexPatterns.get('charOnly') })}
            aria-invalid={errors?.fullName ? "true" : "false"}
          />
          <label htmlFor="fullName">Full Name</label>
          <ErrorMsg
            error={errors?.fullName}
            errorType={errors?.fullName?.type ? 'charOnly' : undefined}
          />
        </div>

        <div className={styles.field}>
          <input type="number"
            placeholder="age"
            {...register("age", { min: 18, max: 99 })}
            aria-invalid={errors?.age ? "true" : "false"}
          />
          <label htmlFor="age">Age</label>
          <ErrorMsg
            error={errors?.age}
            errorType={errors?.age?.type ? 'age' : undefined}
          />
        </div>

        <div className={styles.field}>
          <input type="text"
            placeholder="phone"
            {...register("phone", { pattern: regexPatterns.get('phone') })}
            aria-invalid={errors?.phone ? "true" : "false"}
          />
          <label htmlFor="phone">Phone</label>
          <ErrorMsg
            error={errors?.phone}
            errorType={errors?.phone?.type ? 'phone' : undefined}
          />
        </div>

        <div className={styles.field}>
          <select {...register("position")}>
            <option value="pos_1">Account Manager</option>
            <option value="pos_2">Developer</option>
            <option value="pos_3">Team Leader</option>
            <option value="pos_4">HR Representative</option>
            <option value="pos_5">Office Manager</option>
          </select>
          <label htmlFor="position">Position</label>
          <span></span>
        </div>

        <div className={styles.field}>
          <textarea {...register("userBio")} cols="30" rows="10" placeholder="your bio"></textarea>
          <label htmlFor="userBio">Bio</label>
        </div>
      </fieldset>

      <button className={styles.button} type="submit">Register</button>
    </form>
  </>)
}
