import React, {useState, useEffect} from 'react';
import {dummyUserData} from "../assets/assets.js";
import {
    Pencil,
    X,
    Camera,
    User,
    AtSign,
    MapPin,
    AlignLeft,
    Check
} from "lucide-react";

const ProfileModal = ({setShowEdit}) => {
    const user = dummyUserData;

    const [editForm, setEditForm] = useState({
        username: user?.username || '',
        bio: user?.bio || '',
        location: user?.location || '',
        profile_picture: null,
        full_name: user?.full_name || '',
        cover_photo: null,
    });

    const [previews, setPreviews] = useState({
        profile_picture: user?.profile_picture || null,
        cover_photo: user?.cover_photo || null,
    });

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') setShowEdit(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [setShowEdit]);

    const handleImageChange = (e, field) => {
        const file = e.target.files[0];
        if (file) {
            setEditForm((prev) => ({...prev, [field]: file}));
            setPreviews((prev) => ({...prev, [field]: URL.createObjectURL(file)}));
        }
    };

    const handleSaveProfile = async (e) => {
        e.preventDefault();
        // Add your submit logic / API call here
        console.log("Saving profile:", editForm);
        setShowEdit(false);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">

            {/* Backdrop click to close */}
            <div
                className="fixed inset-0"
                onClick={() => setShowEdit(false)}
                aria-hidden="true"
            />

            {/* Modal Box */}
            <div
                className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl shadow-2xl overflow-hidden z-10 transition-all my-8">

                {/* Header */}
                <div
                    className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-zinc-800/80">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-zinc-100">
                            Edit Profile
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">
                            Update your personal details and photos
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowEdit(false)}
                        className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-zinc-200 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition cursor-pointer"
                    >
                        <X className="w-5 h-5"/>
                    </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSaveProfile} className="p-6 space-y-6">

                    {/* Visual Media Section (Cover & Avatar) */}
                    <div className="relative mb-8">
                        {/* Cover Photo Upload */}
                        <div
                            className="relative h-40 sm:h-48 w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/50 group">
                            {previews.cover_photo ? (
                                <img
                                    src={previews.cover_photo}
                                    alt="Cover preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div
                                    className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"/>
                            )}

                            <label
                                htmlFor="cover_photo"
                                className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 text-white font-medium text-sm transition-opacity cursor-pointer backdrop-blur-xs"
                            >
                                <Camera className="w-5 h-5"/>
                                <span>Change Cover</span>
                                <input
                                    type="file"
                                    id="cover_photo"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageChange(e, 'cover_photo')}
                                />
                            </label>
                        </div>

                        {/* Profile Picture Upload */}
                        <div className="absolute -bottom-6 left-6 group">
                            <div
                                className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-zinc-900 shadow-md overflow-hidden bg-slate-200 dark:bg-zinc-800">
                                <img
                                    src={previews.profile_picture || '/default-avatar.png'}
                                    alt="Profile preview"
                                    className="w-full h-full object-cover"
                                />
                                <label
                                    htmlFor="profile_picture"
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-medium transition-opacity cursor-pointer backdrop-blur-xs"
                                >
                                    <Camera className="w-5 h-5 mb-0.5"/>
                                    <span>Change</span>
                                    <input
                                        type="file"
                                        id="profile_picture"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => handleImageChange(e, 'profile_picture')}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Input Fields Grid */}
                    <div className="pt-2 space-y-4">

                        {/* Full Name Input */}
                        <div>
                            <label
                                className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
                                Display Name
                            </label>
                            <div className="relative">
                                <User
                                    className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"/>
                                <input
                                    type="text"
                                    placeholder="Enter full name"
                                    value={editForm.full_name}
                                    onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Username Input */}
                        <div>
                            <label
                                className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
                                Username
                            </label>
                            <div className="relative">
                                <AtSign
                                    className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"/>
                                <input
                                    type="text"
                                    placeholder="Choose username"
                                    value={editForm.username}
                                    onChange={(e) => setEditForm({...editForm, username: e.target.value})}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Bio Textarea */}
                        <div>
                            <label
                                className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
                                Bio
                            </label>
                            <div className="relative">
                                <AlignLeft
                                    className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400 dark:text-zinc-500"/>
                                <textarea
                                    rows={3}
                                    placeholder="Tell the world about yourself..."
                                    value={editForm.bio}
                                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent transition-all resize-none"
                                />
                            </div>
                        </div>

                        {/* Location Input */}
                        <div>
                            <label
                                className="block text-xs font-semibold text-slate-600 dark:text-zinc-400 uppercase tracking-wider mb-2">
                                Location
                            </label>
                            <div className="relative">
                                <MapPin
                                    className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500"/>
                                <input
                                    type="text"
                                    placeholder="e.g. Lagos, Nigeria"
                                    value={editForm.location}
                                    onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-zinc-800/60 border border-slate-200 dark:border-zinc-700/80 rounded-xl text-slate-900 dark:text-zinc-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/80 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div
                        className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-zinc-800/80">
                        <button
                            type="button"
                            onClick={() => setShowEdit(false)}
                            className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl transition cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl shadow-lg shadow-indigo-500/20 transition cursor-pointer"
                        >
                            <Check className="w-4 h-4"/>
                            <span>Save Changes</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;