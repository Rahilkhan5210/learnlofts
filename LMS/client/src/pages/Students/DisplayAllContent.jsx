import React from 'react'
import BlogsPage from '../Blogs'
import About from '../About'

const DisplayAllContent = () => {
  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        {/* Blogs */}
        <BlogsPage />
      </div>

      <div className='mt-5 flex flex-col gap-4 p-4'>
        {/* About */}
        <About/>
      </div>
    </div>
  )
}

export default DisplayAllContent