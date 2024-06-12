import { useForm } from 'react-hook-form'
import { Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

import { useGetUserQuery, useLazyGetUserQuery, useUpdateUserMutation } from '../../services/blog'

import styles from './profile.module.scss'

export default function Profile() {
  const navigate = useNavigate()
  const [serverErrors, setServerErrors] = useState({})

  const { data: userdata, isSuccess, isLoading: isFormLoading } = useGetUserQuery()
  const [trigger] = useLazyGetUserQuery()
  const { user } = isSuccess && userdata
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const onSubmit = async (data) => {
    try {
      await updateUser(data).unwrap()
      trigger()
      navigate('/')
    } catch (error) {
      setServerErrors(error.data.errors)
    }
  }

  const loader = isFormLoading && <Spin className={styles.loader} />

  const form = isSuccess && (
    <>
      <h1 className={styles.title}>Edit Profile</h1>
      <form
        className={styles.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label
          htmlFor="username"
          className={styles.label}
        >
          Username
          <input
            className={`${styles.text} ${errors.username || serverErrors.username ? styles.invalid : ''}`}
            id="username"
            defaultValue={user.username ? user.username : null}
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
            id="email"
            defaultValue={user.email ? user.email : null}
            placeholder="Email address"
            type="email"
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
          New password
          <input
            className={`${styles.text} ${errors.password ? styles.invalid : ''}`}
            id="password"
            placeholder="New password"
            type="password"
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
          htmlFor="avatar"
        >
          Avatar image (url)
          <input
            className={`${styles.text} ${errors.avatar ? styles.invalid : ''}`}
            id="avatar"
            defaultValue={user.image ? user.image : null}
            placeholder="Avatar image"
            type="url"
            {...register('avatar', { required: true })}
          />
          {errors.avatar && errors.avatar.type === 'required' && <p className={styles.alert}>avatar is required</p>}
        </label>
        <input
          type="submit"
          className={styles.submit}
          value="Save"
          disabled={isLoading}
        />
        {isLoading && <Spin />}
      </form>
    </>
  )

  return (
    <section className={styles.profile}>
      {form}
      {loader}
    </section>
  )
}
