import React from 'react';
import { Link } from 'react-router-dom';
import { useCampus } from '../../context/CampusContext';
import './EventCard.css';

/**
 * REACT LEARNING CONCEPT: Component Props & Dynamic Event Handlers
 * 
 * 1. WHAT IT DOES:
 *    EventCard receives a single `event` object via props and renders its details.
 *    It connects to `CampusContext` to allow students to toggle the "Save for Later" 
 *    bookmark state directly from any card!
 * 
 * 2. WHY WE NEED IT HERE:
 *    Renders consistent cards in Home page, Explore search results, and My Activities.
 * 
 * 3. HOW THE DATA FLOWS:
 *    Array of events (.map) -> <EventCard event={item} /> -> reads isSaved(event.id) -> button onClick triggers toggleSaveEvent(event.id).
 * 
 * 4. WHAT YOU CAN EDIT/CHANGE LATER:
 *    - Add a share button.
 *    - Customize tag pill colors based on category.
 */

const EventCard = ({ event }) => {
  const { isSaved, toggleSaveEvent } = useCampus();
  const saved = isSaved(event.id);

  const handleSaveClick = (e) => {
    // Prevent clicking the bookmark button from navigating to the details page
    e.preventDefault();
    e.stopPropagation();
    toggleSaveEvent(event.id);
  };

  return (
    <div className="event-card">
      <div className="event-card-image-wrap">
        <img src={event.image} alt={event.title} className="event-card-image" />
        <span className="badge badge-deep-green event-card-badge">{event.category}</span>
        
        {/* Bookmark Save Button */}
        <button 
          className={`event-card-save-btn ${saved ? 'saved' : ''}`}
          onClick={handleSaveClick}
          title={saved ? "Remove from saved" : "Save event"}
          aria-label={saved ? "Remove from saved" : "Save event"}
        >
          {saved ? '★' : '☆'}
        </button>
      </div>

      <div className="event-card-body">
        <div className="event-card-meta">
          <span>📅 {event.date}</span>
          <span>•</span>
          <span>⏰ {event.time.split(' - ')[0]}</span>
        </div>

        <h3 className="event-card-title">
          <Link to={`/events/${event.id}`}>{event.title}</Link>
        </h3>

        <p className="event-card-desc">{event.shortDescription}</p>

        <div className="event-card-tags">
          {event.tags.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="tag-pill">#{tag}</span>
          ))}
        </div>
      </div>

      <div className="event-card-footer">
        <span className="event-location">📍 {event.location.split(',')[0]}</span>
        <Link to={`/events/${event.id}`} className="event-link-btn">
          Explore Details →
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
