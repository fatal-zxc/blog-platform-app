import { Outlet } from 'react-router-dom'

import Header from '../Header/index.js'

import styles from './layout.module.scss'

export default function Layout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
    </>
  )
}
