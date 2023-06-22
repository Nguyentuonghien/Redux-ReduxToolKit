import { createSlice } from '@reduxjs/toolkit'

interface BlogState {
  postId: string
}

const initialState: BlogState = {
  postId: ''
}

const blogSlice = createSlice({
  name: 'blogBang',
  initialState,
  reducers: {}
})

const blogReducer = blogSlice.reducer
export default blogReducer
