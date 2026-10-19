import React, {useEffect, useRef, useState} from 'react';
import {ArrowLeft, Image, SendHorizontal, X} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {dummyMessagesData, dummyUserData} from "../assets/assets.js";

const ChatBox = () => {
    const navigate = useNavigate();

    const [messages, setMessages] = useState(dummyMessagesData);
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [user, setUser] = useState(dummyUserData);
    const messagesEndRef = useRef(null);

    const sendMessage = () => {
        if (!text.trim() && !image) return;

        const newMessage = {
            _id: String(Date.now()),
            to_user_id: user._id,
            text: text,
            message_type: image ? 'image' : 'text',
            media_url: image ? URL.createObjectURL(image) : null,
            createdAt: new Date().toISOString()
        };

        setMessages(prev => [...prev, newMessage]);
        setText('');
        setImage(null);
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    return user && (
        <div className="flex flex-col h-screen bg-slate-50 dark:bg-zinc-950 transition-colors duration-200">
            {/* Header - Aligned precisely with the maximum container width of the message content */}
            <header
                className="w-full border-b bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-slate-200 dark:border-zinc-800 sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-3 md:px-8 flex items-center gap-3">
                    <button
                        onClick={() => navigate('/messages')}
                        className="p-2 -ml-2 text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full transition-all cursor-pointer"
                        aria-label="Go back"
                    >
                        <ArrowLeft className="w-5 h-5"/>
                    </button>

                    <div className="relative">
                        <img src={user.profile_picture}
                             className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100 dark:ring-zinc-800"
                             alt={user.full_name}/>
                        <span
                            className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-zinc-900 rounded-full"></span>
                    </div>

                    <div>
                        <h2 className="font-semibold text-slate-900 dark:text-zinc-50 leading-tight">{user.full_name}</h2>
                        <p className="text-xs text-slate-500 dark:text-zinc-400">@{user.username}</p>
                    </div>
                </div>
            </header>

            {/* Message Area - Replaced native scrollbars with your no-scrollbar helper style */}
            <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 no-scrollbar">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages
                        .toSorted((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                        .map((message) => {
                            const isMe = message.to_user_id !== user._id;
                            return (
                                <div key={message._id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`flex flex-col max-w-[75%] md:max-w-[60%] group`}>
                                        <div className={`relative px-4 py-2.5 shadow-sm transition-all duration-200
                                            ${isMe
                                            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl rounded-tr-none'
                                            : 'bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800/60 text-slate-800 dark:text-zinc-200 rounded-2xl rounded-tl-none'
                                        }`}
                                        >
                                            {message.message_type === 'image' && (
                                                <div className="mb-2 overflow-hidden rounded-lg">
                                                    <img src={message.media_url}
                                                         className="w-full max-h-72 object-cover hover:scale-[1.02] transition-transform duration-200"
                                                         alt="Sent media"/>
                                                </div>
                                            )}
                                            {message.text &&
                                                <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{message.text}</p>}
                                        </div>

                                        <span
                                            className={`text-[10px] mt-1 text-slate-400 dark:text-zinc-500 block px-1 ${isMe ? 'text-right' : 'text-left'}`}>
                                            {new Date(message.createdAt).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    }
                    <div ref={messagesEndRef}/>
                </div>
            </main>

            {/* Input Footer */}
            <footer
                className="p-4 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent dark:from-zinc-950 dark:via-zinc-950 border-t border-slate-200/60 dark:border-zinc-800/50">
                <div className="max-w-3xl mx-auto relative">

                    {/* Image Attachment Preview */}
                    {image && (
                        <div
                            className="absolute bottom-full left-4 mb-3 p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
                            <img src={URL.createObjectURL(image)} alt="Preview"
                                 className="h-14 w-14 object-cover rounded-lg"/>
                            <button
                                onClick={() => setImage(null)}
                                className="p-1 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full text-slate-500 dark:text-zinc-400 transition-colors cursor-pointer"
                                aria-label="Remove image"
                            >
                                <X size={16}/>
                            </button>
                        </div>
                    )}

                    {/* Input Wrapper */}
                    <div
                        className="flex items-center gap-2 p-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-2xl shadow-md focus-within:ring-2 focus-within:ring-indigo-500/20 dark:focus-within:ring-purple-500/30 focus-within:border-indigo-500 dark:focus-within:border-purple-500 transition-all duration-200">

                        {/* File Upload Button */}
                        <label htmlFor="image-upload"
                               className="p-2.5 text-slate-400 dark:text-zinc-500 hover:text-indigo-500 dark:hover:text-purple-400 hover:bg-slate-50 dark:hover:bg-zinc-800/50 rounded-xl cursor-pointer transition-all">
                            <Image className="w-5 h-5"/>
                            <input
                                type="file"
                                id="image-upload"
                                accept="image/*"
                                hidden
                                onChange={(e) => setImage(e.target.files?.[0] || null)}
                            />
                        </label>

                        {/* Text Field */}
                        <input
                            type="text"
                            className="flex-1 bg-transparent py-2 px-1 outline-none text-[15px] text-slate-800 dark:text-zinc-100 placeholder-slate-400 dark:placeholder-zinc-500"
                            placeholder="Type a message..."
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                        />

                        {/* Send Action */}
                        <button
                            onClick={sendMessage}
                            disabled={!text.trim() && !image}
                            className="bg-indigo-600 dark:bg-purple-600 hover:bg-indigo-700 dark:hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 text-white p-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                            <SendHorizontal className="w-4 h-4"/>
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default ChatBox;
