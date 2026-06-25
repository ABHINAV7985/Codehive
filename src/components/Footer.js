import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { faTwitter, faInstagram, faFacebook, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner container">
      <div className="footer-brand">
        <Link to="/" className="footer-logo">
          <FontAwesomeIcon icon={faCode} /> CodeHive
        </Link>
        <p>Your ultimate destination to practice coding, prepare for interviews, and master programming skills.</p>
      </div>
      <div className="footer-links">
        <h4>Platform</h4>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/explore">Explore</Link></li>
          <li><Link to="/interview">Interview</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div className="footer-social">
        <h4>Follow Us</h4>
        <div className="social-icons">
          <a href="https://twitter.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; 2024 CodeHive. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
