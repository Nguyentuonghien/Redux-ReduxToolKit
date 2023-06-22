import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'types/blog.type'

// Nếu bên slice chúng ta dùng createSlice để tạo slice thì bên RTK query dùng createApi
// Với createApi chúng ta gọi là slice api
// Chúng ta sẽ khai báo baseUrl và các endpoints

// baseQuery được dùng cho mỗi endpoint để fetch api

// fetchBaseQuery là một function nhỏ được xây dựng trên fetch API
// Nó không thay thế hoàn toàn được Axios nhưng sẽ giải quyết được hầu hết các vấn đề của bạn
// Chúng ta có thể dùng axios thay thế cũng được, nhưng để sau nhé

// endPoints là tập hợp những method giúp get, post, put, delete... tương tác với server
// Khi khai báo endPoints nó sẽ sinh ra cho chúng ta các hook tương ứng để dùng trong component
// endpoints có 2 kiểu là query và mutation.
// Query: Thường dùng cho GET
// Mutation: Thường dùng cho các trường hợp thay đổi dữ liệu trên server như POST, PUT, DELETE

export const blogApi = createApi({
  reducerPath: 'blogApi', // tên field trong Redux state
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:4000' }),
  endpoints: (builder) => ({
    // generic type của query<> theo thứ tự: kiểu response trả về và argument
    getPost: builder.query<Post[], void>({
      query: () => 'posts' // localhost:4000/posts
    })
  })
})

// tự sinh ra các hooks tương ứng cho ta từ blogApi
export const { useGetPostQuery } = blogApi
