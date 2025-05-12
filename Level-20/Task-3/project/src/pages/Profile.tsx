import React from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/ui/LoadingSpinner';

// Define the expected profile type
type ProfileData = {
  name: string;
  bio: string;
  avatar?: string;
  posts?: { id: string; content: string; date: string }[]; // Example for posts
};

const Profile = () => {
  const { id } = useParams();
  const { user } = useAuth(); // Use this if you actually want to access the logged-in user

  const [loading, setLoading] = React.useState(true);
  const [profile, setProfile] = React.useState<ProfileData | null>(null);

  React.useEffect(() => {
    // Hardcoded data for Niranjan's profile
    const fetchProfile = async () => {
      try {
        setLoading(true);
        // Simulating an API response
        const data = {
          name: 'Niranjan NN',
          bio: 'A passionate developer with a focus on full-stack development and machine learning.',
          avatar: 'https://www.denverpost.com/wp-content/uploads/2017/01/thor-the-dark-world.jpg?w=1800&resize=1800,1800', // Placeholder avatar
          posts: [
            {
              id: '1',
              content: 'Just finished a new React project! Loving how Vite makes the build process super fast.',
              date: '2025-05-09',
            },
            {
              id: '2',
              content: 'Working on an exciting chatbot project aimed at helping people with mental health issues. Stay tuned!',
              date: '2025-05-07',
            },
            {
              id: '3',
              content: 'Completed an internship on Data Science at Codetech Solutions. Learned a lot!',
              date: '2025-04-15',
            },
          ],
        };
        setProfile(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleFollow = () => {
    // Follow user logic here
    console.log(`Followed user with id: ${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center space-y-4">
          {/* User Avatar */}
          <div
            className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 bg-cover"
            style={{
              backgroundImage: `url(${profile?.avatar || 'https://via.placeholder.com/150'})`,
            }}
          />
          
          {/* Profile Name */}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {profile?.name || 'User Profile'}
          </h1>
          
          {/* Bio */}
          <p className="text-gray-600 dark:text-gray-300">
            {profile?.bio || 'No bio available'}
          </p>

          {/* Follow Button (Only for non-logged-in users or specific conditions) */}
          {user?.id !== id && (
            <button
              onClick={handleFollow}
              className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
            >
              Follow
            </button>
          )}

          {/* User Posts */}
          <div className="mt-8 w-full">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Posts</h2>
            {profile?.posts?.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300">No posts available</p>
            ) : (
              <ul className="space-y-4">
                {profile?.posts?.map(post => (
                  <li key={post.id} className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-800 dark:text-gray-100">{post.content}</p>
                    <p className="text-gray-500 dark:text-gray-300 text-sm">{new Date(post.date).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
