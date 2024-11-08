import { getCurrentUser } from "../api/getCurrentUser";
import React, { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa";


const UserProfile: React.FC = () => {

  interface User{
    id: number;
    name: string;
    email:string;
    password: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    password: ''
  });


  useEffect(() => {
    // Ivan Germano: Chamar a função para obter o usuário atual
    const getUser = async () => {
      const response = await getCurrentUser();
      if (response.success && response.user) {
        setUser(response.user); // Ivan Germano: Define o usuário no estado
      } else {
        console.error(response.message);
      }
    };


    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      setUserDetails({
        name: user.name,
        email: user.email,
        password: user.password
      });
    }
  }, [user]);




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
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (



    <div className="ml-56 flex-grow flex flex-col bg-gray-900 text-white p-16">
      <div className="flex justify-between">

        <h2 className="text-2xl font-bold mb-6 text-left">User Profile</h2>
        <div className="flex cursor-pointer" onClick={handleEditUser}>
          <FaRegEdit name="edit" size={24} color="white" />
          <h2 className="text-xl font-bold mb-6 text-right ml-2">Edit</h2>
        </div>

      </div>
      <div className="mb-4">
        <label className="block font-semibold mb-2">Name</label>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 rounded text-gray-200 focus:outline-none"
          />
        ) : (
          <p className="p-2 bg-gray-700 rounded">{userDetails.name}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block font-semibold mb-2">Email</label>
        {isEditing ? (
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 rounded text-gray-200 focus:outline-none"
          />
        ) : (
          <p className="p-2 bg-gray-700 rounded">{userDetails.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label className="block font-semibold mb-2">Password</label>
        {isEditing ? (
          <input
            type="text"
            name="password"
            value={userDetails.password}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 rounded text-gray-200 focus:outline-none"
          />
        ) : (
          <p className="p-2 bg-gray-700 rounded">{"•".repeat(userDetails.password.length)}</p>
        )}
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
        onClick={handleDeleteAccount}
        className="fixed bottom-4 right-4 text-md text-gray-400 underline mt-4 "
      >
        Delete Account
      </button>
    </div>
  );
}

export default UserProfile