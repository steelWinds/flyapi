import { describe, test } from 'vitest'
import { flyapi } from '../main'

describe('Flyapi', () => {
  test('simple test', async () => {
    interface Todo {
      userId: number
      id: number
      title: string
      completed: boolean
    }

    interface Post {
      id: number
      title: string
    }

    interface TestAPI {
      todos: Todo
      posts: Post
    }

    const apiInstance = flyapi<TestAPI>({ fetchOptions: { baseURL: 'https://jsonplaceholder.typicode.com' } })

    const todo = await apiInstance.todos({ inlinePathChunks: [2] })
    const posts = await apiInstance.posts({ inlinePathChunks: [2] })
    const created = await apiInstance.posts({
      method: 'POST',
      body: {
        title: 'foo',
        body: 'bar',
        userId: 1
      }
    })
		const commentsFrom1Post = await apiInstance.

    console.log(todo, posts, created)
  })
})
