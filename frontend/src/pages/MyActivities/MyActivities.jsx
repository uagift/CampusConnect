import { useState } from 'react';
import { useCampus } from '../../context/CampusContext';
import EventCard from '../../components/EventCard/EventCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import './MyActivities.css';

/**
 * REACT LEARNING CONCEPT: Shared Global State & Local Tab Navigation
 * 
 * 1. WHAT IT DOES:
 *    - `useCampus()` provides access to `savedEvents` and `joinedEvents` lists.
 *    - Local state `activeTab` switches between "saved" and "joined" views.
 * 
 * 2. WHY WE NEED IT HERE:
 *    Provides students with a personal dashboard where saved items and joined events 
 *    are automatically updated in real-time when interacting anywhere in the application.
 * 
 * 3. HOW THE DATA FLOWS:
 *    Context (State) -> useCampus() -> savedEvents / joinedEvents -> map to <EventCard />.
 * 
 * 4. WHAT YOU CAN EDIT/CHANGE LATER:
 *    - Add a "Clear All Saved" button or export activities to calendar.
 */

const MyActivities = () => {
  const { savedEvents, joinedEvents, savedCount, joinedCount } = useCampus();
  const [activeTab, setActiveTab] = useState('saved'); // 'saved' | 'joined'

  return (
    <div className="my-activities-page container animate-fade-in">
      {/* Header Banner */}
      <div className="activities-header-box">
        <h1 className="activities-header-title">My Campus Dashboard</h1>
        <p className="activities-header-subtitle">
          Keep track of student workshops you've bookmarked and upcoming events you've joined.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="activities-tab-bar" role="tablist">
        <button
          className={`activity-tab-btn ${activeTab === 'saved' ? 'active' : ''}`}
          onClick={() => setActiveTab('saved')}
          role="tab"
          aria-selected={activeTab === 'saved'}
        >
          <span>★ Saved Activities</span>
          <span className="tab-badge-count">{savedCount}</span>
        </button>

        <button
          className={`activity-tab-btn ${activeTab === 'joined' ? 'active' : ''}`}
          onClick={() => setActiveTab('joined')}
          role="tab"
          aria-selected={activeTab === 'joined'}
        >
          <span>✓ Joined Events</span>
          <span className="tab-badge-count">{joinedCount}</span>
        </button>
      </div>

      {/* Tab Content: Saved Events */}
      {activeTab === 'saved' && (
        <>
          {savedEvents.length > 0 ? (
            <div className="events-grid">
              {savedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState 
              icon="⭐"
              title="No Saved Activities Yet"
              message="You haven't bookmarked any campus opportunities. Explore events and click the star icon to save them for later."
              actionLabel="Explore Opportunities"
              onAction={() => window.location.href = '/explore'}
            />
          )}
        </>
      )}

      {/* Tab Content: Joined Events */}
      {activeTab === 'joined' && (
        <>
          {joinedEvents.length > 0 ? (
            <div className="events-grid">
              {joinedEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState 
              icon="🎟️"
              title="No Joined Events Yet"
              message="You haven't registered for any events yet. Check out upcoming workshops and club meetups to get involved!"
              actionLabel="Discover Events to Join"
              onAction={() => window.location.href = '/explore'}
            />
          )}
        </>
      )}
    </div>
  );
};

export default MyActivities;
