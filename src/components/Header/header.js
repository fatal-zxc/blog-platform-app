import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'

import { useLazyGetUserQuery, blogAPI } from '../../services/blog.js'

import styles from './header.module.scss'

export default function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [trigger, { data, isError, isSuccess, isUninitialized }] = useLazyGetUserQuery()
  if (Cookies.get('authToken') && isUninitialized) {
    trigger()
  }

  const logOut = () => {
    Cookies.remove('authToken')
    dispatch(blogAPI.util.invalidateTags(['User', 'Articles']))
    navigate('/')
  }

  const authHeader = isSuccess && (
    <div className={styles.right}>
      <Link
        to="/new-article"
        className={styles.create}
      >
        Create article
      </Link>
      <Link
        to="/profile"
        className={styles.profile}
      >
        <p className={styles.username}>{data.username}</p>
        <img
          src={
            data.avatar
              ? `http://localhost:5000/avatars/${data.avatar}`
              : 'https://static.productionready.io/images/smiley-cyrus.jpg'
          }
          className={styles.avatar}
          alt="avatar"
        />
      </Link>
      <button
        type="button"
        onClick={logOut}
        className={styles.logout}
        disabled={!Cookies.get('authToken')}
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
