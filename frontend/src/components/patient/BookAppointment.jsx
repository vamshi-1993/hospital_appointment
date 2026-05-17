import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';

const BookAppointment = () => {
  const [slots, setSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const categories = [
    'All', 'Cardiologists', 'Dermatologists', 'Endocrinologists',
    'Gastroenterologists', 'Neurologists', 'Pediatricians', 'Gynecologists'
  ];

  useEffect(() => {
    fetchAvailableSlots();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const res = await axiosInstance.get('/slots/available');
      setSlots(res.data);
      setFilteredSlots(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredSlots(slots);
    } else {
      const filtered = slots.filter(slot => slot.doctor.category === category);
      setFilteredSlots(filtered);
    }
  };

  const bookSlot = async (slotId) => {
    try {
      await axiosInstance.post('/appointments/book', { slotId });
      setMessage('✅ Appointment booked successfully!');
      fetchAvailableSlots(); // Refresh slots
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to book appointment');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Book Appointment</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Filter by Department</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-xl">
          {message}
        </div>
      )}

      {loading ? (
        <p>Loading available slots...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSlots.length > 0 ? (
            filteredSlots.map(slot => (
              <div key={slot._id} className="card border border-gray-200">
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{slot.doctor.username}</h3>
                      <p className="text-blue-600 font-medium">{slot.doctor.category}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Available
                    </span>
                  </div>

                  <div className="mt-4 text-gray-600">
                    <p><strong>Date:</strong> {new Date(slot.startTime).toLocaleDateString()}</p>
                    <p><strong>Time:</strong> {new Date(slot.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                       {new Date(slot.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>

                  <button
                    onClick={() => bookSlot(slot._id)}
                    className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
                  >
                    Book This Slot
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500 py-10">No available slots found for this category.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BookAppointment;