import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import CreateSlot from '../components/doctor/CreateSlot';
import MyPatients from '../components/doctor/MyPatients';

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="doctor" />
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<CreateSlot />} />
            <Route path="/patients" element={<MyPatients />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;