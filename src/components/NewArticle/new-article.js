import { Alert } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ArticleForm from '../ArticleForm/index.js'
import { useCreateArticleMutation } from '../../services/blog.js'

import styles from './new-article.module.scss'

export default function NewArticle() {
  const [errorMessage, setErrorMessage] = useState()
  const navigate = useNavigate()
  const [createArticle, { isError, isLoading }] = useCreateArticleMutation()

  const onSubmit = async (data) => {
    data.tags = data.tags.map((el) => el.value)
    try {
      const res = await createArticle(data)
      navigate(`/article/${res.data.id}`)
    } catch (error) {
      setErrorMessage(error)
    }
  }

  return (
    <section className={styles.newArticle}>
      <h1 className={styles.title}>Create new article</h1>
      <ArticleForm
        submit={onSubmit}
        isLoading={isLoading}
      />
      {isError && (
        <Alert
          className={styles.response}
          type="error"
          message={errorMessage}
        />
      )}
    </section>
  )
}
