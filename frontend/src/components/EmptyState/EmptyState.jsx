import React from 'react';
import './EmptyState.css';

/**
 * REACT LEARNING CONCEPT: Conditional Rendering & Empty States
 * 
 * 1. WHAT IT DOES:
 *    Renders a friendly visual fallback card when a list or search query returns zero items.
 * 
 * 2. WHY WE NEED IT HERE:
 *    Prevents the user from staring at a blank screen when filters don't match any events.
 * 
 * 3. HOW THE DATA FLOWS:
 *    filteredEvents.length === 0 ? <EmptyState ... /> : <EventsGrid />
 */

const EmptyState = ({ 
  icon = "🔍", 
  title = "No matching events found", 
  message = "Try searching for a different keyword or clearing your category filters.", 
  actionLabel = "Reset Filters", 
  onAction 
}) => {
  return (
    <div className="empty-state-card animate-fade-in">
      <div className="empty-state-icon-bg">{icon}</div>
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {onAction && actionLabel && (
        <button className="btn btn-primary" onClick={onAction}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
