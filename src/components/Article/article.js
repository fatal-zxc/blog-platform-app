import { useParams, Link, useNavigate } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Tag, Alert, Spin, Popconfirm } from 'antd'
import { format, parseISO } from 'date-fns'
import Markdown from 'markdown-to-jsx'
import Cookies from 'js-cookie'

import {
  useFetchArticleQuery,
  useGetUserQuery,
  useDeleteArticleMutation,
  useFavoriteArticleMutation,
  useUnfavoriteArticleMutation,
} from '../../services/blog.js'

import styles from './article.module.scss'

export default function Article() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const { data, error, isLoading: isArticleLoading } = useFetchArticleQuery(slug)
  const { data: user } = Cookies.get('authToken') ? useGetUserQuery() : {}
  const [deleteArticle] = useDeleteArticleMutation()

  const {
    title,
    favoritesCount: likes,
    favorited: like,
    tag_list: tagList,
    description,
    author,
    update_time: updatedAt,
    body,
  } = data ?? {}

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

  const date = updatedAt ? parseISO(updatedAt) : null

  const [favoriteArticle] = useFavoriteArticleMutation()
  const [unfavoriteArticle] = useUnfavoriteArticleMutation()

  const favorite = () => {
    if (!Cookies.get('authToken')) return
    favoriteArticle(slug)
  }

  const unfavorite = () => {
    unfavoriteArticle(slug)
  }

  const main = data && (
    <>
      <header className={styles.articleHeader}>
        <div className={styles.left}>
          <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            {like ? (
              <button
                aria-label="favorite"
                type="button"
                className={styles.heartButton}
                onClick={unfavorite}
              >
                <HeartFilled className={styles.heart} />
              </button>
            ) : (
              <button
                aria-label="favorite"
                type="button"
                className={styles.heartButton}
                onClick={favorite}
              >
                <HeartOutlined className={styles.heart} />
              </button>
            )}
            <p className={styles.likes}>{likes}</p>
          </header>
          <div className={styles.tagsList}>{tagsList}</div>
          <p className={styles.description}>{description}</p>
        </div>
        {user && user.username === author.username ? (
          <div>
            <div className={styles.right}>
              <div className={styles.info}>
                <h2 className={styles.username}>{author.username}</h2>
                <p className={styles.date}>{`${format(date, 'MMMM')} ${format(date, 'd')}, ${format(date, 'y')}`}</p>
              </div>
              <img
                className={styles.avatar}
                src={
                  author.avatar
                    ? `http://localhost:5000/avatars/${author.avatar}`
                    : 'https://static.productionready.io/images/smiley-cyrus.jpg'
                }
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
              src={
                author.avatar
                  ? `http://localhost:5000/avatars/${author.avatar}`
                  : 'https://static.productionready.io/images/smiley-cyrus.jpg'
              }
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
  const loader = isArticleLoading && <Spin className={styles.loader} />

  return (
    <article className={styles.article}>
      {main}
      {errorMessage}
      {loader}
    </article>
  )
}
