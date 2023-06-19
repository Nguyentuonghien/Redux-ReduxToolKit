import React from 'react'
import PostItem from '../PostItem'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store'
import { deletePost, startEditingPost } from 'pages/blog/blog.slice'

export default function PostList() {
  // muốn lấy data ==> dùng useSelector()
  // lấy state trog Redux:
  const postListState = useSelector((state: RootState) => state.blogBang.postList)

  // console.log('postList:', postListState)

  // delete 1 post item trong post list:
  const dispatch = useDispatch()
  const handleDelete = (postId: string) => {
    dispatch(deletePost(postId))
  }

  // edit 1 post item trong post list:
  const handleStartEditing = (postId: string) => {
    dispatch(startEditingPost(postId))
  }

  return (
    <div className='bg-white py-6 sm:py-8 lg:py-12'>
      <div className='mx-auto max-w-screen-xl px-4 md:px-8'>
        <div className='mb-10 md:mb-16'>
          <h2 className='mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl'>Được Dev Blog</h2>
          <p className='mx-auto max-w-screen-md text-center text-gray-500 md:text-lg'>
            Đừng bao giờ từ bỏ. Hôm nay khó khăn, ngày mai sẽ trở nên tồi tệ. Nhưng ngày mốt sẽ có nắng
          </p>
        </div>
        <div className='grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-2 xl:grid-cols-2 xl:gap-8'>
          {/* render postList ra: */}
          {postListState.map((post) => (
            <PostItem post={post} key={post.id} handleDelete={handleDelete} handleStartEditing={handleStartEditing} />
          ))}
        </div>
      </div>
    </div>
  )
}
