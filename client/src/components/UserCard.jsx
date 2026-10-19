import React from 'react';
import {dummyUserData} from "../assets/assets.js";
import {MapPin, Users, UserPlus, UserCheck, MessageSquare, Plus, ExternalLink} from "lucide-react";
import {useNavigate} from "react-router-dom";

const UserCard = ({user}) => {
    const currentUser = dummyUserData;
    const navigate = useNavigate();

    const isFollowing = currentUser?.following?.includes(user._id);
    const isConnected = currentUser?.connections?.includes(user._id);

    async function handleFollow(e) {
        e.stopPropagation();
        // Follow logic
    }

    async function handleConnectionRequest(e) {
        e.stopPropagation();
        if (isConnected) {
            navigate(`/messages/${user._id}`);
        } else {
            // Connection request logic
        }
    }

    return (
        <div
            onClick={() => navigate(`/profile/${user._id}`)}
            className="group relative flex flex-col justify-between w-full p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
        >
            {/* Top Accent Gradient Line on Hover */}
            <div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"/>

            <div>
                {/* Profile Header & Avatar */}
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-3">
                        <img
                            src={user?.profile_picture || '/api/placeholder/64/64'}
                            alt={user?.full_name || "User Avatar"}
                            className="w-20 h-20 rounded-full object-cover ring-4 ring-slate-100 dark:ring-zinc-800/60 group-hover:ring-indigo-500/50 shadow-md transition-all duration-300"
                        />
                        <span
                            className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full shadow-sm"/>
                    </div>

                    <div className="flex items-center gap-1 max-w-full">
                        <h3 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {user?.full_name}
                        </h3>
                        <ExternalLink
                            className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"/>
                    </div>

                    {user?.username && (
                        <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                            @{user.username}
                        </p>
                    )}

                    {user?.bio && (
                        <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 line-clamp-2 leading-relaxed px-1">
                            {user.bio}
                        </p>
                    )}
                </div>

                {/* Metadata Chips (Location & Followers) */}
                <div className="flex items-center justify-center flex-wrap gap-2 mt-4">
                    {user?.location && (
                        <div
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-zinc-800/70 text-slate-600 dark:text-zinc-300 border border-slate-200/50 dark:border-zinc-700/50">
                            <MapPin className="w-3.5 h-3.5 text-indigo-500 shrink-0"/>
                            <span className="truncate max-w-[120px]">{user.location}</span>
                        </div>
                    )}

                    <div
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-zinc-800/70 text-slate-600 dark:text-zinc-300 border border-slate-200/50 dark:border-zinc-700/50">
                        <Users className="w-3.5 h-3.5 text-purple-500 shrink-0"/>
                        <span>{user?.followers?.length || 0} Followers</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/60">
                {/* Follow / Following Button */}
                <button
                    disabled={isFollowing}
                    onClick={handleFollow}
                    className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 cursor-pointer ${
                        isFollowing
                            ? 'bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 border border-slate-200 dark:border-zinc-700 cursor-not-allowed'
                            : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30'
                    }`}
                >
                    {isFollowing ? (
                        <>
                            <UserCheck className="w-4 h-4 text-emerald-500"/>
                            <span>Following</span>
                        </>
                    ) : (
                        <>
                            <UserPlus className="w-4 h-4"/>
                            <span>Follow</span>
                        </>
                    )}
                </button>

                {/* Connection Request / Message Icon Button */}
                <button
                    onClick={handleConnectionRequest}
                    title={isConnected ? "Send Message" : "Connect"}
                    className={`inline-flex items-center justify-center p-2.5 rounded-xl border transition-all duration-200 active:scale-95 cursor-pointer ${
                        isConnected
                            ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/80'
                            : 'bg-slate-50 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700'
                    }`}
                >
                    {isConnected ? (
                        <MessageSquare className="w-4 h-4"/>
                    ) : (
                        <Plus className="w-4 h-4"/>
                    )}
                </button>
            </div>
        </div>
    );
};

export default UserCard;