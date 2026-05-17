import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import BookAppointment from '../components/patient/BookAppointment';
import MyAppointments from '../components/patient/MyAppointments';

const PatientDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="patient" />
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<BookAppointment />} />
            <Route path="/appointments" element={<MyAppointments />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;