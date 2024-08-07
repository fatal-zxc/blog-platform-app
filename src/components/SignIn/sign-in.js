import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Spin, Alert } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { useLoginUserMutation, useLazyGetUserQuery } from '../../services/blog.js'

import styles from './sign-in.module.scss'

export default function SignIn() {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [loginUser, { isLoading, isError }] = useLoginUserMutation()
  const [trigger] = useLazyGetUserQuery()

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data).unwrap()
      Cookies.set('authToken', res.token, { secure: true, expires: 1 })
      trigger()
      navigate('/')
    } catch (error) {
      setErrorMessage(error.data)
    }
  }

  return (
    <section className={styles.signIn}>
      <h1 className={styles.title}>Sign In</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          className={styles.label}
          htmlFor="email"
        >
          Email address
          <input
            className={`${styles.text} ${errors.email || errorMessage ? styles.invalid : ''}`}
            type="email"
            id="email"
            placeholder="Email address"
            {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/ })}
          />
          {errors.email && errors.email.type === 'required' && <p className={styles.alert}>email is required</p>}
        </label>
        <label
          className={styles.label}
          htmlFor="password"
        >
          Password
          <input
            className={`${styles.text} ${errors.password || errorMessage ? styles.invalid : ''}`}
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', { required: true })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p className={styles.alert}>password is required</p>
          )}
        </label>
        <input
          className={styles.submit}
          type="submit"
          value="Login"
          disabled={isLoading}
        />
        {isLoading && <Spin />}
        {isError && (
          <Alert
            className={styles.response}
            type="error"
            message={errorMessage}
          />
        )}
      </form>
      <p className={styles.bottom}>
        Don’t have an account?
        <Link
          className={styles.link}
          to="/sign-up"
        >
          {' '}
          Sign Up.
        </Link>
      </p>
    </section>
  )
}
