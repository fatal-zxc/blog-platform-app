import { Tag } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import styles from './article-preview.module.scss'

export default function ArticlePreview({ title, likes, tags, description, author, time, slug }) {
  let tagsIdCounter = 0
  const tagsList = tags.map((text) => {
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
  const date = new Date(time)

  return (
    <article className={styles.article}>
      <div className={styles.left}>
        <header className={styles.header}>
          <Link to={`/articles/${slug}`}>
            <h1 className={styles.title}>{title}</h1>
          </Link>
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
    </article>
  )
}
