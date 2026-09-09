import './SearchBar.css';

/**
 * REACT LEARNING CONCEPT: Controlled Components & Event Handling
 * 
 * 1. WHAT IT DOES:
 *    A controlled input means React state (`value`) drives the input value, and 
 *    user keypresses trigger `onChange` to update state.
 * 
 * 2. WHY WE NEED IT HERE:
 *    Allows instant search updates without submitting a form or reloading the page!
 * 
 * 3. HOW THE DATA FLOWS:
 *    User types letter -> onChange event fires -> calls setSearchTerm(e.target.value) -> state updates -> parent component re-renders filtered list.
 * 
 * 4. WHAT YOU CAN EDIT/CHANGE LATER:
 *    - Add debouncing if searching against a live backend API.
 */

const SearchBar = ({ value, onChange, placeholder = "Search by event title, category, or tag..." }) => {
  return (
    <div className="search-bar-wrap">
      <span className="search-icon-left">🔍</span>
      <input 
        type="text"
        className="search-input-field"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button 
          className="search-clear-btn" 
          onClick={() => onChange("")}
          title="Clear search"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;
