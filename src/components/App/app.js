import { Route, Routes } from 'react-router-dom'

import ArticleList from '../ArticleList'
import Layout from '../Layout'
import Article from '../Article'

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
        </Route>
      </Routes>
    </section>
  )
}
