import { useForm } from 'react-hook-form'
import { Alert, Spin } from 'antd'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useRegisterUserMutation } from '../../services/blog'

import styles from './sign-up.module.scss'

export default function SignUp() {
  const [errorMessage, setErrorMessage] = useState()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const [registerUser, { isLoading, isError, isSuccess }] = useRegisterUserMutation()

  let message = ''
  const onSubmit = async (data) => {
    try {
      await registerUser(data).unwrap()
    } catch (error) {
      Object.entries(error.data.errors).forEach(([key, value]) => {
        message += `${key} ${value} `
      })
      setErrorMessage(message)
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
            className={styles.text}
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
        </label>
        <label
          className={styles.label}
          htmlFor="email"
        >
          Email address
          <input
            className={styles.text}
            type="email"
            id="email"
            placeholder="Email address"
            {...register('email', { required: true })}
          />
          {errors.email && errors.email.type === 'required' && <p className={styles.alert}>email is required</p>}
        </label>
        <label
          className={styles.label}
          htmlFor="password"
        >
          Password
          <input
            className={styles.text}
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
            className={styles.text}
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
          <p className={styles.checkbox_text}>I agree to the processing of my personal information</p>
        </label>
        {errors.personalInfo && errors.personalInfo.type === 'required' && (
          <p className={styles.alert}>you must agree to continue</p>
        )}
        <input
          className={styles.submit}
          value="Create"
          type="submit"
        />
        {isLoading && <Spin />}
        {isError && (
          <Alert
            className={styles.response}
            type="error"
            message={errorMessage}
          />
        )}
        {isSuccess && (
          <Alert
            className={styles.response}
            message="your account has been created"
          />
        )}
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
