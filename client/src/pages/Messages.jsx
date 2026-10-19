import React from 'react';
import {dummyConnectionsData} from "../assets/assets.js";
import {Eye, MessageSquare, Search, Users} from "lucide-react";
import {useNavigate} from "react-router-dom";

const Messages = () => {
    const navigate = useNavigate();

    return (
        <div
            className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 transition-colors duration-200">
            <div className="max-w-6xl mx-auto px-4 py-8 md:px-8">

                {/* Dashboard Header */}
                <div
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200/60 dark:border-zinc-800/60 pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-zinc-50 flex items-center gap-2">
                            <MessageSquare className="w-8 h-8 text-indigo-600 dark:text-purple-500"/>
                            Messages
                        </h1>
                        <p className="text-slate-500 dark:text-zinc-400 mt-1">
                            Connect and chat with your friends and family
                        </p>
                    </div>

                    {/* Stats or Quick Search Bar */}
                    <div
                        className="flex items-center gap-3 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl px-4 py-2 shadow-sm w-full md:w-72">
                        <Search className="w-4 h-4 text-slate-400"/>
                        <input
                            type="text"
                            placeholder="Search connections..."
                            className="bg-transparent text-sm w-full outline-none placeholder-slate-400 dark:placeholder-zinc-500 text-slate-700 dark:text-zinc-200"
                        />
                    </div>
                </div>

                {/* Connections Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dummyConnectionsData.map((user) => (
                        <div
                            key={user._id}
                            className="group flex flex-col justify-between p-5 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/50 shadow-sm rounded-2xl hover:shadow-md dark:hover:border-zinc-700/50 transition-all duration-200"
                        >
                            {/* User Main Metadata */}
                            <div className="flex items-start gap-4">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={user.profile_picture}
                                        alt={`${user.full_name}'s profile`}
                                        className="rounded-full w-14 h-14 object-cover ring-2 ring-slate-100 dark:ring-zinc-800 group-hover:ring-indigo-500/20 dark:group-hover:ring-purple-500/30 transition-all"
                                    />
                                    <span
                                        className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full"></span>
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h2 className="font-semibold text-slate-900 dark:text-zinc-50 truncate group-hover:text-indigo-600 dark:group-hover:text-purple-400 transition-colors">
                                        {user.full_name}
                                    </h2>
                                    <p className="text-xs text-slate-400 dark:text-zinc-500 truncate">@{user.username}</p>
                                </div>
                            </div>

                            {/* User Biography snippet */}
                            <div className="my-4">
                                <p className="text-sm text-slate-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                                    {user.bio || "No bio added yet."}
                                </p>
                            </div>

                            {/* Refactored Row Action Dashboard */}
                            <div
                                className="flex items-center gap-2 border-t border-slate-100 dark:border-zinc-800/60 pt-4 mt-2">
                                <button
                                    onClick={() => navigate(`/messages/${user._id}`)}
                                    className="flex-1 flex items-center justify-center gap-2 text-sm font-medium h-10 px-4 rounded-xl bg-indigo-50 dark:bg-purple-950/40 text-indigo-600 dark:text-purple-400 hover:bg-indigo-100 dark:hover:bg-purple-950/80 active:scale-[0.98] transition-all cursor-pointer"
                                >
                                    <MessageSquare className="w-4 h-4"/>
                                    <span>Chat</span>
                                </button>

                                <button
                                    onClick={() => navigate(`/profile/${user._id}`)}
                                    className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 dark:border-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-50 dark:hover:bg-zinc-800/60 active:scale-[0.98] transition-all cursor-pointer"
                                    title="View Profile"
                                >
                                    <Eye className="w-4 h-4"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State Handler */}
                {dummyConnectionsData.length === 0 && (
                    <div
                        className="flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-zinc-900 rounded-2xl border border-dashed border-slate-200 dark:border-zinc-800 max-w-md mx-auto mt-12">
                        <Users className="w-12 h-12 text-slate-300 dark:text-zinc-700 mb-3"/>
                        <h3 className="font-semibold text-slate-800 dark:text-zinc-200">No connections yet</h3>
                        <p className="text-sm text-slate-500 dark:text-zinc-500 mt-1">Start following people to see them
                            here and kick off a conversation!</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Messages;
