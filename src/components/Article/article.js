import { useParams } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'
import { Tag } from 'antd'
import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'

import { useFetchArticleQuery } from '../../services/blog'

import styles from './article.module.scss'

export default function Article() {
  const { slug } = useParams()

  const { data } = useFetchArticleQuery(slug)

  const { article } = data ?? {}
  const { title, likes, tags, description, author, updatedAt, body } = article ?? {}

  let tagsIdCounter = 0
  const tagsList = tags
    ? tags.map((text) => {
        tagsIdCounter += 1
        return (
          <Tag
            key={tagsIdCounter}
            className={styles.tag}
          >
            {text}
          </Tag>
        )
      })
    : null

  const date = updatedAt ? new Date(updatedAt) : null

  const main = article ? (
    <>
      <header className={styles.articleHeader}>
        <div className={styles.left}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <HeartOutlined />
            <p className={styles.likes}>{likes}</p>
          </header>
          <div className={styles.tagsList}>{tagsList}</div>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.right}>
          <div className={styles.info}>
            <h2 className={styles.username}>{author.username}</h2>
            <p className={styles.date}>{`${format(date, 'MMMM')} ${format(date, 'd')}, ${format(date, 'y')}`}</p>
          </div>
          <img
            className={styles.avatar}
            src={author.image}
            alt="avatar"
          />
        </div>
      </header>
      <Markdown>{body}</Markdown>
    </>
  ) : null

  return <article className={styles.article}>{main}</article>
}
