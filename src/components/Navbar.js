import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faBars, faTimes, faUser, faSignOutAlt, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { dark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/explore', label: 'Explore' },
    { to: '/interview', label: 'Interview' },
    { to: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <FontAwesomeIcon icon={faCode} />
          <span>CodeHive</span>
        </Link>

        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={location.pathname === link.to ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className={`nav-auth ${menuOpen ? 'open' : ''}`}>
          {/* Dark mode toggle */}
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            <FontAwesomeIcon
              icon={dark ? faSun : faMoon}
              className="theme-toggle-icon"
            />
            <div className={`theme-toggle-track ${dark ? 'active' : ''}`}>
              <div className="theme-toggle-knob" />
            </div>
          </button>

          {user ? (
            <div className="nav-user">
              <FontAwesomeIcon icon={faUser} className="user-icon" />
              <span className="user-name">{user.username}</span>
              <button className="btn btn-outline btn-sm" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
