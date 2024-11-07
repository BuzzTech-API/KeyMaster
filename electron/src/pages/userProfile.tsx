import React, { useState } from "react"
import { FaRegEdit } from "react-icons/fa";


interface UserProps {
  name?: string,
  email?: string,
  password?: string
}

const UserProfile: React.FC<UserProps> = ({ email, password }) => {

  const [isEditing, setIsEditing] = useState(false);

  const handleSaveChanges = () => {
    // Save changes to the server or update state as needed
    setIsEditing(false);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      // Handle account deletion logic
    }
  };

  const handleEditUser = () => {
    console.log("Editing user...");
  };

  return (

      <div className="ml-56 flex-grow flex flex-col bg-gray-900 text-white p-16">
        <div className = "flex justify-between">
          
          <h2 className="text-2xl font-bold mb-6 text-left">User Profile</h2>
          <div className="flex cursor-pointer" onClick={handleEditUser}>
          <FaRegEdit name="edit" size={24} color="white" />
          <h2 className="text-xl font-bold mb-6 text-right ml-2">Edit</h2>
          </div>

        </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Username</label>
            <input
              className="w-full p-2 bg-gray-700 rounded text-gray-200 focus:outline-none"
              value={''}
              // onChange={(e) => { setUsername(e.target.value); setIsEditing(true); }}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Email</label>
            <input
              className="w-full p-2 bg-gray-700 rounded text-gray-200 focus:outline-none"
              value={email}
              // onChange={(e) => { setEmail(e.target.value); setIsEditing(true); }}
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold mb-2">Password</label>
            <input
              className="w-full p-2 bg-gray-700 rounded text-gray-200 focus:outline-none"
              type="password"
              value={password}
              // onChange={(e) => { setPassword(e.target.value); setIsEditing(true); }}
            />
          </div>

          {isEditing && (
            <button
              onClick={handleSaveChanges}
              className="w-full bg-blue-600 p-2 rounded font-semibold hover:bg-blue-700 transition-colors mb-4"
            >
              Save Changes
            </button>
          )}

          <button
            onClick={() => console.log("Logging out")}
            className="w-full bg-red-600 p-2 rounded font-semibold hover:bg-red-700 transition-colors mb-4"
          >
            Logout
          </button>

          <button
            onClick={handleDeleteAccount}
            className="fixed bottom-4 right-4 text-md text-gray-400 underline mt-4 "
          >
            Delete Account
          </button>
      </div>
  );
}

export default UserProfile