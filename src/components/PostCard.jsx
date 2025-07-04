import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
    
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-white rounded-xl p-4 hover:shadow-lg relative group '>
            <div className='w-full h-3/4 justify-center mb-4 relative'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' />
                <h4 className='absolute bottom-0 right-0 mb-2 mr-2 bg-opacity-60 text-white bg-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    Read ...
                </h4>
            </div>
            <h2
            className='text-xl font-bold h-1/4'
            >{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard