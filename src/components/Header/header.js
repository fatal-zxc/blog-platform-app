import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import { useLazyGetUserQuery } from '../../services/blog'

import styles from './header.module.scss'

export default function Header() {
  const navigate = useNavigate()
  const [trigger, { data, isError, isSuccess, isUninitialized }] = useLazyGetUserQuery()
  if (Cookies.get('authToken') && isUninitialized) {
    trigger()
  }

  const logOut = () => {
    Cookies.remove('authToken')
    trigger()
    navigate('/')
  }

  const authHeader = isSuccess && (
    <div className={styles.right}>
      <Link
        to="/"
        className={styles.create}
      >
        Create article
      </Link>
      <Link
        to="/profile"
        className={styles.profile}
      >
        <p className={styles.username}>{data.user.username}</p>
        <img
          src={data.user.image}
          className={styles.avatar}
          alt="avatar"
        />
      </Link>
      <button
        type="button"
        onClick={logOut}
        className={styles.logout}
      >
        Log out
      </button>
    </div>
  )

  const errorHeader = (isError || !data) && (
    <div className={styles.right}>
      <Link
        className={styles.signIn}
        to="/sign-in"
      >
        Sign In
      </Link>
      <Link
        className={styles.signUp}
        to="/sign-up"
      >
        Sign Up
      </Link>
    </div>
  )

  return (
    <header className={styles.header}>
      <Link to="/">
        <h1 className={styles.title}>Realworld Blog</h1>
      </Link>
      {authHeader}
      {errorHeader}
    </header>
  )
}
