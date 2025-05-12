import api from './api';

interface BookData {
  externalId: string;
  title: string;
  authors: string[];
  publishedYear?: number;
  description?: string;
  coverImage?: string;
  category?: 'Read' | 'Currently Reading' | 'Want to Read';
}

interface BookUpdate {
  category?: 'Read' | 'Currently Reading' | 'Want to Read';
  rating?: number;
  notes?: string;
}

export const searchBooks = async (query: string) => {
  const response = await api.get(`/search?query=${encodeURIComponent(query)}`);
  return response.data.books;
};

export const getBookDetails = async (id: string) => {
  const response = await api.get(`/search/details/${id}`);
  return response.data.book;
};

export const getUserBooks = async () => {
  const response = await api.get('/books');
  return response.data;
};

export const getUserBooksByCategory = async (category: string) => {
  const books = await getUserBooks();
  return books.filter((book: any) => book.category === category);
};

export const addBookToCollection = async (bookData: BookData) => {
  const response = await api.post('/books', bookData);
  return response.data.book;
};

export const updateBook = async (id: string, updates: BookUpdate) => {
  const response = await api.patch(`/books/${id}`, updates);
  return response.data.book;
};

export const removeBook = async (id: string) => {
  const response = await api.delete(`/books/${id}`);
  return response.data;
};