import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

/**
 * REACT LEARNING CONCEPT: Hero Banner & Navigation Triggers
 * 
 * 1. WHAT IT DOES:
 *    Serves as the main welcome banner on the Home page (`/`).
 *    Introduces the CampusConnect motif and drives student engagement to Explore.
 * 
 * 2. WHY WE NEED IT HERE:
 *    Creates an energetic, relaxing, and welcoming first impression.
 */

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-background-shapes">
        <div className="shape-circle-1"></div>
        <div className="shape-circle-2"></div>
      </div>

      <div className="container hero-grid">
        {/* Left Content */}
        <div className="hero-content">
          <span className="hero-badge">DISCOVER • CONNECT • BELONG</span>
          <h1 className="hero-title">
            Your Campus Life, <br />
            <span className="hero-title-highlight">All In One Place.</span>
          </h1>
          <p className="hero-description">
            Explore upcoming workshops, technology keynotes, student clubs, hackathons, and leadership opportunities. Build skills, make friends, and belong.
          </p>

          <div className="hero-actions">
            <Link to="/explore" className="btn btn-primary">
              Explore Events ➔
            </Link>
            <Link to="/my-activities" className="btn btn-outline" style={{ color: 'var(--color-offwhite)', borderColor: 'var(--color-offwhite)' }}>
              My Activities
            </Link>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">40+</span>
              <span className="stat-label">Active Clubs</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">15+</span>
              <span className="stat-label">Weekly Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free Student Access</span>
            </div>
          </div>
        </div>

        {/* Right Visual Frame */}
        <div className="hero-visual-card">
          <div className="hero-visual-img-frame">
            <img 
              src="/images/club_fair.jpg" 
              alt="Campus Life & Student Clubs" 
              className="hero-visual-img" 
            />
          </div>
          <div className="hero-floating-pill">
            <span style={{ color: 'var(--color-olive)', fontSize: '1.2rem' }}>✦</span>
            <span>Join 1,200+ Students Exploring Campus</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
