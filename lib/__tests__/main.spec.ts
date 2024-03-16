import { describe, test } from 'vitest'
// import { flyapi, type Group } from '../main'

describe('Flyapi', () => {
  test('simple test', async () => {
    // Todo: write tests

    // interface Post {
    //   postId: number
    //   id: number
    //   title: string
    //   body: string
    // }
    // interface Comment {
    //   postId: number
    //   id: number
    //   name: string
    //   email: string
    //   body: string
    // }

    // interface Todo {
    //   userId: number
    //   id: number
    //   title: string
    //   completed: boolean
    // }

    // interface TestAPI {
    //   posts: Group<{
    //     comments: Comment[]
    //   }, Post | Post[]>
    //   todos: Todo | Todo[]
    // }

    // const api = flyapi<TestAPI>({ fetchOptions: { baseURL: 'https://jsonplaceholder.typicode.com' } })

    // const posts = await api.posts.exec<Post[]>()
    // const post = await api.posts.exec<Post>({ urlParams: { posts: 1 } })
    // const comments = await api.posts.comments.exec({ urlParams: { posts: 1 } })
    // const todos = await api.todos.exec<Todo[]>()
    // const todo = await api.todos.exec<Todo>({ urlParams: { todos: 1 } })

    // console.log(posts.length)
    // console.log(post.id)
    // console.log(comments.length)
    // console.log(todos.length)
    // console.log(todo.id)
  })
})
