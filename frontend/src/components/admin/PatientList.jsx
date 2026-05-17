import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const res = await axiosInstance.get('/admin/patients');
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePatient = async (id) => {
    if (!window.confirm('Are you sure you want to delete this patient?')) return;

    try {
      await axiosInstance.delete(`/admin/users/${id}`);
      fetchPatients();
    } catch (err) {
      alert('Failed to delete patient');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Registered Patients</h2>

      {loading ? (
        <p>Loading patients...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.map(patient => (
            <div key={patient._id} className="card border border-gray-200">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-xl">{patient.username}</h3>
                    <p className="text-gray-600">{patient.email}</p>
                  </div>
                  <span className="px-4 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                    Patient
                  </span>
                </div>

                <button
                  onClick={() => deletePatient(patient._id)}
                  className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
                >
                  Delete Patient
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {patients.length === 0 && !loading && (
        <p className="text-gray-500 text-center py-10">No patients registered yet.</p>
      )}
    </div>
  );
};

export default PatientList;