import { Route, Routes } from 'react-router-dom'

import ArticleList from '../ArticleList'
import Layout from '../Layout'
import Article from '../Article'
import SignUp from '../SignUp'
import SignIn from '../SignIn'
import Profile from '../Profile'
import NewArticle from '../NewArticle'
import ArticleEdit from '../ArticleEdit'
import RequireAuth from '../../hoc/require-auth'
import RequireOwner from '../../hoc/require-owner'

import styles from './index.module.scss'

export default function App() {
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
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
          <Route
            path="new-article"
            element={
              <RequireAuth>
                <NewArticle />
              </RequireAuth>
            }
          />
          <Route
            path="articles/:slug/edit"
            element={
              <RequireOwner>
                <ArticleEdit />
              </RequireOwner>
            }
          />
        </Route>
      </Routes>
    </section>
  )
}
