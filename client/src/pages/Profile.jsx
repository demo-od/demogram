import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';
import {dummyPostsData, dummyUserData} from "../assets/assets.js";
import Loading from "../components/Loading.jsx";
import UserProfileInfo from "../components/UserProfileInfo.jsx";
import PostCard from "../components/PostCard.jsx";
import ProfileModal from "../components/ProfileModal.jsx";
import moment from 'moment';
import {FileText, Grid, Heart, Sparkles, Image as ImageIcon} from 'lucide-react';

const Profile = () => {
    const {profileId} = useParams();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');
    const [showEdit, setShowEdit] = useState(false);

    const fetchUser = async () => {
        // Simulating data fetch
        setUser(dummyUserData);
        setPosts(dummyPostsData);
    };

    useEffect(() => {
        fetchUser();
    }, [profileId]);

    if (!user) return <Loading/>;

    // Filter posts that contain media
    const mediaPosts = posts.filter((post) => post?.image_urls && post.image_urls.length > 0);
    const allImages = mediaPosts.flatMap((post) =>
        post.image_urls.map((url) => ({url, createdAt: post.createdAt, postId: post._id}))
    );

    const tabs = [
        {id: 'posts', label: 'Posts', icon: FileText, count: posts.length},
        {id: 'media', label: 'Media', icon: Grid, count: allImages.length},
        {id: 'likes', label: 'Likes', icon: Heart, count: 0},
    ];

    return (
        <div
            className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 p-4 md:p-8 transition-colors duration-200">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Profile Card Header */}
                <div
                    className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden backdrop-blur-md">
                    {/* Cover Photo Area */}
                    <div className="relative h-44 sm:h-56 md:h-64 w-full bg-slate-900 overflow-hidden">
                        {user.cover_photo ? (
                            <img
                                src={user.cover_photo}
                                alt="Cover"
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"/>
                        )}
                        <div
                            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"/>
                    </div>

                    {/* User Profile Info Component */}
                    <div className="px-6 pb-6 relative">
                        <UserProfileInfo
                            user={user}
                            posts={posts}
                            profileId={profileId}
                            setShowEdit={setShowEdit}
                        />
                    </div>
                </div>

                {/* Navigation Tabs */}
                <div
                    className="sticky top-4 z-20 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800 p-1.5 rounded-2xl shadow-sm flex items-center justify-around max-w-md mx-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative flex items-center justify-center gap-2 flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                                    isActive
                                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                                        : "text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-zinc-800/50"
                                }`}
                            >
                                <Icon className="w-4 h-4"/>
                                <span>{tab.label}</span>
                                {tab.count > 0 && (
                                    <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
                                        isActive
                                            ? "bg-indigo-700/60 text-white"
                                            : "bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400"
                                    }`}>
                                        {tab.count}
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Dynamic Content Views */}
                <div className="pt-2">

                    {/* Posts Tab */}
                    {activeTab === 'posts' && (
                        <div className="space-y-6 max-w-2xl mx-auto">
                            {posts.length > 0 ? (
                                posts.map((post) => (
                                    <PostCard key={post._id} post={post}/>
                                ))
                            ) : (
                                <EmptyState message="No posts published yet."/>
                            )}
                        </div>
                    )}

                    {/* Media Tab Grid */}
                    {activeTab === 'media' && (
                        <div>
                            {allImages.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
                                    {allImages.map((img, index) => (
                                        <Link
                                            key={`${img.postId}-${index}`}
                                            to={img.url}
                                            target="_blank"
                                            className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-sm"
                                        >
                                            <img
                                                src={img.url}
                                                alt="Media upload"
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                loading="lazy"
                                            />
                                            <div
                                                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                                                <p className="text-xs text-white/90 font-medium backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-full border border-white/10">
                                                    Posted {moment(img.createdAt).fromNow()}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <EmptyState message="No media uploaded yet."/>
                            )}
                        </div>
                    )}

                    {/* Likes Tab */}
                    {activeTab === 'likes' && (
                        <EmptyState message="Liked posts will appear here."/>
                    )}
                </div>
            </div>

            {/* Profile Edit Modal */}
            {showEdit && <ProfileModal setShowEdit={setShowEdit}/>}
        </div>
    );
};

// Reusable Empty State Box
const EmptyState = ({message}) => (
    <div
        className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-zinc-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-zinc-800 my-4">
        <div className="p-3 bg-indigo-50 dark:bg-zinc-800 text-indigo-500 rounded-full mb-3">
            <Sparkles className="w-5 h-5"/>
        </div>
        <p className="text-sm font-medium text-slate-500 dark:text-zinc-400">{message}</p>
    </div>
);

export default Profile;