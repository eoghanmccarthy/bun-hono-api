import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'
import { prettyJSON } from 'hono/pretty-json'
import { env } from 'hono/adapter'

import api from './api'

const app = new Hono()

app.get('/', (c) => c.text('Pretty Blog API'))
app.notFound((c) => c.json({ message: 'Not Found', ok: false }, 404))

const middleware = new Hono()
middleware.use('*', prettyJSON())
// middleware.use('/posts/*', async (c, next) => {
//     if (c.req.method !== 'GET') {
//         const { PASSWORD } = env<{ PASSWORD: string }>(c)
//         const auth = basicAuth({ username: 'me', password: PASSWORD || '' })
//         return auth(c, next)
//     } else {
//         await next()
//     }
// })

app.route('/api', middleware)
app.route('/api', api)

export default app
