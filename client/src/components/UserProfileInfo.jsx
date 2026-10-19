import React from 'react'
import {Calendar, MapPin, PenBox, Verified} from "lucide-react";
import moment from 'moment';

const UserProfileInfo = ({user, posts, profileId, setShowEdit}) => {
    return (
        <div className="relative py-4 px-6 md:px-8 bg-white dark:bg-zinc-900">
            <div className="flex flex-col md:flex-row items-start gap-6">
                <div
                    className="w-32 h-32 border-4 border-white dark:border-zinc-900 shadow-lg absolute -top-16 rounded-full">
                    <img src={user.profile_picture} alt="Profile Picture" className="absolute rounded-full z-2"/>
                </div>

                <div className="w-full pt-16 md:pt-0 md:pl-36">
                    <div className="flex flex-col md:flex-row items-start justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user.full_name}</h1>
                                <Verified className="w-6 h-6 text-blue-500"/>
                            </div>
                            <p className="text-gray-600 dark:text-zinc-400">{user.username ? `@${user.username}` : 'Add a username'}</p>
                        </div>
                        {/*If User is not on others profile, that means he is opening his profile so we will give edit button */}
                        {!profileId &&
                            <button onClick={() => setShowEdit(true)}
                                    className="cursor-pointer flex dark:bg-white  dark:text-black items-center gap-2 border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded-lg font-medium transition-colors mt-4 md:mt-0">
                                <PenBox className="w-4 h-4"/>
                                Edit
                            </button>}
                    </div>
                    <p className="dark:text-gray-300 text-gray-700 text-sm max-w-md mt-4">{user.bio}</p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mt-4">
                        <span className="dark:text-gray-300 flex items-center gap-1.5">
                            <MapPin className="w-4 h-4"/>
                            {user.location ? user.location : 'Add location'}
                        </span>

                        <span className="dark:text-gray-300 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4"/>
                            Joined<span className="font-medium">{moment(user.createdAt).fromNow()}</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-6 border-t mt-6 border-gray-200 pt-4">
                        <div>
                            <span className="dark:text-white sm:text-xl font-bold text-gray-900">
                                {posts.length}
                            </span>

                            <span className="dark:text-gray-300 text-xs sm:text-sm text-gray-500 ml-1.5">posts</span>

                        </div>

                        <div>
                            <span className="dark:text-white sm:text-xl font-bold text-gray-900">
                                {user.followers.length}
                            </span>

                            <span
                                className="dark:text-gray-300 text-xs sm:text-sm text-gray-500 ml-1.5">followers</span>

                        </div>

                        <div>
                            <span className="dark:text-white sm:text-xl font-bold text-gray-900">
                                {user.following.length}
                            </span>

                            <span
                                className="dark:text-gray-300 text-xs sm:text-sm text-gray-500 ml-1.5">following</span>

                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}
export default UserProfileInfo
