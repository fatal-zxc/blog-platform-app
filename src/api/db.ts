import pg from 'pg'

const pool = new pg.Pool({
  user: 'postgres',
  password: '13218586918',
  host: 'localhost',
  port: 5432,
  database: 'blog',
})

export default pool
