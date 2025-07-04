import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts && posts.documents) {
                setPosts(posts.documents);
            }
            setLoading(false);
        }).catch((error) => {
            console.error("Error fetching posts:", error);
            setLoading(false);
        });
    }, []);

    return (
        <div className="py-16 relative top-6 bg-gradient-to-b from-[#f7f9fc] to-white min-h-screen">
            <Container>
                <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">All Blog Posts</h1>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                        {[...Array(8)].map((_, index) => (
                            <div
                                key={index}
                                role="status"
                                className="p-4 border border-gray-200 rounded-lg shadow animate-pulse dark:border-gray-700 bg-white"
                            >
                                <div className="flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700" />
                                <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-3/4 mb-3"></div>
                                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700 w-2/3"></div>
                            </div>
                        ))}
                    </div>
                ) : posts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
                        {posts.map((post) => (
                            <div
                                key={post.$id}
                                className="transform hover:scale-[1.02] transition-transform duration-300"
                            >
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 mt-20">
                        <h2 className="text-2xl font-semibold">No Posts Found</h2>
                        <p className="mt-2">There are currently no blog posts available.</p>
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
