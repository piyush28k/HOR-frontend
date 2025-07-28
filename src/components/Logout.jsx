import React from 'react';
const Logout = () => {

  const handleLogout = () => {
    try{
        localStorage.removeItem('user');
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    }catch (error) {
        console.error("Logout failed:", error);
    }

    
  };

  return (
    <div className="flex">
      <button
        onClick={handleLogout}
        className="px-5 py-2 cursor-pointer text-white bg-red-500 hover:bg-red-600 rounded-md shadow-md transition duration-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
