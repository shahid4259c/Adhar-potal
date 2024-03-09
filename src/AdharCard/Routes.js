import React from "react";
import { Route, Routes } from "react-router-dom";
import AdharFront from "./AdharFront";
import DashBord from "./DashBord";
import GenerateAdhar from "./GenerateCard"; // Import the GenerateAdhar component
import GenerateCard from "./GenerateCard";
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<AdharFront />} />
    <Route path="/DashBoard" element={<DashBord />} />
    <Route path="/GenerateAdhar" element={<GenerateAdhar />} /> {/* Add the route for GenerateAdhar */}
    <Route path="/GenerateCard" element={<GenerateCard />} /> {/* Add the route for GenerateAdhar */}


  </Routes>
);
