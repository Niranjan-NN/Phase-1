import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import BookDetailsPage from './pages/BookDetailsPage';
import MyBooksPage from './pages/MyBooksPage';
import NotesPage from './pages/NotesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/search" element={
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        } />
        
        <Route path="/book/:id" element={
          <ProtectedRoute>
            <BookDetailsPage />
          </ProtectedRoute>
        } />
        
        <Route path="/my-books" element={
          <ProtectedRoute>
            <MyBooksPage />
          </ProtectedRoute>
        } />
        
        <Route path="/notes" element={
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;