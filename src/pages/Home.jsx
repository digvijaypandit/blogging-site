import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";

function Home() {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const reduxUserData = useSelector((state) => state.auth.userData);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (reduxUserData) {
            setUserData(reduxUserData);
        }
    }, [reduxUserData]);

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts && posts.documents) {
                setPosts(posts.documents.slice(0, 6));
            }
        });
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full py-16 relative top-10 bg-gradient-to-b from-[#f8f9fa] to-white min-h-screen">
            <Container>
                {/* Hero Section */}
                <div className="w-full text-center py-14 rounded-xl bg-white shadow-xl backdrop-blur-sm">
                    <h1 className="text-5xl font-extrabold text-gray-800 tracking-tight">
                        Welcome, {userData ? userData.name : "Guest"} 👋
                    </h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-xl mx-auto">
                        {userData
                            ? `Here's the latest from your community, ${userData.name}.`
                            : "Read fresh insights and inspiration from our global writers."}
                    </p>
                </div>

                {/* Search Box */}
                <div className="w-full flex justify-center mt-10">
                    <div className="relative w-1/2">
                        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                        <input
                            type="text"
                            placeholder="Search blog by title..."
                            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Posts Grid */}
                {filteredPosts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
                        {filteredPosts.map((post) => (
                            <PostCard key={post.$id} {...post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <h2 className="text-2xl text-gray-400 font-semibold">No Posts Found 😢</h2>
                    </div>
                )}

                {/* View All */}
                <div className="w-full text-center mt-10">
                    <a
                        href="/all-posts"
                        className="inline-block text-blue-600 text-lg font-semibold hover:underline transition duration-200"
                    >
                        View All Posts →
                    </a>
                </div>
            </Container>
        </div>
    );
}

export default Home;
