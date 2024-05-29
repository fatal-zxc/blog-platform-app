import styles from './header.module.scss'

export default function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Realworld Blog</h1>
      <div>
        <button
          type="button"
          className={styles.signIn}
        >
          Sign In
        </button>
        <button
          type="button"
          className={styles.signUp}
        >
          Sign Up
        </button>
      </div>
    </header>
  )
}
