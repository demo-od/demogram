import React, {useState} from 'react';
import {
    Users,
    UserPlus,
    UserCheck,
    Clock,
    MessageSquare,
    ExternalLink,
    UserX,
    Check,
    Search,
    Sparkles
} from 'lucide-react';
import {useNavigate} from "react-router-dom";
import {
    dummyConnectionsData as connections,
    dummyFollowersData as followers,
    dummyFollowingData as following,
    dummyPendingConnectionsData as pendingConnections
} from '../assets/assets';

const Connections = () => {
    const [currentTab, setCurrentTab] = useState('Followers');
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const tabs = [
        {label: 'Followers', value: followers || [], icon: Users, color: 'from-blue-500 to-indigo-500'},
        {label: 'Following', value: following || [], icon: UserCheck, color: 'from-emerald-500 to-teal-500'},
        {label: 'Pending', value: pendingConnections || [], icon: Clock, color: 'from-amber-500 to-orange-500'},
        {label: 'Connections', value: connections || [], icon: UserPlus, color: 'from-purple-500 to-pink-500'},
    ];

    const activeTabData = tabs.find((item) => item.label === currentTab) || tabs[0];

    // Filter logic for search
    const filteredUsers = activeTabData.value.filter((user) => {
        const term = searchQuery.toLowerCase();
        return (
            user.full_name?.toLowerCase().includes(term) ||
            user.username?.toLowerCase().includes(term) ||
            user.bio?.toLowerCase().includes(term)
        );
    });

    return (
        <div
            className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-100 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                                Network Hub
                            </h1>
                            <span
                                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                <Sparkles className="w-3 h-3"/> Live
              </span>
                        </div>
                        <p className="mt-1 text-sm sm:text-base text-slate-500 dark:text-zinc-400">
                            Manage your professional network, requests, and relationships in one place.
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = currentTab === tab.label;
                        return (
                            <button
                                key={tab.label}
                                onClick={() => setCurrentTab(tab.label)}
                                className={`relative group p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer overflow-hidden ${
                                    isActive
                                        ? 'bg-white dark:bg-zinc-900 border-indigo-500/50 shadow-lg shadow-indigo-500/5 dark:shadow-indigo-500/10 ring-2 ring-indigo-500/20'
                                        : 'bg-white/70 dark:bg-zinc-900/50 border-slate-200/80 dark:border-zinc-800/80 hover:bg-white dark:hover:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-700'
                                }`}
                            >
                                <div className="flex items-center justify-between">
                  <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                    {tab.value.length}
                  </span>
                                    <div
                                        className={`p-2 sm:p-2.5 rounded-xl bg-gradient-to-br ${tab.color} text-white shadow-md transition-transform group-hover:scale-110`}>
                                        <Icon className="w-4 h-4 sm:w-5 sm:h-5"/>
                                    </div>
                                </div>
                                <p className="mt-2 sm:mt-3 text-xs sm:text-sm font-medium text-slate-500 dark:text-zinc-400">
                                    {tab.label}
                                </p>
                            </button>
                        );
                    })}
                </div>

                {/* Dedicated Search Bar */}
                <div className="relative mb-4">
                    <Search
                        className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 pointer-events-none"/>
                    <input
                        type="text"
                        placeholder={`Search in ${currentTab}...`}
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl bg-white dark:bg-zinc-900 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 border border-slate-200/80 dark:border-zinc-800 focus:border-indigo-500 focus:outline-none shadow-sm transition-all"
                    />
                </div>

                {/* Navigation Tabs (2x2 Grid on Mobile, Flex on Desktop) */}
                <div
                    className="relative mb-8 p-1.5 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 shadow-sm">
                    <div className="grid grid-cols-2 sm:flex sm:items-center sm:justify-start gap-1.5">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = currentTab === tab.label;
                            return (
                                <button
                                    key={tab.label}
                                    onClick={() => setCurrentTab(tab.label)}
                                    className={`flex items-center justify-center sm:justify-start gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                                        isActive
                                            ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20 font-semibold'
                                            : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800/60'
                                    }`}
                                >
                                    <Icon className="w-4 h-4 shrink-0"/>
                                    <span className="truncate">{tab.label}</span>
                                    <span className={`px-1.5 py-0.5 text-[10px] sm:text-xs rounded-full shrink-0 ${
                                        isActive
                                            ? 'bg-white/20 text-white'
                                            : 'bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400'
                                    }`}>
                    {tab.value.length}
                  </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* User Cards Grid */}
                {filteredUsers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {filteredUsers.map((user) => (
                            <div
                                key={user._id}
                                className="group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                            >
                                <div>
                                    {/* User Header Info */}
                                    <div className="flex items-start gap-4">
                                        <div className="relative">
                                            <img
                                                src={user.profile_picture || '/api/placeholder/48/48'}
                                                alt={user.full_name}
                                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-slate-100 dark:ring-zinc-800 group-hover:ring-indigo-500 transition-all duration-300"
                                            />
                                            <span
                                                className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full"/>
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                                {user.full_name}
                                            </h3>
                                            <p className="text-xs text-slate-500 dark:text-zinc-400 truncate">
                                                @{user.username}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="mt-4 text-xs sm:text-sm text-slate-600 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                                        {user.bio || "No bio provided."}
                                    </p>
                                </div>

                                {/* Card Actions */}
                                <div
                                    className="mt-6 pt-4 border-t border-slate-100 dark:border-zinc-800/60 flex items-center gap-2">
                                    <button
                                        onClick={() => navigate(`/profile/${user._id}`)}
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 hover:bg-slate-200 dark:hover:bg-zinc-700 active:scale-95 transition cursor-pointer"
                                    >
                                        <span>Profile</span>
                                        <ExternalLink className="w-3.5 h-3.5"/>
                                    </button>

                                    {/* Tab Specific Actions */}
                                    {currentTab === 'Following' && (
                                        <button
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 hover:bg-rose-100 dark:hover:bg-rose-900/60 active:scale-95 transition cursor-pointer">
                                            <UserX className="w-3.5 h-3.5"/>
                                            <span>Unfollow</span>
                                        </button>
                                    )}

                                    {currentTab === 'Pending' && (
                                        <button
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 active:scale-95 transition cursor-pointer">
                                            <Check className="w-3.5 h-3.5"/>
                                            <span>Accept</span>
                                        </button>
                                    )}

                                    {currentTab === 'Connections' && (
                                        <button
                                            onClick={() => navigate(`/messages/${user._id}`)}
                                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20 active:scale-95 transition cursor-pointer"
                                        >
                                            <MessageSquare className="w-3.5 h-3.5"/>
                                            <span>Message</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div
                        className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-3xl bg-white/50 dark:bg-zinc-900/50 border border-dashed border-slate-300 dark:border-zinc-800">
                        <div
                            className="p-4 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-400 dark:text-zinc-500 mb-4">
                            <Users className="w-8 h-8"/>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            No {currentTab.toLowerCase()} found
                        </h3>
                        <p className="mt-1 text-sm text-slate-500 dark:text-zinc-400 max-w-sm">
                            {searchQuery
                                ? `No results match "${searchQuery}". Try searching for another name or handle.`
                                : `You don't have any items under ${currentTab.toLowerCase()} right now.`}
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Connections;