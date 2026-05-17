import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-blue-600 text-2xl shadow-inner">
            🏥
          </div>
          <h1 className="text-2xl font-bold tracking-tight">MediBook</h1>
        </div>

        {user && (
          <div className="flex items-center gap-4">
            <div className="text-sm">
              Welcome, <span className="font-semibold">{user.username}</span>
              <span className="ml-2 text-xs bg-white/20 px-2 py-1 rounded-full capitalize">
                {user.role}
              </span>
            </div>
            
            <button
              onClick={handleLogout}
              className="bg-white/20 hover:bg-white/30 px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;