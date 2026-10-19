import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";
import MenuItems from "./MenuItems.jsx";
import {CirclePlus, LogOut} from "lucide-react";
import {UserButton, useClerk} from "@clerk/react";
import {dummyUserData} from "../assets/assets.js";

const Sidebar = ({sidebarOpen, setSidebarOpen}) => {
    const navigate = useNavigate();
    const user = dummyUserData
    const {signOut} = useClerk();
    return (
        <div
            className={`z-200 w-60 xl:w-72 bg-white dark:bg-black border-r border-neutral-200 dark:border-neutral-800 text-black dark:text-white flex flex-col justify-between items-center max-lg:absolute top-0 bottom-0 z-20 ${sidebarOpen ? 'translate-x-0' : 'max-lg:-translate-x-full'} transition-all duration-300 ease-in-out`}>
            <div className="w-full">
                <div className="hidden lg:flex items-center justify-start gap-2.5 px-6 my-4 cursor-pointer"
                     onClick={() => navigate('/')}>
                    <div
                        className="w-9 h-9 rounded-lg font-bold bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm border border-neutral-800 dark:border-neutral-200 shadow-xs">
                        DG
                    </div>
                    <span className="font-bold text-lg text-black dark:text-white tracking-tight">Demogram</span>
                </div>
                <hr className="border-neutral-200 dark:border-neutral-800 mb-6"/>
                <MenuItems setSidebarOpen={setSidebarOpen}/>
                <div className="px-5 mt-4 cursor-pointer" onClick={signOut}>
                    <div
                        className="-mt-3 ml-1 px-3.5 py-2.5 flex items-center gap-3 rounded-xl transition-colors duration-200 hover:bg-neutral-100 dark:hover:bg-neutral-900/70 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white">
                        <LogOut className="w-5 h-5"/>
                        Logout
                    </div>
                </div>
                <div className="px-5 mt-5 flex items-center gap-3 ml-4">
                    <UserButton/>
                    <div>
                        <h1 className="text-sm font-medium">{user.full_name}</h1>
                        <p className="text-xs text-gray-500">@{user.username}</p>
                    </div>
                </div>
            </div>

            <div className="w-full p-4 border-t border-neutral-200 dark:border-neutral-800">
                <ThemeToggle/>
            </div>
        </div>
    )
}
export default Sidebar
