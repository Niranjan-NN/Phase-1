import { motion } from 'framer-motion';
import FavoritesList from '../components/favorites/FavoritesList';
import { FaHeart } from 'react-icons/fa';
import './Favorites.css';

const Favorites = () => {
  return (
    <div className="favorites-container">
      <motion.div 
        className="favorites-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="favorites-title">
          <FaHeart /> Favorite Locations
        </h1>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <FavoritesList />
      </motion.div>
    </div>
  );
};

export default Favorites;