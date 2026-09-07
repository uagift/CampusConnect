import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import EventCard from '../../components/EventCard/EventCard';
import EmptyState from '../../components/EmptyState/EmptyState';

import { CATEGORIES, EVENTS_DATA } from '../../data/events';
import './Explore.css';

/**
 * REACT LEARNING CONCEPT: State, Dynamic Filtering & URL Search Params
 * 
 * 1. WHAT IT DOES:
 *    - `useState` tracks the active `searchTerm` and `selectedCategory`.
 *    - `useSearchParams` syncs category filtering with URL parameters (e.g. `/explore?category=Workshops`).
 *    - Real-time `.filter()` updates the UI as soon as state changes without re-fetching data!
 * 
 * 2. WHY WE NEED IT HERE:
 *    This satisfies the core discovery journey:
 *    User input (Search / Category click) -> state update -> filtering -> updated UI.
 * 
 * 3. HOW THE DATA FLOWS:
 *    EVENTS_DATA -> filter(category && search) -> filteredEvents -> map to <EventCard /> OR render <EmptyState />.
 * 
 * 4. WHAT YOU CAN EDIT/CHANGE LATER:
 *    - Add sort options (e.g., sort by date, spots left, or alphabetical).
 */

const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  // Sync category state when URL search parameter changes
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Handle category pill clicks & update URL params
  const handleCategorySelect = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: catId });
    }
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSearchParams({});
  };

  // Real-time filtering logic
  const filteredEvents = EVENTS_DATA.filter((event) => {
    // Category match check
    const matchesCategory = 
      selectedCategory === 'All' || 
      event.category.toLowerCase() === selectedCategory.toLowerCase();

    // Search term match check (title, short description, organizer, or tags)
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch = 
      !term ||
      event.title.toLowerCase().includes(term) ||
      event.shortDescription.toLowerCase().includes(term) ||
      event.organizer.toLowerCase().includes(term) ||
      event.tags.some(tag => tag.toLowerCase().includes(term));

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="explore-page container animate-fade-in">
      {/* Search Header Banner */}
      <div className="explore-header-box">
        <h1 className="explore-header-title">Discover Campus Opportunities</h1>
        <p className="explore-header-subtitle">
          Find student workshops, tech talks, hackathons, and community projects built for you.
        </p>

        {/* Controlled Search Bar */}
        <SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search by keyword, skill, topic, or organizer..."
        />
      </div>

      {/* Category Filter Pills */}
      <CategoryFilter 
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
      />

      {/* Results Metadata Bar */}
      <div className="results-meta-bar">
        <span className="results-count-text">
          Showing <strong>{filteredEvents.length}</strong> {filteredEvents.length === 1 ? 'opportunity' : 'opportunities'}
        </span>

        {(selectedCategory !== 'All' || searchTerm) && (
          <button className="btn btn-outline" style={{ padding: '0.35rem 0.85rem', fontSize: '0.82rem' }} onClick={handleResetFilters}>
            Clear Filters ✕
          </button>
        )}
      </div>

      {/* Conditional Rendering: Events Grid vs Empty State */}
      {filteredEvents.length > 0 ? (
        <div className="events-grid">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <EmptyState 
          icon="🔎"
          title="No events match your criteria"
          message={`We couldn't find any opportunities matching "${searchTerm || selectedCategory}". Try searching for another topic or resetting filters.`}
          actionLabel="Reset All Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
};

export default Explore;
