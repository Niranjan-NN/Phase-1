import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Recipe from "./pages/Recipe";
import Contact from "./pages/Contact";
import ThankYou from "./pages/ThankYou";
import SearchBar from "./components/SearchBar";

const App = () => {
  return (
    <>
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<Category />} />
        <Route path="/recipe/:id" element={<Recipe />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/thankyou" element={<ThankYou />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
