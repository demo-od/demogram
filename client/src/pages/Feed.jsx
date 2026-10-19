import React, {useEffect, useState} from 'react';
import {dummyPostsData} from "../assets/assets.js";
import Loading from "../components/Loading.jsx";
import StoriesBar from "../components/StoriesBar.jsx";
import PostCard from "../components/PostCard.jsx";
import RecentMessages from "../components/RecentMessages.jsx";

const Feed = () => {
    const [feeds, setFeeds] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchFeeds = async () => {
        setFeeds(dummyPostsData);
        setLoading(false);
    };

    useEffect(() => {
        fetchFeeds();
    }, []);

    if (loading) return <Loading/>;

    return (
        <div
            className="h-full overflow-y-scroll no-scrollbar py-6 sm:py-8 px-4 sm:px-6 xl:pr-8 flex items-start justify-center xl:gap-8 transition-colors">

            {/* Main Feed Column (Stories & Posts) */}
            <div className="w-full max-w-2xl space-y-6">

                {/* Stories Bar Container */}
                <div className="w-full overflow-hidden">
                    <StoriesBar/>
                </div>

                {/* Posts Feed List */}
                <div className="space-y-6">
                    {feeds.map((post) => (
                        <PostCard key={post._id} post={post}/>
                    ))}
                </div>
            </div>

            {/* Sticky Right Sidebar (Desktop only) */}
            <aside className="hidden xl:block sticky top-6 w-80 shrink-0">
                <RecentMessages/>
            </aside>
        </div>
    );
};

export default Feed;