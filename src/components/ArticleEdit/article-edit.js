import { useLocation, useNavigate } from 'react-router-dom'
import { Spin, Alert } from 'antd'
import { useState } from 'react'

import ArticleForm from '../ArticleForm/index.js'
import { useFetchArticleQuery, useLazyFetchArticleQuery, useUpdateArticleMutation } from '../../services/blog.js'

import styles from './article-edit.module.scss'

export default function ArticleEdit() {
  const [errorMessage, setErrorMessage] = useState()
  const location = useLocation()
  const navigate = useNavigate()
  const slug = location.pathname.split('/')[2]
  const { data: article, isLoading, isError, isSuccess } = useFetchArticleQuery(slug)
  const [trigger] = useLazyFetchArticleQuery()
  const [updateArticle, { isError: isErrorUpdate, isLoading: isUpdateLoading }] = useUpdateArticleMutation()

  const onSubmit = async (data) => {
    data.tags = data.tags.map((el) => el.value)
    data.slug = slug
    try {
      const res = await updateArticle(data)
      trigger(slug)
      navigate(`/article/${res.data.id}`)
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  const loader = isLoading && <Spin className={styles.loader} />

  const errorLoading = isError && (
    <Alert
      className={styles.error}
      type="error"
      message="smth error"
    />
  )

  const main = isSuccess && (
    <ArticleForm
      submit={onSubmit}
      isLoading={isUpdateLoading}
      article={article}
    />
  )

  return (
    <section className={styles.articleEdit}>
      <h1 className={styles.title}>Edit article</h1>
      {main}
      {loader}
      {errorLoading}
      {isErrorUpdate && (
        <Alert
          className={styles.response}
          type="error"
          message={errorMessage}
        />
      )}
    </section>
  )
}
