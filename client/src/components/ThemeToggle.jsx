import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = ({ compact = false, className = '' }) => {
    const { toggleTheme, isDark } = useTheme();

    if (compact) {
        return (
            <button
                type="button"
                onClick={toggleTheme}
                aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
                className={`p-2 rounded-xl bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 shadow-xs transition-all duration-200 cursor-pointer flex items-center justify-center ${className}`}
            >
                {isDark ? (
                    <Sun className="w-5 h-5 text-white hover:rotate-45 transition-transform duration-300" />
                ) : (
                    <Moon className="w-5 h-5 text-black hover:-rotate-12 transition-transform duration-300" />
                )}
            </button>
        );
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 bg-neutral-100 hover:bg-neutral-200/80 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-800 shadow-xs cursor-pointer group select-none ${className}`}
        >
            <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-white dark:bg-black shadow-xs border border-neutral-200 dark:border-neutral-800 flex items-center justify-center">
                    {isDark ? (
                        <Moon className="w-4 h-4 text-white group-hover:rotate-12 transition-transform duration-300" />
                    ) : (
                        <Sun className="w-4 h-4 text-black group-hover:rotate-45 transition-transform duration-300" />
                    )}
                </div>
                <span className="font-medium text-black dark:text-white">
                    {isDark ? 'Dark Mode' : 'Light Mode'}
                </span>
            </div>

            {/* Toggle switch visual */}
            <div
                className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors duration-300 ${
                    isDark ? 'bg-white justify-end' : 'bg-neutral-300 justify-start'
                }`}
            >
                <div className={`w-4 h-4 rounded-full shadow-xs transform transition-transform duration-300 ${isDark ? 'bg-black' : 'bg-white'}`} />
            </div>
        </button>
    );
};

export default ThemeToggle;
