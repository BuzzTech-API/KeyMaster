import { getCurrentUser } from "../api/getCurrentUser";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import React, { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa";
import { updateUser } from "../api/updateUser";
import { deleteUser } from "../api/deleteUser";
import { useUser } from "../context/UserContext";


const UserProfile: React.FC = () => {

  const { user, setUser } = useUser()

  const [userDetails, setUserDetails] = useState({
    id: user.id,
    name: user.name,
    email: user.email,
    password: ''
  });
  
  //Edição de Usuário
  const [isEditing, setIsEditing] = useState(false);
  const handleEditUser = () => {
    setIsEditing(true);
  };
  
  const handleSaveChanges = async () => {

    const updatedUserDetails = { ...userDetails };

    //Se o usuário não colocar senha ela não sera alterada
    if (updatedUserDetails.password === "") {
      delete updatedUserDetails.password;
    }

    //salvar os userDetails
    console.log("Atualizando usuário: ", { userDetails })
    const result = await updateUser(updatedUserDetails, user.id)
    console.log("Resultado da operação: ", result)

    if(result.success){

      //Isso salva o usuário no context, garantindo que só vai salvar as alterações
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedUserDetails,
      }));

    }

    // Save changes to the server or update state as needed
    setIsEditing(false);
  };
  
  

  const handleDeleteAccount = () => {
    if (window.confirm("Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita!")) {

      deleteUser(user.id)


      // Handle account deletion logic
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          <p className="p-2 bg-gray-700 rounded">{userDetails.name} </p>
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
          <div className="relative w-full">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={userDetails.password}
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 rounded text-gray-200 focus:outline-none"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
            >
              {showPassword ? (
                <IoEyeSharp className="w-5 h-5" aria-hidden="true" />
              ) : (
                <IoEyeOutline className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        ) : (
          <p className="p-2 bg-gray-700 rounded">{userDetails.password === "" ? "•".repeat(8) : "•".repeat(userDetails.password.length)}</p>
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