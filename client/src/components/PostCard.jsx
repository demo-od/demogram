import moment from 'moment';
import {BadgeCheck, Heart, MessageCircle, Share2} from "lucide-react";
import {useState} from "react";
import {dummyUserData} from "../assets/assets.js";
import {useNavigate} from "react-router-dom";

const PostCard = ({post}) => {
    const postWithHashtags = post.content.replace(
        /(#\w+)/g,
        '<span class="text-indigo-600 dark:text-indigo-400 font-medium">$1</span>'
    );

    const [likes, setLikes] = useState(post.likes_count);
    const currentUser = dummyUserData;

    const handleLike = () => {
        // Reserved for your like logic
    };

    const navigate = useNavigate();

    return (
        <div
            className="bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800/80 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 space-y-4 w-full max-w-2xl mx-auto">

            {/* User Info */}
            <div
                onClick={() => navigate('/profile/' + post.user._id)}
                className="inline-flex items-center gap-3 cursor-pointer group"
            >
                <img
                    src={post.user.profile_picture}
                    alt="Profile picture"
                    className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:ring-2 group-hover:ring-indigo-500/30 transition-all"
                />
                <div className="flex flex-col">
                    <div className="flex items-center space-x-1">
                        <span
                            className="font-semibold text-sm text-slate-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {post.user.full_name}
                        </span>
                        <BadgeCheck className="w-4 h-4 text-blue-500"/>
                    </div>
                    <div className="text-slate-500 dark:text-zinc-400 text-xs">
                        @{post.user.username} · {moment(post.createdAt).fromNow()}
                    </div>
                </div>
            </div>

            {/* Content */}
            {post.content && (
                <div
                    className="text-slate-800 dark:text-zinc-200 text-sm leading-relaxed whitespace-pre-line"
                    dangerouslySetInnerHTML={{__html: postWithHashtags}}
                />
            )}

            {/* Images */}
            {post.image_urls && post.image_urls.length > 0 && (
                <div
                    className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden border border-slate-100 dark:border-zinc-800">
                    {post.image_urls.map((img, index) => (
                        <img
                            src={img}
                            key={index}
                            className={`w-full h-48 object-cover hover:scale-[1.02] transition-transform duration-300 ${
                                post.image_urls.length === 1 ? 'col-span-2 h-auto max-h-96' : ''
                            }`}
                            alt=""
                        />
                    ))}
                </div>
            )}

            {/* Actions */}
            <div
                className="flex items-center gap-6 text-slate-500 dark:text-zinc-400 text-xs pt-3 border-t border-slate-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-1.5">
                    <Heart
                        className={`w-4 h-4 cursor-pointer transition-colors hover:text-rose-500 ${
                            likes.includes(currentUser._id) ? 'text-rose-500 fill-rose-500' : ''
                        }`}
                        onClick={handleLike}
                    />
                    <span className="font-medium">{likes.length}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4 hover:text-indigo-500 transition-colors"/>
                    <span className="font-medium">{12}</span>
                </div>

                <div className="flex items-center gap-1.5">
                    <Share2 className="w-4 h-4 hover:text-emerald-500 transition-colors"/>
                    <span className="font-medium">{7}</span>
                </div>
            </div>

        </div>
    );
};

export default PostCard;