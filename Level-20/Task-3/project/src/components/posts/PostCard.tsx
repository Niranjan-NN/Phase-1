import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Heart, MessageCircle, Share2, MoreVertical, Trash } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import CommentForm from './CommentForm';
import Button from '../ui/Button';

interface Comment {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  text: string;
  date: string;
}

interface Post {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  text: string;
  image?: string;
  likes: string[];
  comments: Comment[];
  date: string;
}

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onUnlike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => Promise<boolean>;
  onDeleteComment: (postId: string, commentId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  onLike, 
  onUnlike, 
  onAddComment,
  onDeleteComment
}) => {
  const { authState } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  
  const isLiked = post.likes.includes(authState.user?._id || '');
  
  const toggleLike = () => {
    if (isLiked) {
      onUnlike(post._id);
    } else {
      onLike(post._id);
    }
  };
  
  const toggleComments = () => {
    setShowComments(!showComments);
  };
  
  const handleAddComment = async (text: string) => {
    const success = await onAddComment(post._id, text);
    if (success) {
      setShowComments(true);
    }
    return success;
  };
  
  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'some time ago';
    }
  };

  return (
    <div className="card overflow-hidden animate-fade-in">
      {/* Post Header */}
      <div className="p-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
        <Link to={`/profile/${post.user._id}`} className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
            {post.user.avatar ? (
              <img src={post.user.avatar} alt={post.user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-lg font-medium">{post.user.name.charAt(0)}</span>
            )}
          </div>
          <div>
            <h3 className="font-medium">{post.user.name}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(post.date)}</p>
          </div>
        </Link>
        
        <div className="relative">
          <button 
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setShowOptionsMenu(!showOptionsMenu)}
          >
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </button>
          
          {showOptionsMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1">
                <Link
                  to={`/post/${post._id}`}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowOptionsMenu(false)}
                >
                  View post details
                </Link>
                {authState.user?._id === post.user._id && (
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => {
                      setShowOptionsMenu(false);
                      // Show delete confirmation or directly call delete API
                    }}
                  >
                    Delete post
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Post Content */}
      <div className="p-4">
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-line">{post.text}</p>
        
        {post.image && (
          <div className="mt-3 rounded-lg overflow-hidden">
            <img src={post.image} alt="Post content" className="w-full h-auto" />
          </div>
        )}
      </div>
      
      {/* Post Actions */}
      <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 flex items-center space-x-6">
        <button 
          className={`flex items-center space-x-1 ${isLiked ? 'text-red-500' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
          onClick={toggleLike}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
          <span>{post.likes.length}</span>
        </button>
        
        <button 
          className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          onClick={toggleComments}
        >
          <MessageCircle className="h-5 w-5" />
          <span>{post.comments.length}</span>
        </button>
        
        <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <Share2 className="h-5 w-5" />
        </button>
      </div>
      
      {/* Comments Section */}
      {showComments && (
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 border-t border-gray-100 dark:border-gray-800">
          <CommentForm onSubmit={handleAddComment} />
          
          {post.comments.length > 0 ? (
            <div className="mt-4 space-y-4">
              {post.comments.map(comment => (
                <div key={comment._id} className="flex space-x-3">
                  <Link to={`/profile/${comment.user._id}`} className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                      {comment.user.avatar ? (
                        <img src={comment.user.avatar} alt={comment.user.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs font-medium">{comment.user.name.charAt(0)}</span>
                      )}
                    </div>
                  </Link>
                  
                  <div className="flex-1">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-3 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link to={`/profile/${comment.user._id}`} className="font-medium">
                            {comment.user.name}
                          </Link>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {formatDate(comment.date)}
                          </p>
                        </div>
                        
                        {authState.user?._id === comment.user._id && (
                          <button 
                            className="text-gray-400 hover:text-red-500"
                            onClick={() => onDeleteComment(post._id, comment._id)}
                          >
                            <Trash className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <p className="mt-1 text-gray-800 dark:text-gray-200">{comment.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-4 text-center text-gray-500 dark:text-gray-400 text-sm">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;