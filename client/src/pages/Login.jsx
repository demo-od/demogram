import React, { useEffect } from 'react';
import { Flame, UserCheck, Zap, MessageSquare } from "lucide-react";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/react";

const Login = () => {
    useEffect(() => {
        const root = document.documentElement;
        const savedTheme = localStorage.getItem('demogram_theme') || 'dark';

        // Ensure login page strictly maintains dark theme
        root.classList.add('dark');
        root.style.colorScheme = 'dark';

        return () => {
            if (savedTheme === 'light') {
                root.classList.remove('dark');
                root.style.colorScheme = 'light';
            }
        };
    }, []);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col justify-between relative overflow-hidden">
            {/* Subtle Monochrome Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-white/[0.04] via-neutral-500/[0.02] to-white/[0.03] blur-[140px] rounded-full -z-10 pointer-events-none" />

            {/* Header / Navbar */}
            <header className="flex items-center justify-between px-4 sm:px-6 py-4 sm:py-5 md:px-16 lg:px-40 border-b border-neutral-900 bg-black/80 backdrop-blur-md">
                <div className="flex items-center gap-2 sm:gap-2.5">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg font-bold bg-white text-black flex items-center justify-center text-sm sm:text-lg border border-neutral-200 shadow-sm">
                        DG
                    </div>
                    <span className="font-bold text-lg sm:text-xl tracking-tight text-white hidden sm:block">Demogram</span>
                </div>

                <div>
                    <Show when="signed-out">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <SignInButton mode="modal">
                                <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-neutral-400 hover:text-white transition-colors cursor-pointer">
                                    Sign In
                                </button>
                            </SignInButton>
                            <SignUpButton mode="modal">
                                <button className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold bg-white hover:bg-neutral-200 text-black rounded-lg transition-all shadow-sm cursor-pointer">
                                    Get Started
                                </button>
                            </SignUpButton>
                        </div>
                    </Show>

                    <Show when="signed-in">
                        <UserButton afterSignOutUrl="/" />
                    </Show>
                </div>
            </header>

            {/* Hero Section */}
            <main className="flex-1 flex flex-col lg:flex-row items-center justify-between px-6 py-12 md:px-16 lg:px-40 gap-12">
                {/* Left Column: Hero Content */}
                <div className="flex-1 max-w-2xl space-y-6 text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                        Connect, Share, and Build on <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500">Demogram</span>
                    </h1>

                    <p className="text-lg text-neutral-400 max-w-lg leading-relaxed">
                        The next-generation social network built for modern creators. Share moments, start conversations, and discover what’s trending in real time.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                        <Show when="signed-out">
                            <SignUpButton mode="modal">
                                <button className="px-6 py-3.5 bg-white hover:bg-neutral-200 text-black font-bold rounded-xl transition-all shadow-md text-center cursor-pointer">
                                    Create Free Account
                                </button>
                            </SignUpButton>
                            <SignInButton mode="modal">
                                <button className="px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-800 font-semibold rounded-xl transition-all text-center cursor-pointer">
                                    Sign In
                                </button>
                            </SignInButton>
                        </Show>
                    </div>
                </div>

                {/* Right Column: Social Media Feature Cards */}
                <div className="flex-1 w-full max-w-2xl lg:max-w-md grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-5 bg-neutral-950/80 border border-neutral-800/80 rounded-2xl backdrop-blur-sm hover:border-neutral-700 transition-colors">
                        <Zap className="w-8 h-8 text-white mb-3" />
                        <h3 className="font-semibold text-white mb-1">Real-time Feed</h3>
                        <p className="text-xs text-neutral-400">Instant post updates, likes, and live commentary as it happens.</p>
                    </div>

                    <div className="p-5 bg-neutral-950/80 border border-neutral-800/80 rounded-2xl backdrop-blur-sm hover:border-neutral-700 transition-colors">
                        <MessageSquare className="w-8 h-8 text-white mb-3" />
                        <h3 className="font-semibold text-white mb-1">Direct Messaging</h3>
                        <p className="text-xs text-neutral-400">Private 1-on-1 chats and group conversations with media sharing.</p>
                    </div>

                    <div className="p-5 bg-neutral-950/80 border border-neutral-800/80 rounded-2xl backdrop-blur-sm hover:border-neutral-700 transition-colors">
                        <UserCheck className="w-8 h-8 text-white mb-3" />
                        <h3 className="font-semibold text-white mb-1">Rich Profiles</h3>
                        <p className="text-xs text-neutral-400">Showcase your posts, achievements, and custom social links.</p>
                    </div>

                    <div className="p-5 bg-neutral-950/80 border border-neutral-800/80 rounded-2xl backdrop-blur-sm hover:border-neutral-700 transition-colors">
                        <Flame className="w-8 h-8 text-white mb-3" />
                        <h3 className="font-semibold text-white mb-1">Trending Topics</h3>
                        <p className="text-xs text-neutral-400">Discover viral conversations, popular hashtags, and top creators.</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="px-6 py-6 border-t border-neutral-900 text-center text-xs text-neutral-500">
                © {new Date().getFullYear()} Demogram. All rights reserved.
            </footer>
        </div>
    );
};

export default Login;