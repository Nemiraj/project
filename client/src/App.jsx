import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./compontents/Layout/navbar";
import HeroSearch from "./compontents/Layout/Hero";
import Footer from "./compontents/Layout/Footer";
import Destinations from "./compontents/Layout/Destinations";
import PropertyTypes from "./compontents/Layout/PropertyTypes";
import WhyChooseUs from "./compontents/Layout/WhyChooseUs";
import PropertyInfo from "./compontents/Layout/PropertyInfo";
import ChoiceWizard from "./compontents/Layout/ChoiceWizard";
import NewProjects from "./compontents/Layout/new-project";


// Pages
import NewLaunches from "./pages/NewLaunches";
import PropertiesList from "./pages/PropertiesList";
import PropertyDetail from "./pages/PropertyDetail";
import Postproperty from "./pages/Postproperty";


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen font-inter">

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>

            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <HeroSearch />
                  <Destinations />
                  <PropertyTypes />
                  <WhyChooseUs />
                  <NewProjects />
                  <PropertyInfo />
                  <ChoiceWizard />

                </>
              }
            />

            {/* Properties Pages */}
            <Route path="/new-launches" element={<NewLaunches />} />
            <Route path="/post-property" element={<Postproperty />} />

            <Route path="/properties" element={<PropertiesList />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />

            {/* Static Pages */}
            <Route
              path="/about"
              element={
                <h1 className="max-w-7xl mx-auto p-10 text-3xl font-bold">
                  About Us
                </h1>
              }
            />

            <Route
              path="/services"
              element={
                <h1 className="max-w-7xl mx-auto p-10 text-3xl font-bold">
                  Our Services
                </h1>
              }
            />

            <Route
              path="/contact"
              element={
                <h1 className="max-w-7xl mx-auto p-10 text-3xl font-bold">
                  Contact Us
                </h1>
              }
            />

          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;
