import { createReducer, createAction } from '@reduxjs/toolkit'
import { initalPostList } from 'constants/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initalState: BlogState = {
  postList: initalPostList, // giá trị khởi tạo mặc định
  editingPost: null
}

// add post
export const addPost = createAction<Post>('blogBang/addPost')

// delete post
export const deletePost = createAction<string>('blogBang/deletePost')

// start edit post
export const startEditingPost = createAction<string>('blogBang/startEditingPost')

// finish edit post
export const finishEditingPost = createAction<Post>('blogBang/finishEditingPost')

// cancel
export const cancelEditingPost = createAction('blogBang/cancelEditingPost')

const blogReducer = createReducer(initalState, (builder) => {
  // xử lý action: blog/addPost
  builder
    .addCase(addPost, (state, action) => {
      const post = action.payload
      state.postList.push(post)
    })
    .addCase(deletePost, (state, action) => {
      // tìm ra index của Post trong PostList
      // payload chính là id của post ta muốn xóa
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
      // không tìm thấy sẽ trả về -1
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1)
      }
    })
    .addCase(startEditingPost, (state, action) => {
      const foundPost = state.postList.find((post) => post.id === action.payload) || null
      // bắt đầu edit
      state.editingPost = foundPost
    })
    .addCase(cancelEditingPost, (state, action) => {
      state.editingPost = null
    })
    .addCase(finishEditingPost, (state, action) => {
      const postId = action.payload.id
      state.postList.some((post, index) => {
        if (post.id === postId) {
          state.postList[index] = action.payload
          return true
        }
        return false
      })
      state.editingPost = null
    })
  // addMatcher() cho phép ta thêm 'match function', nếu 'match function' return true -> nó sẽ nhảy vào case này
  // .addMatcher((action) => action.type.includes('cancel'), (state, action) => {

  // })
})

export default blogReducer
