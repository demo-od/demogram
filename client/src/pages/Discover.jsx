import React, {useState} from 'react';
import {dummyConnectionsData} from "../assets/assets.js";
import {Search, Sparkles, Users, X, Command} from "lucide-react";
import UserCard from "../components/UserCard.jsx";
import Loading from "../components/Loading.jsx";

const Discover = () => {
    const [input, setInput] = useState('');
    const [users, setUsers] = useState(dummyConnectionsData);
    const [loading, setLoading] = useState(false);

    // Filter logic: Handles live typing and Enter press
    const filteredUsers = users.filter((user) => {
        const term = input.toLowerCase().trim();
        if (!term) return true;
        return (
            user.full_name?.toLowerCase().includes(term) ||
            user.username?.toLowerCase().includes(term) ||
            user.bio?.toLowerCase().includes(term) ||
            user.location?.toLowerCase().includes(term)
        );
    });

    const handleSearch = (e) => {
        if (e.key === 'Enter' && input.trim()) {
            setUsers([]);
            setLoading(true);
            setTimeout(() => {
                setUsers(dummyConnectionsData);
                setLoading(false);
            }, 800);
        }
    };

    const handleClearSearch = () => {
        setInput('');
    };

    return (
        <div
            className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                Discover People
                            </h1>
                            <span
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                <Sparkles className="w-3 h-3"/> Live
                            </span>
                        </div>
                        <p className="mt-1 text-sm sm:text-base text-slate-500 dark:text-zinc-400">
                            Connect with amazing people and grow your network.
                        </p>
                    </div>
                </div>

                {/* Glassmorphic Search Container */}
                <div
                    className="mb-8 p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800 shadow-sm transition-all duration-300">
                    <div className="relative flex items-center">
                        <Search
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 w-5 h-5 pointer-events-none"/>

                        <input
                            type="text"
                            placeholder="Search people by name, username, bio, or location..."
                            className="w-full pl-11 pr-20 py-3 text-sm rounded-xl bg-slate-100/80 dark:bg-zinc-800/80 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none transition-all"
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            onKeyUp={handleSearch}
                        />

                        {/* Right Input Utilities (Clear Button & Shortcut Hint) */}
                        <div className="absolute right-3 flex items-center gap-2">
                            {input && (
                                <button
                                    onClick={handleClearSearch}
                                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-700 transition cursor-pointer"
                                    title="Clear search"
                                >
                                    <X className="w-4 h-4"/>
                                </button>
                            )}
                            <div
                                className="hidden sm:flex items-center gap-0.5 px-2 py-1 rounded bg-slate-200/60 dark:bg-zinc-700/60 text-[10px] font-medium text-slate-500 dark:text-zinc-400 pointer-events-none">
                                <span>Press</span>
                                <kbd className="font-semibold">↵</kbd>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                {loading ? (
                    <Loading height="50vh"/>
                ) : filteredUsers.length > 0 ? (
                    /* Responsive Grid Layout */
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                        {filteredUsers.map((user) => (
                            <div key={user._id}>
                                <UserCard user={user}/>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty Search State */
                    <div
                        className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-3xl bg-white/50 dark:bg-zinc-900/50 border border-dashed border-slate-300 dark:border-zinc-800">
                        <div
                            className="p-4 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 mb-4">
                            <Users className="w-8 h-8"/>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            No people found
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400 max-w-sm">
                            We couldn't find anyone matching <span
                            className="font-medium text-indigo-500">"{input}"</span>. Try searching for a different
                            name, handle, or location.
                        </p>
                        <button
                            onClick={handleClearSearch}
                            className="mt-5 px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 active:scale-95 transition cursor-pointer"
                        >
                            Clear Search
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Discover;