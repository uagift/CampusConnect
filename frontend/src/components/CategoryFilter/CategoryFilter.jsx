import React from 'react';
import './CategoryFilter.css';

/**
 * REACT LEARNING CONCEPT: State Lifting & Event Handling
 * 
 * 1. WHAT IT DOES:
 *    Renders a row of category pill buttons ("All", "Workshops", "Technology", etc.).
 * 
 * 2. WHY WE NEED IT HERE:
 *    Allows students to filter the events grid by category with a single tap.
 * 
 * 3. HOW THE DATA FLOWS:
 *    Parent state (`selectedCategory`) passed down -> CategoryFilter compares category.id === selectedCategory -> calls `onSelectCategory(category.id)`.
 */

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter-bar" role="tablist" aria-label="Event Categories">
      {categories.map((cat) => {
        const isActive = selectedCategory === cat.id;
        return (
          <button
            key={cat.id}
            className={`filter-pill-btn ${isActive ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
            role="tab"
            aria-selected={isActive}
          >
            <span className="pill-icon">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
