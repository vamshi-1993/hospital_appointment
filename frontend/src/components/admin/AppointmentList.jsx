import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await axiosInstance.get('/admin/appointments');
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm('Delete this appointment?')) return;

    try {
      await axiosInstance.delete(`/admin/appointments/${id}`);
      fetchAppointments();
    } catch (err) {
      alert('Failed to delete appointment');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">All Appointments</h2>

      {loading ? (
        <p>Loading appointments...</p>
      ) : appointments.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map(app => (
            <div key={app._id} className="card border border-gray-200 p-6 flex justify-between items-center">
              <div>
                <p className="font-medium">
                  <span className="text-blue-600">Patient:</span> {app.patient?.username}
                </p>
                <p className="font-medium">
                  <span className="text-blue-600">Doctor:</span> Dr. {app.doctor?.username} 
                  ({app.doctor?.category})
                </p>
                <p className="text-gray-600 mt-2">
                  {new Date(app.slot?.startTime).toLocaleString()} 
                </p>
              </div>

              <button
                onClick={() => deleteAppointment(app._id)}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentList;