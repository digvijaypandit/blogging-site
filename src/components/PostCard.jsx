import React from 'react';
import appwriteService from "../appwrite/config";
import { Link } from 'react-router-dom';

function PostCard({ $id, title, featuredImage }) {
    return (
        <Link to={`/post/${$id}`} className="block group">
            <div className="w-full bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="relative w-full h-52 overflow-hidden">
                    <img
                        src={appwriteService.getFilePreview(featuredImage)}
                        alt={title}
                        className="w-full h-full object-cover transform group-hover:scale-105 group-hover:brightness-90 transition-transform duration-300"
                    />
                    <div className="absolute bottom-0 right-0 mb-2 mr-2 bg-black/60 text-white px-3 py-1 text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Read More →
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
                        {title}
                    </h2>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;
