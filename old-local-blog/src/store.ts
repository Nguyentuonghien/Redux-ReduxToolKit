import { configureStore } from '@reduxjs/toolkit'
import blogReducer from 'pages/blog/blog.reducer'

export const store = configureStore({
  // đưa reducer vào
  reducer: { blogBang: blogReducer }
})

// lấy RootState và AppDispatch từ store của chúng ta để phục vụ cho typescript
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.getState
