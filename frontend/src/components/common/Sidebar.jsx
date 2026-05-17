import { NavLink } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const menuItems = {
    patient: [
      { name: "Book Appointment", path: "/patient" },
      { name: "My Appointments", path: "/patient/appointments" },
    ],
    doctor: [
      { name: "Create Slots", path: "/doctor" },
      { name: "My Patients", path: "/doctor/patients" },
    ],
    admin: [
      { name: "Patients List", path: "/admin" },
      { name: "Doctors List", path: "/admin/doctors" },
      { name: "All Appointments", path: "/admin/appointments" },
    ],
  };

  return (
    <div className="w-64 bg-white shadow-xl h-[calc(100vh-73px)] p-6 border-r">
      <div className="mb-8">
        <h3 className="text-gray-500 uppercase text-xs font-semibold tracking-widest mb-4">
          {role === 'patient' && 'Patient Menu'}
          {role === 'doctor' && 'Doctor Menu'}
          {role === 'admin' && 'Admin Menu'}
        </h3>
      </div>

      <div className="space-y-2">
        {menuItems[role]?.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'hover:bg-gray-100 text-gray-700'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;