import { useLocation, Navigate } from 'react-router-dom'

import { useFetchArticleQuery, useGetUserQuery } from '../services/blog.js'

export default function RequireOwner({ children }) {
  const location = useLocation()
  const { data: user, isSuccess: isSuccess1 } = useGetUserQuery()
  const { data: article, isSuccess: isSuccess2 } = useFetchArticleQuery(location.pathname.split('/')[2])

  if (isSuccess1 && isSuccess2) {
    const owner = user.username === article.author.username

    if (!owner) {
      return <Navigate to="/" />
    }

    return children
  }
}
