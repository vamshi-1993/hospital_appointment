import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const MyPatients = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        setLoading(true);
        // Ensure this matches the route: /api/appointments/my-appointments
        const res = await axiosInstance.get('/appointments/my-appointments');
        setAppointments(res.data);
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err.response || err);
        setError("Failed to fetch appointments. Check backend console.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorAppointments();
  }, []);

  if (loading) return <div className="p-10 text-center text-gray-600 font-medium">Loading your patients...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Patients</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {appointments.length === 0 && !error ? (
        <div className="card p-10 text-center text-gray-500 border border-dashed">
          No patients have booked your slots yet.
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((app) => (
            <div key={app._id} className="card border p-6 flex justify-between items-center bg-white shadow-sm hover:shadow-md transition-all">
              <div>
                <h3 className="font-semibold text-xl text-blue-900">
                  Patient: {app.patient?.username || "N/A"}
                </h3>
                <p className="text-gray-500 text-sm">{app.patient?.email || "No email provided"}</p>
                <div className="mt-3 inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-sm font-semibold">
                  📅 {app.slot ? new Date(app.slot.startTime).toLocaleString() : "Date TBD"}
                </div>
              </div>
              <span className="px-4 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full border border-green-200">
                ACTIVE BOOKING
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPatients;