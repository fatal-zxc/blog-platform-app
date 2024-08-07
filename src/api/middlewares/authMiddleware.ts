import jwt from 'jsonwebtoken'

import config from '../config.ts'

export default function (req, _, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    if (!req.headers.authorization) {
      return next()
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      next()
    }
    const decodedToken = jwt.verify(token, config.secret)
    req.user = decodedToken
    next()
  } catch (e) {
    console.log(e)
    next()
  }
}
