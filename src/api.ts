import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { bearerAuth } from 'hono/bearer-auth'

import * as model from './model'

const api = new Hono()

api.use('/posts/*', cors({
    origin: 'http://localhost:3000'
}))

api.get('/posts', async (c) => {
    const posts = await model.getPosts()
    return c.json({ posts: posts, ok: true })
})

api.get('/posts/:id', async (c) => {
    const { id } = c.req.param()
    const post = await model.getPost(id)
    if (!post) {
        return c.json({ error: 'Not Found', ok: false }, 404)
    }
    return c.json({ post: post, ok: true })
})

api.post('/posts', bearerAuth({ token: process.env.BEARER_TOKEN || '' }), async (c) => {
    const param = await c.req.parseBody() as model.Param;
    const newPost = await model.createPost(param as model.Param)
    if (!newPost) {
        return c.json({ error: 'Can not create new post', ok: false }, 422)
    }
    return c.json({ post: newPost, ok: true }, 201)
})

export default api
