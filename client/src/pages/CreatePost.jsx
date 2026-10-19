import React, {useState, useRef} from 'react';
import {dummyUserData} from "../assets/assets.js";
import {Image as ImageIcon, X, Sparkles, Send, Paperclip} from "lucide-react";
import {toast} from "react-hot-toast";

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);

    const user = dummyUserData;

    // Auto-adjust textarea height dynamically
    const handleTextareaChange = (e) => {
        setContent(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    };

    // Correctly convert FileList to Array
    const handleImageSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 0) {
            setImages((prev) => [...prev, ...selectedFiles]);
        }
    };

    // Remove selected image
    const removeImage = (index) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    // Submit handler logic
    const handleSubmit = async () => {
        if (!content.trim() && images.length === 0) {
            throw new Error("Post cannot be empty");
        }

        setLoading(true);
        try {
            // Replace with your actual API endpoint or dispatch action
            await new Promise((resolve) => setTimeout(resolve, 1500));

            // Reset Form on Success
            setContent('');
            setImages([]);
            if (textareaRef.current) textareaRef.current.style.height = 'auto';
        } finally {
            setLoading(false);
        }
    };

    // Trigger toast promise safely
    const handlePublish = () => {
        if (!content.trim() && images.length === 0) {
            toast.error("Please add text or an image to publish!");
            return;
        }

        toast.promise(handleSubmit(), {
            loading: 'Publishing your post...',
            success: 'Post published successfully!',
            error: (err) => err?.message || 'Failed to publish post.',
        });
    };

    return (
        <div
            className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-zinc-100 p-4 sm:p-8 transition-colors">
            <div className="max-w-2xl mx-auto space-y-6">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Create Post</h1>
                        <p className="text-sm text-slate-500 dark:text-zinc-400">
                            Share what's on your mind with your community
                        </p>
                    </div>
                    <div
                        className="p-2.5 bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
                        <Sparkles className="w-5 h-5"/>
                    </div>
                </div>

                {/* Post Creator Box */}
                <div
                    className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-sm backdrop-blur-md">

                    {/* User Info Header */}
                    <div className="flex items-center gap-3 mb-4">
                        <img
                            src={user.profile_picture}
                            alt={user.full_name}
                            className="w-11 h-11 rounded-full object-cover ring-2 ring-indigo-500/20"
                        />
                        <div>
                            <h2 className="font-semibold text-sm leading-tight text-slate-900 dark:text-zinc-100">
                                {user.full_name}
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-zinc-400">
                                @{user.username}
                            </p>
                        </div>
                    </div>

                    {/* Auto-Expanding Textarea */}
                    <textarea
                        ref={textareaRef}
                        rows={3}
                        className="w-full bg-transparent text-slate-900 dark:text-zinc-100 text-base placeholder-slate-400 dark:placeholder-zinc-500 outline-none resize-none min-h-[90px]"
                        placeholder="What's happening?"
                        value={content}
                        onChange={handleTextareaChange}
                    />

                    {/* Images Preview Grid */}
                    {images.length > 0 && (
                        <div className={`grid gap-2.5 my-4 ${
                            images.length === 1 ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-3'
                        }`}>
                            {images.map((image, i) => (
                                <div
                                    key={i}
                                    className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-zinc-800 border border-slate-200/60 dark:border-zinc-700/60"
                                >
                                    <img
                                        src={URL.createObjectURL(image)}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        alt="Upload preview"
                                    />
                                    {/* Delete Button Overlay */}
                                    <button
                                        type="button"
                                        onClick={() => removeImage(i)}
                                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all cursor-pointer"
                                        title="Remove image"
                                    >
                                        <X className="w-4 h-4"/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Bottom Toolbar & Action Bar */}
                    <div
                        className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-zinc-800/80 mt-2">

                        {/* Attachments Trigger */}
                        <div className="flex items-center gap-1">
                            <label
                                htmlFor="images"
                                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-xl cursor-pointer transition"
                            >
                                <ImageIcon className="w-5 h-5 text-indigo-500"/>
                                <span className="hidden sm:inline">Photo</span>
                            </label>

                            <input
                                ref={fileInputRef}
                                type="file"
                                id="images"
                                accept="image/*"
                                hidden
                                multiple
                                onChange={handleImageSelect}
                            />
                        </div>

                        {/* Publish Button */}
                        <button
                            type="button"
                            disabled={loading || (!content.trim() && images.length === 0)}
                            onClick={handlePublish}
                            className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/20 transition cursor-pointer"
                        >
                            <span>{loading ? 'Publishing...' : 'Publish Post'}</span>
                            <Send className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;