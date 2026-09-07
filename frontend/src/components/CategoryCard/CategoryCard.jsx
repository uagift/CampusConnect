import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css';

/**
 * REACT LEARNING CONCEPT: URL Query Parameters & Navigation
 * 
 * 1. WHAT IT DOES:
 *    Renders a category card that links to `/explore?category=CategoryName`.
 * 
 * 2. WHY WE NEED IT HERE:
 *    Allows students to click "Workshops" or "Technology" on the Home page and jump 
 *    directly to the filtered Explore results!
 */

const CategoryCard = ({ category }) => {
  return (
    <Link to={`/explore?category=${category.id}`} className="category-card">
      <div className="category-icon-box">{category.icon}</div>
      <h3 className="category-title">{category.label}</h3>
      <span className="category-action-text">Explore Category →</span>
    </Link>
  );
};

export default CategoryCard;
