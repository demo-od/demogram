import React from 'react'
import {menuItemsData} from "../assets/assets.js";
import {NavLink} from "react-router-dom";

const MenuItems = ({setSidebarOpen}) => {
    return (
        <div className="px-5 text-neutral-600 dark:text-neutral-400 space-y-1 font-medium">
            {
                menuItemsData.map(({to, label, Icon}) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === '/'}
                        onClick={() => setSidebarOpen?.(false)}
                        className={({ isActive }) =>
                            `px-3.5 py-2.5 flex items-center gap-3 rounded-xl transition-colors duration-200 ${
                                isActive
                                    ? 'bg-neutral-100 text-black dark:bg-neutral-900 dark:text-white dark:border dark:border-neutral-800 font-semibold'
                                    : 'hover:bg-neutral-100 dark:hover:bg-neutral-900/70 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                            }`
                        }
                    >
                        <Icon className="w-5 h-5" />
                        {label}
                    </NavLink>
                ))
            }
        </div>
    )
}
export default MenuItems
