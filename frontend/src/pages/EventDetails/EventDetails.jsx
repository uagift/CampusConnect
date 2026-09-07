import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCampus } from '../../context/CampusContext';
import { EVENTS_DATA } from '../../data/events';
import EmptyState from '../../components/EmptyState/EmptyState';
import './EventDetails.css';

/**
 * REACT LEARNING CONCEPT: Dynamic Routes & useParams()
 * 
 * 1. WHAT IT DOES:
 *    `useParams()` reads dynamic parameters from the current URL defined in the router:
 *    `<Route path="/events/:id" element={<EventDetails />} />`
 *    If the browser URL is `/events/evt-101`, `useParams()` returns `{ id: 'evt-101' }`.
 * 
 * 2. WHY WE NEED IT HERE:
 *    Allows one single EventDetails component file to dynamically render any event 
 *    in the system without duplicating pages or code!
 * 
 * 3. HOW THE DATA FLOWS:
 *    URL (/events/:id) -> useParams() gets id -> EVENTS_DATA.find(e => e.id === id) -> renders matching event details.
 * 
 * 4. WHAT YOU CAN EDIT/CHANGE LATER:
 *    - Add a comment section or RSVP count meter.
 *    - Add "Share Event" modal.
 */

const EventDetails = () => {
  const { id } = useParams();
  const { isSaved, isJoined, toggleSaveEvent, toggleJoinEvent } = useCampus();
  const [toastMessage, setToastMessage] = useState(null);

  // Look up the event matching the URL parameter
  const event = EVENTS_DATA.find((e) => e.id === id);

  // Trigger temporary feedback toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  if (!event) {
    return (
      <div className="container" style={{ padding: '4rem 0' }}>
        <EmptyState 
          icon="❓"
          title="Event Not Found"
          message="The campus opportunity you are looking for does not exist or has ended."
          actionLabel="Back to Explore"
          onAction={() => window.location.href = '/explore'}
        />
      </div>
    );
  }

  const saved = isSaved(event.id);
  const joined = isJoined(event.id);

  const handleToggleSave = () => {
    toggleSaveEvent(event.id);
    triggerToast(saved ? "Removed from Saved Activities" : "Saved to My Activities!");
  };

  const handleToggleJoin = () => {
    toggleJoinEvent(event.id);
    triggerToast(joined ? "Left event registration" : "Successfully joined event! See you there.");
  };

  return (
    <div className="event-details-page container animate-fade-in">
      {/* Back Navigation Link */}
      <Link to="/explore" className="back-link-btn">
        ← Back to All Opportunities
      </Link>

      <div className="details-card">
        {/* Banner Cover Image */}
        <div className="details-banner-frame">
          <img src={event.image} alt={event.title} className="details-banner-img" />
        </div>

        <div className="details-content-grid">
          {/* Main Left Details */}
          <div className="details-main-info">
            <div className="details-header-tags">
              <span className="badge badge-deep-green">{event.category}</span>
              {event.isPopular && <span className="badge badge-lime">🔥 Popular Event</span>}
            </div>

            <h1 className="details-title">{event.title}</h1>
            <p className="details-organizer">Organized by: {event.organizer}</p>

            <div className="details-divider"></div>

            <h3 className="details-section-heading">About This Opportunity</h3>
            <p className="details-description">{event.description}</p>

            <div className="details-divider"></div>

            <h3 className="details-section-heading">Topics & Skill Tags</h3>
            <div className="details-tags-row">
              {event.tags.map((tag, idx) => (
                <span key={idx} className="badge badge-soft-blue">#{tag}</span>
              ))}
            </div>
          </div>

          {/* Right Meta Sidebar */}
          <div className="details-meta-sidebar">
            {toastMessage && (
              <div className="toast-feedback">
                <span>✦</span>
                <span>{toastMessage}</span>
              </div>
            )}

            <div className="meta-info-item">
              <div className="meta-icon-box">📅</div>
              <div className="meta-text-group">
                <span className="meta-label">Date</span>
                <span className="meta-value">{event.date}</span>
              </div>
            </div>

            <div className="meta-info-item">
              <div className="meta-icon-box">⏰</div>
              <div className="meta-text-group">
                <span className="meta-label">Time</span>
                <span className="meta-value">{event.time}</span>
              </div>
            </div>

            <div className="meta-info-item">
              <div className="meta-icon-box">📍</div>
              <div className="meta-text-group">
                <span className="meta-label">Location</span>
                <span className="meta-value">{event.location}</span>
              </div>
            </div>

            <div className="meta-info-item">
              <div className="meta-icon-box">🎟️</div>
              <div className="meta-text-group">
                <span className="meta-label">Availability</span>
                <span className="meta-value" style={{ color: 'var(--color-deep-green)' }}>
                  {event.spotsLeft} spots remaining
                </span>
              </div>
            </div>

            <div className="details-action-buttons">
              {/* Join Action Button */}
              <button 
                className={`btn ${joined ? 'btn-joined' : 'btn-primary'}`}
                onClick={handleToggleJoin}
                style={{ width: '100%' }}
              >
                {joined ? '✓ Joined Activity' : 'Join Event Now'}
              </button>

              {/* Save Action Button */}
              <button 
                className={`btn ${saved ? 'btn-saved' : 'btn-outline'}`}
                onClick={handleToggleSave}
                style={{ width: '100%' }}
              >
                {saved ? '★ Saved in Activities' : '☆ Save for Later'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
