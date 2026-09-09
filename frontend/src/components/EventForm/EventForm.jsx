import { useState } from 'react';
import { CATEGORIES } from '../../data/events';
import './EventForm.css';

const emptyEvent = { title: '', description: '', category: 'Workshops', date: '', time: '', location: '', organizer: '', registrationLink: '', image: '' };

const EventForm = ({ initialEvent, onSubmit, submitLabel = 'Publish Opportunity' }) => {
  const [values, setValues] = useState(() => ({ ...emptyEvent, ...initialEvent, date: initialEvent?.date || '' }));
  const [errors, setErrors] = useState({});
  const update = (event) => setValues((current) => ({ ...current, [event.target.name]: event.target.value }));
  const handleSubmit = (event) => {
    event.preventDefault();
    const required = ['title', 'description', 'category', 'date', 'time', 'location', 'organizer'];
    const nextErrors = Object.fromEntries(required.filter((key) => !values[key].trim()).map((key) => [key, 'This field is required.']));
    if (values.registrationLink && !/^https?:\/\//i.test(values.registrationLink)) nextErrors.registrationLink = 'Use a full URL starting with http:// or https://.';
    if (values.image && !/^https?:\/\//i.test(values.image)) nextErrors.image = 'Use a full image URL starting with http:// or https://.';
    setErrors(nextErrors);
    if (!Object.keys(nextErrors).length) onSubmit(values);
  };
  return <form className="event-form" onSubmit={handleSubmit} noValidate>
    <div className="form-field form-field-wide"><label htmlFor="title">Event title</label><input id="title" name="title" value={values.title} onChange={update} />{errors.title && <small>{errors.title}</small>}</div>
    <div className="form-field form-field-wide"><label htmlFor="description">Description</label><textarea id="description" name="description" rows="5" value={values.description} onChange={update} />{errors.description && <small>{errors.description}</small>}</div>
    <div className="form-field"><label htmlFor="category">Category</label><select id="category" name="category" value={values.category} onChange={update}>{CATEGORIES.filter((item) => item.id !== 'All').map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select>{errors.category && <small>{errors.category}</small>}</div>
    <div className="form-field"><label htmlFor="date">Date</label><input id="date" name="date" type="date" value={values.date} onChange={update} />{errors.date && <small>{errors.date}</small>}</div>
    <div className="form-field"><label htmlFor="time">Time</label><input id="time" name="time" type="time" value={values.time} onChange={update} />{errors.time && <small>{errors.time}</small>}</div>
    <div className="form-field"><label htmlFor="location">Location</label><input id="location" name="location" value={values.location} onChange={update} />{errors.location && <small>{errors.location}</small>}</div>
    <div className="form-field"><label htmlFor="organizer">Organizer</label><input id="organizer" name="organizer" value={values.organizer} onChange={update} />{errors.organizer && <small>{errors.organizer}</small>}</div>
    <div className="form-field"><label htmlFor="registrationLink">Registration link <em>(optional)</em></label><input id="registrationLink" name="registrationLink" type="url" value={values.registrationLink} onChange={update} />{errors.registrationLink && <small>{errors.registrationLink}</small>}</div>
    <div className="form-field form-field-wide"><label htmlFor="image">Image URL <em>(optional)</em></label><input id="image" name="image" type="url" value={values.image} onChange={update} />{errors.image && <small>{errors.image}</small>}</div>
    <button className="btn btn-primary form-submit" type="submit">{submitLabel} →</button>
  </form>;
};
export default EventForm;
