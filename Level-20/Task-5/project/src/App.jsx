import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Home from './pages/Home';
import RecipeList from './pages/RecipeList';
import RecipeDetail from './pages/RecipeDetail';
import RecipeForm from './pages/RecipeForm';
import MealPlanner from './pages/MealPlanner';
import ShoppingList from './pages/ShoppingList';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { RecipeProvider } from './contexts/RecipeContext';
import { MealPlanProvider } from './contexts/MealPlanContext';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app loading
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading RecipeBox...</p>
      </div>
    );
  }

  return (
    <Router>
      <AuthProvider>
        <RecipeProvider>
          <MealPlanProvider>
            <div className="app-container">
              <Navbar />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/recipes" element={<RecipeList />} />
                  <Route path="/recipes/:id" element={<RecipeDetail />} />
                  <Route 
                    path="/recipes/new" 
                    element={
                      <ProtectedRoute>
                        <RecipeForm />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/recipes/edit/:id" 
                    element={
                      <ProtectedRoute>
                        <RecipeForm />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/meal-planner" 
                    element={
                      <ProtectedRoute>
                        <MealPlanner />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/shopping-list" 
                    element={
                      <ProtectedRoute>
                        <ShoppingList />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <ToastContainer position="bottom-right" />
          </MealPlanProvider>
        </RecipeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;