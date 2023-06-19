import { createReducer, createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { initalPostList } from 'constants/blog'
import { Post } from 'types/blog.type'

interface BlogState {
  postList: Post[]
  editingPost: Post | null
}

const initialState: BlogState = {
  postList: initalPostList, // giá trị khởi tạo mặc định
  editingPost: null
}

// add post
// export const addPost = createAction<Post>('blogBang/addPost')

// delete post
// export const deletePost = createAction<string>('blogBang/deletePost')

// start edit post
// export const startEditingPost = createAction<string>('blogBang/startEditingPost')

// finish edit post
// export const finishEditingPost = createAction<Post>('blogBang/finishEditingPost')

// cancel
// export const cancelEditingPost = createAction('blogBang/cancelEditingPost')

const blogSlice = createSlice({
  name: 'blogBang', // Đây là prefix cho action type
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      const post = action.payload
      state.postList.push(post)
    },
    deletePost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
      // không tìm thấy sẽ trả về -1
      if (foundPostIndex !== -1) {
        state.postList.splice(foundPostIndex, 1)
      }
    },
    startEditingPost: (state, action: PayloadAction<string>) => {
      const postId = action.payload
      const foundPost = state.postList.find((post) => post.id === postId) || null
      state.editingPost = foundPost
    },
    cancelEditingPost: (state) => {
      state.editingPost = null
    },
    finishEditingPost: (state, action: PayloadAction<Post>) => {
      const postItem = action.payload
      state.postList.some((post, index) => {
        if (post.id === postItem.id) {
          state.postList[index] = postItem
          return true
        }
        return false
      })
      state.editingPost = null
    }
  }
})

// export action được generate ra từ slice
export const { addPost, deletePost, startEditingPost, cancelEditingPost, finishEditingPost } = blogSlice.actions

const blogReducer = blogSlice.reducer

export default blogReducer

// const blogReducer = createReducer(initialState, (builder) => {
//   // xử lý action: blog/addPost
//   builder
//     .addCase(addPost, (state, action) => {
//       const post = action.payload
//       state.postList.push(post)
//     })
//     .addCase(deletePost, (state, action) => {
//       // tìm ra index của Post trong PostList
//       // payload chính là id của post ta muốn xóa
//       const postId = action.payload
//       const foundPostIndex = state.postList.findIndex((post) => post.id === postId)
//       // không tìm thấy sẽ trả về -1
//       if (foundPostIndex !== -1) {
//         state.postList.splice(foundPostIndex, 1)
//       }
//     })
//     .addCase(startEditingPost, (state, action) => {
//       const foundPost = state.postList.find((post) => post.id === action.payload) || null
//       // bắt đầu edit
//       state.editingPost = foundPost
//     })
//     .addCase(cancelEditingPost, (state, action) => {
//       state.editingPost = null
//     })
//     .addCase(finishEditingPost, (state, action) => {
//       const postId = action.payload.id
//       state.postList.some((post, index) => {
//         if (post.id === postId) {
//           state.postList[index] = action.payload
//           return true
//         }
//         return false
//       })
//       state.editingPost = null
//     })
//   // addMatcher() cho phép ta thêm 'match function', nếu 'match function' return true -> nó sẽ nhảy vào case này
//   // .addMatcher((action) => action.type.includes('cancel'), (state, action) => {

//   // })
// })

// export default blogReducer
