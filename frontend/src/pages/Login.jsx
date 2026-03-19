import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault(); 
    navigate('/admin-dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] font-sans transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <h2 className="text-3xl font-heading font-bold text-center text-ngo-dark dark:text-white mb-6">Staff Login</h2>
        
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Email ID</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              /* 🔥 Placeholder aur Dark mode glitch fix kiya */
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-ngo-green transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              /* 🔥 Placeholder fix */
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-ngo-green transition-colors"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-ngo-green text-white font-bold py-3 px-4 rounded-lg hover:bg-ngo-dark transition duration-300 shadow-md mt-4"
          >
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;