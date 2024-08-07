import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { useRegisterUserMutation, useLazyGetUserQuery } from '../../services/blog.js'

import styles from './sign-up.module.scss'

export default function SignUp() {
  const navigate = useNavigate()
  const [serverErrors, setServerErrors] = useState({})

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [registerUser, { isLoading }] = useRegisterUserMutation()
  const [trigger] = useLazyGetUserQuery()

  const onSubmit = async (data) => {
    try {
      const res = await registerUser(data).unwrap()
      Cookies.set('authToken', res.token, { secure: true, expires: 1 })
      trigger()
      navigate('/')
    } catch (error) {
      setServerErrors(error.data.errors)
    }
  }

  const passwordValue = watch('password')

  return (
    <section className={styles.signUp}>
      <h1 className={styles.title}>Create new account</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          className={styles.label}
          htmlFor="username"
        >
          Username
          <input
            className={`${styles.text} ${errors.username || serverErrors.username ? styles.invalid : ''}`}
            id="username"
            placeholder="Username"
            {...register('username', { required: true, minLength: 3, maxLength: 20, pattern: /^[a-z0-9]*$/ })}
          />
          {errors.username && errors.username.type === 'required' && (
            <p className={styles.alert}>username is required</p>
          )}
          {errors.username && errors.username.type === 'pattern' && (
            <p className={styles.alert}>you can only use lowercase english letters and numbers</p>
          )}
          {errors.username && errors.username.type === 'minLength' && (
            <p className={styles.alert}>username must be at least 3 characters</p>
          )}
          {errors.username && errors.username.type === 'maxLength' && (
            <p className={styles.alert}>username must be no more than 20 characters</p>
          )}
          {serverErrors.username && <p className={styles.alert}>{`username ${serverErrors.username}`.slice(0, -1)}</p>}
        </label>
        <label
          className={styles.label}
          htmlFor="email"
        >
          Email address
          <input
            className={`${styles.text} ${errors.email || serverErrors.email ? styles.invalid : ''}`}
            type="email"
            id="email"
            placeholder="Email address"
            {...register('email', { required: true, pattern: /^[a-zA-Z0-9_.]+@[a-zA-Z0-9]+\.[a-zA-Z0-9-.]+$/ })}
          />
          {errors.email && errors.email.type === 'required' && <p className={styles.alert}>email is required</p>}
          {errors.email && errors.email.type === 'pattern' && <p className={styles.alert}>email must be valid</p>}
          {serverErrors.email && <p className={styles.alert}>{`email ${serverErrors.email}`.slice(0, -1)}</p>}
        </label>
        <label
          className={styles.label}
          htmlFor="password"
        >
          Password
          <input
            className={`${styles.text} ${errors.password ? styles.invalid : ''}`}
            type="password"
            id="password"
            placeholder="Password"
            {...register('password', { required: true, minLength: 6, maxLength: 40 })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p className={styles.alert}>password is required</p>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <p className={styles.alert}>password must be at least 6 characters</p>
          )}
          {errors.password && errors.password.type === 'maxLength' && (
            <p className={styles.alert}>password must be no more than 40 characters</p>
          )}
        </label>
        <label
          className={styles.label}
          htmlFor="repeatPassword"
        >
          Repeat Password
          <input
            className={`${styles.text} ${errors.repeatPassword ? styles.invalid : ''}`}
            type="password"
            id="repeatPassword"
            placeholder="Password"
            {...register('repeatPassword', {
              required: true,
              minLength: 6,
              maxLength: 40,
              validate: (value) => value === passwordValue,
            })}
          />
          {errors.repeatPassword && errors.repeatPassword.type === 'required' && (
            <p className={styles.alert}>repeat password is required</p>
          )}
          {errors.repeatPassword && errors.repeatPassword.type === 'validate' && (
            <p className={styles.alert}>passwords must match</p>
          )}
        </label>
        <label
          className={`${styles.label} ${styles.checkbox}`}
          htmlFor="personalInfo"
        >
          <input
            className={styles.checkbox_input}
            type="checkbox"
            id="personalInfo"
            {...register('personalInfo', { required: true })}
          />
          <p className={`${styles.checkbox_text} ${errors.personalInfo ? styles.invalidText : ''}`}>
            I agree to the processing of my personal information
          </p>
        </label>
        <input
          className={styles.submit}
          value="Create"
          type="submit"
          disabled={isLoading}
        />
        {isLoading && <Spin />}
      </form>
      <p className={styles.bottom}>
        Already have an account?
        <Link
          className={styles.link}
          to="/sign-in"
        >
          {' '}
          Sign In.
        </Link>
      </p>
    </section>
  )
}
