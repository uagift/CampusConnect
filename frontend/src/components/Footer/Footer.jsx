import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

/**
 * REACT LEARNING CONCEPT: Presentational Footer Component
 * 
 * 1. WHAT IT DOES:
 *    Renders the consistent bottom section of the site across all routes.
 * 
 * 2. WHY WE NEED IT HERE:
 *    Provides quick links, campus contact resources, and reinforces the 
 *    CampusConnect motif ("DISCOVER. CONNECT. BELONG.").
 */

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <h3 className="footer-brand-title">CampusConnect</h3>
            <p className="footer-tagline">
              Your central hub for campus events, student clubs, skill workshops, hackathons, and student leadership opportunities.
            </p>
            <span className="footer-motif-pill">DISCOVER • CONNECT • BELONG</span>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="footer-heading">Navigation</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/explore">Explore Events</Link></li>
              <li><Link to="/my-activities">My Activities</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><Link to="/explore?category=Workshops">Workshops</Link></li>
              <li><Link to="/explore?category=Technology">Technology</Link></li>
              <li><Link to="/explore?category=Clubs">Student Clubs</Link></li>
              <li><Link to="/explore?category=Competitions">Competitions</Link></li>
            </ul>
          </div>

          {/* Campus Info */}
          <div>
            <h4 className="footer-heading">Codveda Level 2</h4>
            <p className="footer-tagline" style={{ fontSize: '0.85rem' }}>
              Built as a learning-focused Single Page React Application (Task 1). Designed for clear component structure and state management.
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} CampusConnect — Student Community Hub.</p>
          <p>Designed with React 19 & Vite</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
