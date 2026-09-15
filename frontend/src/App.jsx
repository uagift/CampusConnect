import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CampusProvider } from "./context/CampusContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
const Explore = lazy(() => import("./pages/Explore/Explore"));
const EventDetails = lazy(() => import("./pages/EventDetails/EventDetails"));
const MyActivities = lazy(() => import("./pages/MyActivities/MyActivities"));
const CreateEvent = lazy(() => import("./pages/CreateEvent/CreateEvent"));

function App() { return <CampusProvider><BrowserRouter><Navbar /><main className="main-content"><Suspense fallback={null}><Routes><Route path="/" element={<Home />} /><Route path="/explore" element={<Explore />} /><Route path="/events/:id" element={<EventDetails />} /><Route path="/my-activities" element={<MyActivities />} /><Route path="/create-event" element={<CreateEvent />} /></Routes></Suspense></main><Footer /></BrowserRouter></CampusProvider>; }
export default App;
