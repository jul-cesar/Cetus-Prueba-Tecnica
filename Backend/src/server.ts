import { Hono } from 'hono'
import { logger } from 'hono/logger'

export const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use(logger())

export default app

