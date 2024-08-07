import jwt from 'jsonwebtoken'

import config from '../config.ts'

export default function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    if (!req.headers.authorization) {
      return res.status(403).json({ message: 'пользователь не авторизован' })
    }
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: 'пользователь не авторизован' })
    }
    const decodedToken = jwt.verify(token, config.secret)
    req.user = decodedToken
    next()
  } catch (e) {
    console.log(e)
    return res.status(403).json({ message: 'пользователь не авторизован' })
  }
}
