import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

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
            if (posts) {
                setPosts(posts.documents.slice(0, 6));
            }
        });
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full py-8 relative top-12">
            <Container>
                <div className="w-full text-center py-12 bg-gray-100">
                    <h1 className="text-4xl font-bold text-gray-800">
                        Welcome {userData ? userData.name : "Guest"}!
                    </h1>
                    <p className="text-lg text-gray-600 mt-4">
                        {userData
                            ? `Check out the latest articles from the community, ${userData.name}!`
                            : "Discover the latest articles and insights from our writers."}
                    </p>
                </div>

                <div className="w-full flex justify-center mt-6">
                    <input
                        type="text"
                        placeholder="Search blog by name..."
                        className="w-1/2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {filteredPosts.length > 0 ? (
                    <div className="flex flex-wrap mt-8">
                        {filteredPosts.map((post) => (
                            <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 post-card">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <h1 className="text-2xl font-bold text-gray-500">No Posts Found</h1>
                    </div>
                )}

                <div className="w-full text-center mt-8">
                    <a href="/all-posts" className="text-blue-600 text-lg font-semibold hover:underline">
                        View All Posts →
                    </a>
                </div>
            </Container>
        </div>
    );
}

export default Home;