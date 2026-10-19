import React, {useState} from 'react'
import {Menu, X} from "lucide-react";
import {Outlet, useLocation} from "react-router-dom";
import Sidebar from "../components/Sidebar";
import {dummyUserData} from "../assets/assets.js";
import Loading from "../components/Loading.jsx";

const Layout = () => {
    const user = dummyUserData
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const location = useLocation()
    const isChatBox = location.pathname.startsWith('/messages/') && location.pathname !== '/messages'
    return user ? (
        <div
            className='w-full flex h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-200 relative'>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

            {/* Fixed Top Navbar for mobile/tablet */}
            {!isChatBox && <div
                className="fixed top-0 left-0 right-0 lg:hidden z-30 bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.location.href = '/'}>
                    <div
                        className="w-9 h-9 rounded-lg font-bold bg-black dark:bg-white text-white dark:text-black flex items-center justify-center text-sm border border-neutral-800 dark:border-neutral-200 shadow-xs">
                        DG
                    </div>
                    <span className="font-bold text-lg text-black dark:text-white tracking-tight">Demogram</span>
                </div>
                {
                    sidebarOpen ?
                        <button
                            type="button"
                            aria-label="Close sidebar"
                            onClick={() => setSidebarOpen(false)}
                            className="p-2 bg-white dark:bg-black rounded-xl shadow-xs border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
                        >
                            <X className="w-6 h-6"/>
                        </button> :
                        <button
                            type="button"
                            aria-label="Open sidebar"
                            onClick={() => setSidebarOpen(true)}
                            className="p-2 bg-white dark:bg-black rounded-xl shadow-xs border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
                        >
                            <Menu className="w-6 h-6"/>
                        </button>
                }
            </div>}

            <div
                className={`flex-1 bg-white dark:bg-black text-black dark:text-white overflow-y-auto transition-colors duration-200 ${isChatBox ? 'pt-0' : 'lg:pt-0 pt-16'}`}>
                <Outlet/>
            </div>
        </div>
    ) : (
        <Loading/>
    )
}
export default Layout
