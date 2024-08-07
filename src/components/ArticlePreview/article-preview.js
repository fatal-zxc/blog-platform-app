import { Tag } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { format, parseISO } from 'date-fns'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'

import { useFavoriteArticleMutation, useUnfavoriteArticleMutation } from '../../services/blog.js'

import styles from './article-preview.module.scss'

export default function ArticlePreview({ title, likes, like, tags, description, author, time, slug }) {
  let tagsIdCounter = 0
  const tagsList =
    tags &&
    tags.map((text) => {
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
  const date = parseISO(time)

  const [favoriteArticle, { isLoading: isFavoriteLoading }] = useFavoriteArticleMutation()
  const [unfavoriteArticle, { isLoading: isUnfavoriteLoading }] = useUnfavoriteArticleMutation()

  const favorite = () => {
    if (!Cookies.get('authToken')) return
    favoriteArticle(slug)
  }

  const unfavorite = () => {
    unfavoriteArticle(slug)
  }

  return (
    <article className={styles.article}>
      <div className={styles.left}>
        <header className={styles.header}>
          <Link to={`/article/${slug}`}>
            <h1 className={styles.title}>{title}</h1>
          </Link>
          {like ? (
            <button
              aria-label="favorite"
              type="button"
              className={styles.heartButton}
              onClick={unfavorite}
              disabled={isUnfavoriteLoading}
            >
              <HeartFilled className={styles.heart} />
            </button>
          ) : (
            <button
              aria-label="favorite"
              type="button"
              className={styles.heartButton}
              onClick={favorite}
              disabled={isFavoriteLoading}
            >
              <HeartOutlined className={styles.heart} />
            </button>
          )}
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
          src={
            author.avatar
              ? `https://blog-platform-api.onrender.com/avatars/${author.avatar}`
              : 'https://static.productionready.io/images/smiley-cyrus.jpg'
          }
          alt="avatar"
        />
      </div>
    </article>
  )
}
