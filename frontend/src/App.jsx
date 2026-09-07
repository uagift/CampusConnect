import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CampusProvider } from "./context/CampusContext";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Explore from "./pages/Explore/Explore";
import EventDetails from "./pages/EventDetails/EventDetails";
import MyActivities from "./pages/MyActivities/MyActivities";

/**
 * REACT LEARNING CONCEPT: React Router DOM & Layout Architecture
 * 
 * 1. WHAT IT DOES:
 *    BrowserRouter enables client-side routing.
 *    Routes inspects the current Browser URL and renders the matching <Route> component 
 *    without reloading the page!
 * 
 * 2. WHY WE NEED IT HERE:
 *    CampusConnect is a Single Page Application (SPA). React Router keeps page switches 
 *    instantaneous while updating the address bar URL.
 * 
 * 3. HOW DATA FLOWS:
 *    CampusProvider (State) -> BrowserRouter (URL Listener) -> Navbar & Footer (Shared Layout) -> Current Page element.
 * 
 * 4. WHAT YOU CAN EDIT/CHANGE LATER:
 *    - Add 404 Page (Not Found Route: path="*")
 *    - Add new page routes like path="/clubs" or path="/about"
 */

function App() {
  return (
    <CampusProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/events/:id" element={<EventDetails />} />
            <Route path="/my-activities" element={<MyActivities />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </CampusProvider>
  );
}

export default App;