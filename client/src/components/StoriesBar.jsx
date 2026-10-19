import React, {useEffect, useState} from 'react'
import {dummyStoriesData} from "../assets/assets.js";
import {Plus} from "lucide-react";
import moment from "moment";
import {useTheme} from "../context/ThemeContext";
import StoryModal from "./StoryModal.jsx";
import StoryViewer from "./StoryViewer.jsx";

const StoriesBar = () => {
    const [showModal, setShowModal] = useState(false);
    const [viewStory, setViewStory] = useState(null)
    const {isDark} = useTheme();
    const [stories, setStories] = useState([]);
    const fetchStories = async () => {
        setStories(dummyStoriesData);
    }

    useEffect(() => {
        fetchStories();
    }, []);
    return (
        <div className="w-screen  lg:max-w-2xl no-scrollbar overflow-x-auto px-4">
            <div className="flex gap-4 pb-5">
                {/*Add Story card  */}
                <div onClick={() => setShowModal(true)}
                     className={`rounded-lg shadow-sm min-w-30 max-w-30 max-h-40 aspect-[3/4] cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-dashed ${isDark ? 'border-indigo-400 bg-gradient-to-b from-indigo-900/30 to-gray-900' : 'border-indigo-300 bg-gradient-to-b from-indigo-50 to-white'}`}>
                    <div className="h-full flex flex-col items-center justify-center p-4">
                        <div className="size-10 bg-indigo-500 rounded-full flex items-center justify-center mb-3">
                            <Plus className="w-5 h-5 text-white"/>
                        </div>
                        <p className={`text-sm font-medium text-center ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Create
                            Story</p>
                    </div>
                </div>
                {/*Story cards*/}
                {
                    stories.map((story, index) => (
                        <div onClick={() => setViewStory(story)} key={index}
                             className={`relative rounded-lg shadow min-w-30 max-w-30 max-h-40 cursor-pointer hover:shadow-lg transition-all duration-200 ${isDark ? 'bg-gradient-to-b from-indigo-500 to-purple-600 hover:from-indigo-700 hover:to-purple-800' : 'bg-gradient-to-b from-indigo-400 to-purple-500 hover:from-indigo-600 hover:to-purple-700'} active:scale-95`}>
                            <img src={story.user.profile_picture} alt="Profile Picture"
                                 className={`absolute size-8 top-3 left-3 z-10 rounded-full ring shadow ${isDark ? 'ring-gray-100' : 'ring-white'}`}/>
                            <p className={`absolute top-18 left-3 text-sm truncate max-w-24 ${isDark ? 'text-white/60' : 'text-white/80'}`}>{story.content}</p>
                            <p className={`absolute bottom-1 right-2 z-10 text-xs ${isDark ? 'text-white' : 'text-white/90'}`}>{moment(story.createdAt).fromNow()}</p>
                            {
                                story.media_type !== 'text' && (
                                    <div className='absolute inset-0 z-1 rounded-lg bg-black overflow-hidden'>
                                        {
                                            story.media_type === "image" ? (
                                                <img src={story.media_url} alt="Story Image "
                                                     className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"/>
                                            ) : (
                                                <video src={story.media_url}
                                                       className="h-full w-full object-cover hover:scale-110 transition duration-500 opacity-70 hover:opacity-80"></video>
                                            )
                                        }
                                    </div>
                                )
                            }

                        </div>
                    ))
                }
            </div>

            {/*Add story modal*/}
            {showModal && <StoryModal setShowModal={setShowModal} fetchStories={fetchStories}/>}
            {/*View story modal*/}
            {viewStory && <StoryViewer viewStory={viewStory} setViewStory={setViewStory}/>}
        </div>
    )
}
export default StoriesBar
