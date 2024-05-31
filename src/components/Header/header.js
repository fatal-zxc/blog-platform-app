import { Link } from 'react-router-dom'

import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link to="/">
        <h1 className={styles.title}>Realworld Blog</h1>
      </Link>
      <div>
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
    </header>
  )
}
