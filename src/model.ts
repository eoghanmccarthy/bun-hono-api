import { Post, Param } from './types'

const PREFIX = 'v1:post:'

declare global {
    interface Crypto {
        randomUUID(): string
    }
}

const posts: Post[] = []

const generateID = (key: string) => {
    return `${PREFIX}${key}`
}

export const getPosts = async (): Promise<Post[]> => {
    return posts
}

export const getPost = async (id: string): Promise<Post | undefined> => {
    const post = posts.find((data) => data.id === Number.parseInt(id))
    if (!post) {
        return
    }
    return post
}

export const createPost = async (param: Param): Promise<Post | undefined> => {
    if (!(param && param.title && param.content)) {
        return
    }
    const id =  posts.length + 1;
    const newPost: Post = { content: param.content, id, title: param.title }
    posts.push(newPost)
    return newPost
}
