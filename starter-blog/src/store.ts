import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/dist/query'
import { blogApi } from 'pages/blog/blog.service'
import blogReducer from 'pages/blog/blog.slice'

export const store = configureStore({
  // đưa reducer vào store
  reducer: {
    blogReducer: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer // thêm reducer được tạo từ api slice
  },

  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(blogApi.middleware)
  }
})

// Optional, nhưng bắt buộc nếu dùng tính năng refetchOnFocus/refetchOnReconnect của RTK query
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.getState
