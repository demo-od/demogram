import React from 'react';

const Loading = ({ height = '100vh' }) => {
    return (
        <div
            style={{ height }}
            className="flex flex-col items-center justify-center w-full bg-white dark:bg-zinc-950 transition-colors duration-300"
        >
            <div className="relative flex items-center justify-center">
                {/* Outer glowing ring (Pulse) */}
                <div className="absolute w-16 h-16 rounded-full border-4 border-neutral-200 dark:border-neutral-800 animate-pulse"></div>

                {/* Inner spinning gradient ring */}
                <div className="w-12 h-12 rounded-full border-4 border-transparent border-t-indigo-600 border-r-indigo-600 dark:border-t-indigo-400 dark:border-r-indigo-400 animate-spin"></div>
            </div>

            {/* Optional minimalist text */}
            <span className="mt-4 text-sm font-medium text-neutral-500 dark:text-neutral-400 animate-pulse tracking-wide">
        Loading...
      </span>
        </div>
    );
};

export default Loading;
