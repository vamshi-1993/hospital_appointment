import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'patient',
    category: '',
    adminCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = { ...formData };
      if (formData.role !== 'doctor') delete payload.category;
      if (formData.role !== 'admin') delete payload.adminCode;

      await axiosInstance.post('/auth/register', payload);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="text" placeholder="Username" className="w-full p-4 border rounded-xl" required
            onChange={(e) => setFormData({ ...formData, username: e.target.value })} />

          <input type="email" placeholder="Email" className="w-full p-4 border rounded-xl" required
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

          <input type="password" placeholder="Password" className="w-full p-4 border rounded-xl" required
            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <select className="w-full p-4 border rounded-xl" 
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {formData.role === 'doctor' && (
            <select className="w-full p-4 border rounded-xl" required
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
              <option value="">Select Department</option>
              <option value="Cardiologists">Cardiologists</option>
              <option value="Dermatologists">Dermatologists</option>
              <option value="Endocrinologists">Endocrinologists</option>
              <option value="Gastroenterologists">Gastroenterologists</option>
              <option value="Neurologists">Neurologists</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Gynecologists">Gynecologists</option>
            </select>
          )}

          {formData.role === 'admin' && (
            <input type="text" placeholder="Admin Code (1993)" className="w-full p-4 border rounded-xl" required
              onChange={(e) => setFormData({ ...formData, adminCode: e.target.value })} />
          )}

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold">
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;