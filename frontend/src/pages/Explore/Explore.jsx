import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import EventCard from '../../components/EventCard/EventCard';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useCampus } from '../../context/CampusContext';
import { CATEGORIES } from '../../data/events';
import { searchTicketmasterEvents } from '../../services/ticketmasterApi';
import './Explore.css';

const matches = (event, term, category) => {
  const haystack = [event.title, event.shortDescription, event.description, event.organizer, ...(event.tags || [])].filter(Boolean).join(' ').toLowerCase();
  return (category === 'All' || event.category?.toLowerCase() === category.toLowerCase()) && (!term || haystack.includes(term));
};
const Explore = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const selectedCategory = searchParams.get('category') || 'All';
  const [externalEvents, setExternalEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [requestKey, setRequestKey] = useState(0);
  const { events } = useCampus();
  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setLoading(true); setError('');
      try { const result = await searchTicketmasterEvents({ keyword: searchTerm, category: selectedCategory, signal: controller.signal }); setExternalEvents(result); }
      catch (err) { if (err.name !== 'AbortError') { setExternalEvents([]); setError(err.message || 'Unable to load Ticketmaster events right now.'); } }
      finally { if (!controller.signal.aborted) setLoading(false); }
    }, 450);
    return () => { controller.abort(); clearTimeout(timer); };
  }, [searchTerm, selectedCategory, requestKey]);
  const localEvents = useMemo(() => events.filter((event) => event.source !== 'ticketmaster' && matches(event, searchTerm.trim().toLowerCase(), selectedCategory)), [events, searchTerm, selectedCategory]);
  const displayedEvents = useMemo(() => [...localEvents, ...externalEvents.filter((event) => matches(event, searchTerm.trim().toLowerCase(), selectedCategory))], [localEvents, externalEvents, searchTerm, selectedCategory]);
  const selectCategory = (id) => setSearchParams(id === 'All' ? {} : { category: id });
  const reset = () => { setSearchTerm(''); selectCategory('All'); };
  return <div className="explore-page container animate-fade-in"><div className="explore-header-box"><h1 className="explore-header-title">Discover Campus Opportunities</h1><p className="explore-header-subtitle">CampusConnect opportunities plus live events from Ticketmaster.</p><SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search by keyword, skill, topic, or organizer..." /></div><CategoryFilter categories={CATEGORIES} selectedCategory={selectedCategory} onSelectCategory={selectCategory} /><div className="results-meta-bar"><span className="results-count-text">Showing <strong>{displayedEvents.length}</strong> {displayedEvents.length === 1 ? 'opportunity' : 'opportunities'}</span>{(selectedCategory !== 'All' || searchTerm) && <button className="btn btn-outline compact-button" onClick={reset}>Clear Filters ✕</button>}</div>{loading && <div className="api-message">⏳ Looking for Ticketmaster events…</div>}{error && <div className="api-message api-error">⚠ {error} <button onClick={() => setRequestKey((key) => key + 1)}>Retry</button></div>}{displayedEvents.length ? <div className="events-grid">{displayedEvents.map((event) => <EventCard key={event.id} event={event} />)}</div> : !loading && <EmptyState icon="🔎" title="No events match your criteria" message="Try another search or clear your filters." actionLabel="Reset All Filters" onAction={reset} />}</div>;
};
export default Explore;