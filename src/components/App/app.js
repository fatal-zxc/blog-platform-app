import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

import ArticleList from '../ArticleList'
import Layout from '../Layout'
import Article from '../Article'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import { useGetUserQuery } from '../../services/blog'
import { userUpdate } from '../../store/app-slice'

import styles from './index.module.scss'

export default function App() {
  const dispatch = useDispatch()
  if (Cookies.get('authToken')) {
    const { data, isSuccess } = useGetUserQuery()
    useEffect(() => {
      if (isSuccess) {
        dispatch(userUpdate(data.user))
      }
    })
  }

  return (
    <section className={styles.app}>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route
            index
            element={<ArticleList />}
          />
          <Route
            path="articles"
            element={<ArticleList />}
          />
          <Route
            path="articles/:slug"
            element={<Article />}
          />
          <Route
            path="sign-up"
            element={<SignUp />}
          />
          <Route
            path="sign-in"
            element={<SignIn />}
          />
        </Route>
      </Routes>
    </section>
  )
}
