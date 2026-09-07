import React, { createContext, useContext, useState, useEffect } from 'react';
import { EVENTS_DATA } from '../data/events';

/**
 * REACT LEARNING CONCEPT: React Context API
 * 
 * 1. WHAT IT DOES:
 *    Context provides a way to pass data through the component tree without 
 *    having to pass props manually down at every level ("prop drilling").
 * 
 * 2. WHY WE NEED IT HERE:
 *    The state of "Saved Events" and "Joined Events" needs to be accessed and modified 
 *    from multiple pages and components:
 *    - Navbar (shows badge counters for saved/joined)
 *    - EventCard (shows dynamic bookmark icon state)
 *    - EventDetails (shows "Save" and "Join" buttons)
 *    - MyActivities (renders saved & joined event lists)
 *    Without Context, we would have to pass state & handler functions up and down 4+ levels!
 * 
 * 3. HOW THE DATA FLOWS:
 *    Events data -> CampusProvider state -> Context.Provider -> Custom Hook useCampus() -> Any child component.
 * 
 * 4. WHAT YOU CAN EDIT/CHANGE LATER:
 *    - You can persist saved/joined events to localStorage so they stay saved when refreshing.
 *    - You can add notifications or toast alerts when an item is saved/joined.
 */

// 1. Create the Context object
const CampusContext = createContext(null);

// 2. Create the Provider Component
export const CampusProvider = ({ children }) => {
  // Initialize state with default saved/joined event IDs
  const [savedEventIds, setSavedEventIds] = useState(() => {
    const local = localStorage.getItem('campus_saved_events');
    return local ? JSON.parse(local) : ["evt-101", "evt-103"];
  });

  const [joinedEventIds, setJoinedEventIds] = useState(() => {
    const local = localStorage.getItem('campus_joined_events');
    return local ? JSON.parse(local) : ["evt-102"];
  });

  // Sync state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('campus_saved_events', JSON.stringify(savedEventIds));
  }, [savedEventIds]);

  useEffect(() => {
    localStorage.setItem('campus_joined_events', JSON.stringify(joinedEventIds));
  }, [joinedEventIds]);

  // Toggle Save status for an event
  const toggleSaveEvent = (id) => {
    setSavedEventIds((prevSaved) => {
      if (prevSaved.includes(id)) {
        return prevSaved.filter((savedId) => savedId !== id);
      } else {
        return [...prevSaved, id];
      }
    });
  };

  // Toggle Join status for an event
  const toggleJoinEvent = (id) => {
    setJoinedEventIds((prevJoined) => {
      if (prevJoined.includes(id)) {
        return prevJoined.filter((joinedId) => joinedId !== id);
      } else {
        return [...prevJoined, id];
      }
    });
  };

  // Helper utility methods
  const isSaved = (id) => savedEventIds.includes(id);
  const isJoined = (id) => joinedEventIds.includes(id);

  // Derived full event data lists
  const savedEvents = EVENTS_DATA.filter((event) => savedEventIds.includes(event.id));
  const joinedEvents = EVENTS_DATA.filter((event) => joinedEventIds.includes(event.id));

  // The value object containing all state and functions we want to share
  const value = {
    events: EVENTS_DATA,
    savedEventIds,
    joinedEventIds,
    savedEvents,
    joinedEvents,
    toggleSaveEvent,
    toggleJoinEvent,
    isSaved,
    isJoined,
    savedCount: savedEventIds.length,
    joinedCount: joinedEventIds.length
  };

  return (
    <CampusContext.Provider value={value}>
      {children}
    </CampusContext.Provider>
  );
};

// 3. Create a custom hook for easy consumption of Context
export const useCampus = () => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};

export default CampusContext;
