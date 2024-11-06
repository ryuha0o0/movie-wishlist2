// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './layout/Header';
import Main from './components/Home/Main';
import Popular from './components/Home/Popular';
import Search from './components/Search/Search';
import Wishlist from './components/Home/Wishlist';
import SignIn from './components/SignIn/SignIn';
import './App.css';

function App() {
  return (
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/popular" element={<Popular />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
  );
}

export default App;
