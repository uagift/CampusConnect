import React from 'react';
import './SectionHeader.css';

/**
 * REACT LEARNING CONCEPT: Component Props & Reusability
 * 
 * 1. WHAT IT DOES:
 *    SectionHeader accepts `title`, `subtitle`, `badge`, and `action` props to render 
 *    consistent section titles across Home, Explore, and My Activities pages.
 * 
 * 2. WHY WE NEED IT HERE:
 *    Avoids repeating heading boilerplate HTML/CSS on every page!
 * 
 * 3. HOW THE DATA FLOWS:
 *    Parent Page -> Passes props (title="Featured Events") -> SectionHeader destructured parameters -> Rendered JSX.
 * 
 * 4. WHAT YOU CAN EDIT/CHANGE LATER:
 *    - Add extra styling props like align="center" or theme="dark".
 */

const SectionHeader = ({ badge, title, subtitle, action }) => {
  return (
    <div className="section-header">
      <div className="section-header-main">
        {badge && <span className="badge badge-olive section-badge">{badge}</span>}
        <h2 className="section-title">{title}</h2>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
      </div>
      {action && <div className="section-action">{action}</div>}
    </div>
  );
};

export default SectionHeader;
