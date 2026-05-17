import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axiosInstance.get('/admin/doctors');
      setDoctors(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctor = async (id) => {
    if (!window.confirm('Delete this doctor?')) return;

    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      fetchDoctors();
    } catch (err) {
      alert('Failed to delete doctor');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Registered Doctors</h2>

      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map(doctor => (
            <div key={doctor._id} className="card border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold text-xl">Dr. {doctor.username}</h3>
                    <p className="text-blue-600 font-medium mt-1">{doctor.category}</p>
                    <p className="text-gray-600 text-sm mt-2">{doctor.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => deleteDoctor(doctor._id)}
                  className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
                >
                  Delete Doctor
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {doctors.length === 0 && !loading && (
        <p className="text-gray-500 text-center py-10">No doctors registered yet.</p>
      )}
    </div>
  );
};

export default DoctorList;