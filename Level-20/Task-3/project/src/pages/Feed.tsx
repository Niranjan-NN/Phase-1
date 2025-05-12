import React, { useState, useEffect } from 'react';
import axios from '../utils/axiosConfig';
import { toast } from 'react-toastify';
import PostCard from '../components/posts/PostCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

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
  comments: {
    _id: string;
    user: {
      _id: string;
      name: string;
      avatar?: string;
    };
    text: string;
    date: string;
  }[];
  date: string;
}

// Sample posts to display when no real posts are available
const samplePosts: Post[] = [
  {
    _id: 'sample1',
    user: {
      _id: 'user1',
      name: 'John Doe',
      avatar: '',
    },
    text: 'Welcome to 360Connect! 🚀 This is a sample post.',
    image: '',
    likes: [],
    comments: [
      {
        _id: 'comment1',
        user: {
          _id: 'user2',
          name: 'Jane Smith',
          avatar: '',
        },
        text: 'This looks great!',
        date: new Date().toISOString(),
      },
    ],
    date: new Date().toISOString(),
  },
  {
    _id: 'sample2',
    user: {
      _id: 'user3',
      name: 'Alex Johnson',
      avatar: '',
    },
    text: 'Excited to share my latest project using React and Node.js 🔥',
    image: '',
    likes: [],
    comments: [],
    date: new Date().toISOString(),
  },
];

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPosts = async (pageNum = 1, append = false) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);
      
      const res = await axios.get(`/api/posts?page=${pageNum}&limit=10`);
      
      if (append) {
        setPosts(prev => [...prev, ...res.data.posts]);
      } else {
        setPosts(res.data.posts);
      }
      
      setHasMore(res.data.posts.length === 10);
    } catch (err) {
      toast.error('Failed to load posts');
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const loadMore = () => {
    if (loadingMore || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(nextPage, true);
  };

  const handleLike = async (postId: string) => {
    try {
      const res = await axios.put(`/api/posts/like/${postId}`);
      
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post._id === postId ? { ...post, likes: res.data.likes } : post
        )
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to like post');
    }
  };

  const handleUnlike = async (postId: string) => {
    try {
      const res = await axios.put(`/api/posts/unlike/${postId}`);
      
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post._id === postId ? { ...post, likes: res.data.likes } : post
        )
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to unlike post');
    }
  };

  const handleAddComment = async (postId: string, text: string) => {
    try {
      const res = await axios.post(`/api/posts/comment/${postId}`, { text });
      
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post._id === postId ? { ...post, comments: res.data } : post
        )
      );
      
      return true;
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to add comment');
      return false;
    }
  };

  const handleDeleteComment = async (postId: string, commentId: string) => {
    try {
      const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
      
      setPosts(prevPosts => 
        prevPosts.map(post => 
          post._id === postId ? { ...post, comments: res.data } : post
        )
      );
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Developer Feed</h1>
      
      <div className="space-y-6">
        {(posts.length === 0 ? samplePosts : posts).map(post => (
          <PostCard
            key={post._id}
            post={post}
            onLike={handleLike}
            onUnlike={handleUnlike}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
          />
        ))}
        
        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="btn-outline py-2 px-4 rounded-md"
            >
              {loadingMore ? <LoadingSpinner size="small" /> : 'Load More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
