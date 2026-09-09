import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CampusProvider } from "./context/CampusContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import EventDetails from "./pages/EventDetails/EventDetails";
import MyActivities from "./pages/MyActivities/MyActivities";
import CreateEvent from "./pages/CreateEvent/CreateEvent";
function App() { return <CampusProvider><BrowserRouter><Navbar /><main className="main-content"><Routes><Route path="/" element={<Home />} /><Route path="/explore" element={<Explore />} /><Route path="/events/:id" element={<EventDetails />} /><Route path="/my-activities" element={<MyActivities />} /><Route path="/create-event" element={<CreateEvent />} /></Routes></main><Footer /></BrowserRouter></CampusProvider>; }
export default App;