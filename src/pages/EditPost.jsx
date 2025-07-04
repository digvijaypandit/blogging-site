import React, { useEffect, useState } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost] = useState(null);         // ✅ fixed typo: setPosts -> setPost
    const [loading, setLoading] = useState(true);   // ⏳ loading state
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug)
                .then((fetchedPost) => {
                    if (fetchedPost) {
                        setPost(fetchedPost);
                    } else {
                        navigate('/'); // redirect if not found
                    }
                })
                .catch((error) => {
                    console.error("Error fetching post for editing:", error);
                    navigate('/');
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            navigate('/');
        }
    }, [slug, navigate]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl text-gray-500">
                Loading post data...
            </div>
        );
    }

    return post ? (
        <div className="py-8 relative top-12">
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : (
        <div className="text-center py-12 text-xl text-red-500">
            Post not found or an error occurred.
        </div>
    );
}

export default EditPost;
