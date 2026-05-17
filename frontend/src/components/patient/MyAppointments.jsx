import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyAppointments();
  }, []);

  const fetchMyAppointments = async () => {
    try {
      const res = await axiosInstance.get('/appointments/my-appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

    try {
      await axiosInstance.delete(`/appointments/${id}`);
      fetchMyAppointments(); // Refresh list
    } catch (err) {
      alert('Failed to cancel appointment');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">My Appointments</h2>

      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500 text-center py-10">You have no appointments yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map(app => (
            <div key={app._id} className="card border border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Dr. {app.doctor.username}</h3>
                <p className="text-blue-600">{app.doctor.category}</p>
                <p className="text-gray-600 mt-2">
                  {new Date(app.slot.startTime).toLocaleString()} - 
                  {new Date(app.slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>

              <button
                onClick={() => cancelAppointment(app._id)}
                className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition"
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;