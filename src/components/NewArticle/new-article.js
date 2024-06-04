import { Alert } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ArticleForm from '../ArticleForm'
import { useCreateArticleMutation } from '../../services/blog'

import styles from './new-article.module.scss'

export default function NewArticle() {
  const [errorMessage, setErrorMessage] = useState()
  const navigate = useNavigate()
  const [createArticle, { isError }] = useCreateArticleMutation()

  const onSubmit = async (data) => {
    data.tags = data.tags.map((el) => el.value)
    try {
      const res = await createArticle(data)
      navigate(`/articles/${res.data.article.slug}`)
    } catch (error) {
      let message = ''
      Object.entries(error.data.errors).forEach(([key, value]) => {
        message += `${key} ${value} `
      })
      setErrorMessage(message)
    }
  }

  return (
    <section className={styles.newArticle}>
      <h1 className={styles.title}>Create new article</h1>
      <ArticleForm submit={onSubmit} />
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
