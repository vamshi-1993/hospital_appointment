import { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const CreateSlot = () => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await axiosInstance.post('/slots', {
        startTime,
        endTime
      });

      setMessage('✅ Slot created successfully!');
      setStartTime('');
      setEndTime('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create slot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Create Appointment Slot</h2>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Start Time
            </label>
            <input
              type="datetime-local"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              End Time
            </label>
            <input
              type="datetime-local"
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition disabled:opacity-70"
          >
            {loading ? 'Creating Slot...' : 'Create Slot'}
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center font-medium ${
            message.includes('✅') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>

      <p className="text-sm text-gray-500 mt-4 text-center">
        Tip: Create slots for your available timings
      </p>
    </div>
  );
};

export default CreateSlot;