/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { EVENTS_DATA } from '../data/events';

const CampusContext = createContext(null);
const read = (key, fallback) => { try { const stored = localStorage.getItem(key); return stored ? JSON.parse(stored) : fallback; } catch { return fallback; } };
const campusEvents = EVENTS_DATA.map((event) => ({ ...event, source: 'campus', isCommunityCreated: false }));

export const CampusProvider = ({ children }) => {
  const [savedEventIds, setSavedEventIds] = useState(() => read('campus_saved_events', ['evt-101', 'evt-103']));
  const [joinedEventIds, setJoinedEventIds] = useState(() => read('campus_joined_events', ['evt-102']));
  const [communityEvents, setCommunityEvents] = useState(() => read('campus_community_events', []));
  const [eventCache, setEventCache] = useState(() => read('campus_event_cache', []));
  useEffect(() => localStorage.setItem('campus_saved_events', JSON.stringify(savedEventIds)), [savedEventIds]);
  useEffect(() => localStorage.setItem('campus_joined_events', JSON.stringify(joinedEventIds)), [joinedEventIds]);
  useEffect(() => localStorage.setItem('campus_community_events', JSON.stringify(communityEvents)), [communityEvents]);
  useEffect(() => localStorage.setItem('campus_event_cache', JSON.stringify(eventCache)), [eventCache]);
  const events = useMemo(() => [...campusEvents, ...communityEvents, ...eventCache], [communityEvents, eventCache]);
  const rememberEvent = (event) => { if (!event || event.source !== 'ticketmaster') return; setEventCache((current) => current.some((item) => item.id === event.id) ? current.map((item) => item.id === event.id ? event : item) : [...current, event]); };
  const toggleIds = (setter, id, event) => { rememberEvent(event); setter((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]); };
  const createCommunityEvent = (values) => { const event = { ...values, id: `community-${crypto.randomUUID()}`, source: 'community', isCommunityCreated: true, ownerId: 'campus-demo-user', shortDescription: values.description, image: values.image || '', tags: [], venue: '', externalLink: '', spotsLeft: null, isPopular: false }; setCommunityEvents((current) => [...current, event]); return event; };
  const updateCommunityEvent = (id, values) => setCommunityEvents((current) => current.map((event) => event.id === id ? { ...event, ...values, shortDescription: values.description } : event));
  const deleteCommunityEvent = (id) => { setCommunityEvents((current) => current.filter((event) => event.id !== id)); setSavedEventIds((current) => current.filter((item) => item !== id)); setJoinedEventIds((current) => current.filter((item) => item !== id)); };
  const savedEvents = events.filter((event) => savedEventIds.includes(event.id));
  const joinedEvents = events.filter((event) => joinedEventIds.includes(event.id));
  const value = { events, communityEvents, savedEvents, joinedEvents, savedEventIds, joinedEventIds, savedCount: savedEventIds.length, joinedCount: joinedEventIds.length, isSaved: (id) => savedEventIds.includes(id), isJoined: (id) => joinedEventIds.includes(id), toggleSaveEvent: (id, event) => toggleIds(setSavedEventIds, id, event), toggleJoinEvent: (id, event) => toggleIds(setJoinedEventIds, id, event), rememberEvent, createCommunityEvent, updateCommunityEvent, deleteCommunityEvent, findEvent: (id) => events.find((event) => event.id === id) };
  return <CampusContext.Provider value={value}>{children}</CampusContext.Provider>;
};
export const useCampus = () => { const context = useContext(CampusContext); if (!context) throw new Error('useCampus must be used within a CampusProvider'); return context; };
export default CampusContext;