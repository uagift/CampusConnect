import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCampus } from '../../context/CampusContext';
import './Navbar.css';

/**
 * REACT LEARNING CONCEPT: NavLink & Custom Context Hooks
 * 
 * 1. WHAT IT DOES:
 *    NavLink is a special version of <Link> from react-router-dom that automatically 
 *    adds an "active" class to the link when its route matches the current URL.
 * 
 * 2. WHY WE NEED IT HERE:
 *    Navbar lets students switch between Home, Explore, and My Activities seamlessly.
 *    Consuming `useCampus()` context allows us to show real-time live counters for 
 *    saved & joined events without passing props down!
 * 
 * 3. HOW THE DATA FLOWS:
 *    CampusContext -> useCampus() -> Navbar renders savedCount and joinedCount.
 * 
 * 4. WHAT YOU CAN EDIT/CHANGE LATER:
 *    - Add a mobile burger drawer toggle.
 *    - Add user profile avatar icon if authentication is added later.
 */

const Navbar = () => {
  const { savedCount, joinedCount } = useCampus();
  const totalActivityCount = savedCount + joinedCount;

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Brand Logo & Tagline */}
        <Link to="/" className="navbar-brand">
          <div className="brand-icon">C</div>
          <div className="brand-text-group">
            <span className="brand-title">CampusConnect</span>
            <span className="brand-motif">DISCOVER. CONNECT. BELONG.</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="navbar-links">
            <li>
              <NavLink 
                to="/" 
                className={({ isActive }) => isActive ? 'nav-item-link active' : 'nav-item-link'}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/explore" 
                className={({ isActive }) => isActive ? 'nav-item-link active' : 'nav-item-link'}
              >
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/my-activities" 
                className={({ isActive }) => isActive ? 'nav-item-link active' : 'nav-item-link'}
              >
                My Activities
                {totalActivityCount > 0 && (
                  <span className="nav-counter">{totalActivityCount}</span>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
