import { Routes, Route } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Sidebar from '../components/common/Sidebar';
import PatientList from '../components/admin/PatientList';
import DoctorList from '../components/admin/DoctorList';
import AppointmentList from '../components/admin/AppointmentList';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar role="admin" />
        <div className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<PatientList />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/appointments" element={<AppointmentList />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;