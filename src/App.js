import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import ScrollToTop from "./components/scrollToTop";
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Explore from './pages/Explore';
import Interview from './pages/Interview';
import Contact from './pages/Contact';
import Learn from './pages/Learn';
import Problems from './pages/Problems';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
           <ScrollToTop />
          <Routes>
            {/* Problems page has its own full nav */}
            <Route path="/problems/:topicId" element={<Problems />} />
            <Route path="/problems" element={<Problems />} />

            {/* All other pages use shared Navbar + Footer */}
            <Route path="/*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/explore" element={<Explore />} />
                  <Route path="/interview" element={<Interview />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/learn/:lang" element={<Learn />} />
                </Routes>
                <Footer />
              </>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}


export default App;
