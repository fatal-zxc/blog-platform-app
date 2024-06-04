import { Pagination, ConfigProvider, Alert, Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { useFetchArticlesQuery } from '../../services/blog'
import ArticlePreview from '../ArticlePreview'
import { selectPage } from '../../store/selectors'
import { changePage } from '../../store/app-slice'

import styles from './article-list.module.scss'

export default function ArticleList() {
  const dispatch = useDispatch()

  const page = useSelector(selectPage)

  const { data: articles, error, isLoading } = useFetchArticlesQuery(page)

  const articlesPreviews =
    articles &&
    articles.articles.map((article) => (
      <ArticlePreview
        title={article.title}
        likes={article.favoritesCount}
        like={article.favorited}
        tags={article.tagList}
        description={article.description}
        author={article.author}
        time={article.updatedAt}
        slug={article.slug}
        key={article.slug}
      />
    ))

  const errorMessage = error && (
    <Alert
      type="error"
      message="smth error"
    />
  )
  const loader = isLoading && <Spin />

  const handlerPagination = (newPage) => {
    dispatch(changePage(newPage))
  }

  return (
    <section className={styles.articleList}>
      {articlesPreviews}
      {errorMessage}
      {loader}
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ffffff',
          },
          components: {
            Pagination: {
              itemActiveBg: '#1890FF',
            },
          },
        }}
      >
        {articles && (
          <Pagination
            className={styles.pagination}
            size="small"
            defaultCurrent={page}
            total={Math.ceil(articles.articlesCount / 5) * 10}
            showSizeChanger={false}
            onChange={handlerPagination}
          />
        )}
      </ConfigProvider>
    </section>
  )
}
