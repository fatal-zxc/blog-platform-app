import { useParams, Link, useNavigate } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Tag, Alert, Spin, Popconfirm } from 'antd'
import { format } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import Cookies from 'js-cookie'

import {
  useFetchArticleQuery,
  // useLazyGetUserQuery,
  useGetUserQuery,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from '../../services/blog'

import styles from './article.module.scss'

export default function Article() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const { data, error, isLoading } = useFetchArticleQuery(slug)
  const { data: user } = Cookies.get('authToken') ? useGetUserQuery() : {}
  // if (Cookies.get('authToken') && isUninitialized && !data) trigger()
  const [deleteArticle] = useDeleteArticleMutation()

  const { article } = data ?? {}
  const { title, favoritesCount: likes, favorited: like, tagList, description, author, updatedAt, body } = article ?? {}

  const handleDelete = () => {
    deleteArticle(slug)
    navigate('/')
  }

  let tagsIdCounter = 0
  const tagsList =
    tagList &&
    tagList.map((text) => {
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

  const date = updatedAt ? new Date(updatedAt) : null

  const [favoriteArticle] = useFavoriteArticleMutation()
  const [unfavoriteArticle] = useUnfavoriteArticleMutation()

  const favorite = () => {
    if (!Cookies.get('authToken')) return
    favoriteArticle(slug)
  }

  const unfavorite = () => {
    unfavoriteArticle(slug)
  }

  const main = article && (
    <>
      <header className={styles.articleHeader}>
        <div className={styles.left}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            {like ? (
              <button
                aria-label="favorite"
                type="button"
                onClick={unfavorite}
              >
                <HeartFilled />
              </button>
            ) : (
              <button
                aria-label="favorite"
                type="button"
                onClick={favorite}
              >
                <HeartOutlined />
              </button>
            )}
            <p className={styles.likes}>{likes}</p>
          </header>
          <div className={styles.tagsList}>{tagsList}</div>
          <p className={styles.description}>{description}</p>
        </div>
        {user && user.user.username === author.username ? (
          <div>
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
            <div className={styles.ownerPanel}>
              <Popconfirm
                title="Are you sure to delete this article?"
                okText="Yes"
                cancelText="No"
                onConfirm={handleDelete}
                placement="rightTop"
              >
                <button
                  className={styles.delete}
                  type="button"
                  aria-label="Delete"
                >
                  Delete
                </button>
              </Popconfirm>
              <Link
                className={styles.edit}
                to={`/articles/${slug}/edit`}
              >
                Edit
              </Link>
            </div>
          </div>
        ) : (
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
        )}
      </header>
      <Markdown>{body}</Markdown>
    </>
  )

  const errorMessage = error && (
    <Alert
      className={styles.error}
      type="error"
      message="smth error"
    />
  )
  const loader = isLoading && <Spin className={styles.loader} />

  return (
    <article className={styles.article}>
      {main}
      {errorMessage}
      {loader}
    </article>
  )
}
