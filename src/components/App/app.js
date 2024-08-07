import { Route, Routes } from 'react-router-dom'

import ArticleList from '../ArticleList/index.js'
import Layout from '../Layout/index.js'
import Article from '../Article/index.js'
import SignUp from '../SignUp/index.js'
import SignIn from '../SignIn/index.js'
import Profile from '../Profile/index.js'
import NewArticle from '../NewArticle/index.js'
import ArticleEdit from '../ArticleEdit/index.js'
import RequireAuth from '../../hoc/require-auth.js'
import RequireOwner from '../../hoc/require-owner.js'

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
            path="article/:slug"
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
