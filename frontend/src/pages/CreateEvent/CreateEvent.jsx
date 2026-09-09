import { useNavigate } from 'react-router-dom';
import { useCampus } from '../../context/CampusContext';
import EventForm from '../../components/EventForm/EventForm';
import './CreateEvent.css';
const CreateEvent = () => { const { createCommunityEvent } = useCampus(); const navigate = useNavigate(); const submit = (values) => { const event = createCommunityEvent(values); navigate(`/events/${event.id}`); }; return <div className="create-event-page container animate-fade-in"><span className="badge badge-olive">Community board</span><h1>Share an opportunity</h1><p>Help students discover something worth showing up for.</p><EventForm onSubmit={submit} /></div>; };
export default CreateEvent;
