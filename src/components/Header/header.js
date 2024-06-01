import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { selectUser } from '../../store/selectors'
import { logout } from '../../store/app-slice'

import styles from './header.module.scss'

export default function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  const logOut = () => {
    dispatch(logout())
    navigate('/')
  }

  const authHeader = user && (
    <div className={styles.right}>
      <Link
        to="/"
        className={styles.create}
      >
        Create article
      </Link>
      <Link
        to="/"
        className={styles.profile}
      >
        <p className={styles.username}>{user.username}</p>
        <img
          src={user.image}
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

  const errorHeader = !user && (
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
