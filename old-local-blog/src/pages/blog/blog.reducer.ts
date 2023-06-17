import { createReducer, createAction } from '@reduxjs/toolkit'
import { initalPostList } from 'constants/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
}

const initalState: BlogState = {
  postList: initalPostList // giá trị khởi tạo mặc định
}

export const addPost = createAction<Post>('blog/addPost')

const blogReducer = createReducer(initalState, (builder) => {
  // xử lý action: blog/addPost
  builder.addCase(addPost, (state, action) => {
    const post = action.payload
    state.postList.push(post)
  })
})

export default blogReducer
