import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/Hero/Hero';
import SectionHeader from '../../components/SectionHeader/SectionHeader';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import EventCard from '../../components/EventCard/EventCard';

import { CATEGORIES, EVENTS_DATA } from '../../data/events';
import './Home.css';

/**
 * REACT LEARNING CONCEPT: Rendering Lists with .map() & Key Props
 * 
 * 1. WHAT IT DOES:
 *    The `.map()` array method transforms each item in an array (e.g. EVENTS_DATA) 
 *    into a React JSX element (`<EventCard />`).
 * 
 * 2. WHY WE NEED IT HERE:
 *    Instead of hardcoding 8 separate `<EventCard>` blocks manually, we render them dynamically 
 *    from data! Every element inside a `.map()` list requires a unique `key` prop so React 
 *    can efficiently update the DOM when state changes.
 * 
 * 3. HOW THE DATA FLOWS:
 *    EVENTS_DATA (Array) -> .filter(event => event.isPopular) -> .map(event => <EventCard key={event.id} event={event} />)
 * 
 * 4. WHAT YOU CAN EDIT/CHANGE LATER:
 *    - Add dynamic sorting (e.g., sort events by date).
 *    - Increase or decrease featured items limit.
 */

const Home = () => {
  // Filter categories to exclude "All" for category grid showcase
  const categoryShowcase = CATEGORIES.filter((cat) => cat.id !== "All");

  // Featured events list (popular events)
  const featuredEvents = EVENTS_DATA.filter((event) => event.isPopular);

  return (
    <div className="home-page animate-fade-in">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Explore by Category Section */}
      <section className="container">
        <SectionHeader 
          badge="Browse By Topic"
          title="Explore Campus Opportunities"
          subtitle="Find exactly what aligns with your skills, hobbies, and career goals."
          action={
            <Link to="/explore" className="btn btn-outline">
              View All Categories →
            </Link>
          }
        />
        
        <div className="category-grid">
          {categoryShowcase.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* 3. Featured Events Section */}
      <section className="container">
        <SectionHeader 
          badge="Featured Highlights"
          title="Upcoming Campus Events"
          subtitle="Popular activities, workshops, and competitions happening this month."
          action={
            <Link to="/explore" className="btn btn-primary">
              Browse Full Catalog ➔
            </Link>
          }
        />

        <div className="events-grid">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* 4. Strong Final Call To Action Banner */}
      <section className="container">
        <div className="cta-banner">
          <div className="cta-banner-content">
            <span className="badge badge-lime">Get Started Today</span>
            <h2 className="cta-title">Discover Your Next Breakthrough Experience</h2>
            <p className="cta-desc">
              Whether you want to master web development, present your research, join a gaming league, or volunteer, CampusConnect brings everything to your fingertips.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Link to="/explore" className="btn btn-primary">
                Find Events Now ➔
              </Link>
              <Link to="/my-activities" className="btn btn-outline" style={{ color: 'var(--color-offwhite)', borderColor: 'var(--color-offwhite)' }}>
                View Saved Activities
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;