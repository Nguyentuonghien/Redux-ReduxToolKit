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
  tagTypes: ['Posts'], // những kiểu tag cho phép dùng trong blogApi
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/'
  }),
  endpoints: (builder) => ({
    // Generic type theo thứ tự là kiểu response trả về: Post[] or Post
    // và argument là body gửi lên: void or Omit<>
    getPosts: builder.query<Post[], void>({
      query: () => 'posts', // method không có argument

      // providesTags có thể là array hoặc callback return array
      // Nếu có bất kỳ một invalidatesTag nào match với providesTags này => sẽ làm cho getPosts method chạy lại
      // và cập nhật lại danh sách các bài post cũng như các tags phía dưới.
      // result: là kết quả khi getPosts thành công
      // callback này sẽ chạy mỗi khi getPosts chạy
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
          return final
        }
        return [{ type: 'Posts' as const, id: 'LIST' }]
      }
    }),
    addPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body
      }),
      // invalidatesTags cung cấp các tag để báo hiệu cho những method nào có providesTags
      // match với nó sẽ bị gọi lại, trong trường hợp này getPosts sẽ chạy lại vì trong getPosts có
      // providesTags() trả về [{ type: 'Posts' as const, id: 'LIST' }]
      invalidatesTags: (result, error, body) => [{ type: 'Posts', id: 'LIST' }]
    }),
    getPostById: builder.query<Post, string>({
      query: (id) => `posts/${id}`
    }),
    updatePost: builder.mutation<Post, { id: string; body: Post }>({
      query(data) {
        return {
          url: `posts/${data.id}`,
          method: 'PUT',
          body: data.body
        }
      },
      // trong trường hợp này thì getPosts sẽ chạy lại
      invalidatesTags: (result, error, data) => [{ type: 'Posts', id: data.id }]
    }),
    deletePost: builder.mutation<{}, string>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE'
        }
      },
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id: id }]
    })
  })
})

export const {
  useGetPostsQuery,
  useAddPostMutation,
  useGetPostByIdQuery,
  useUpdatePostMutation,
  useDeletePostMutation
} = blogApi
