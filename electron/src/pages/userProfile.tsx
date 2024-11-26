import { getCurrentUser } from "../api/getCurrentUser";
import { IoEyeOutline, IoEyeSharp } from "react-icons/io5";
import React, { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa";
import { updateUser } from "../api/updateUser";
import { useUser } from "../context/UserContext";
import { useTerms } from "../context/TermsContext";
import Condition from "../types/condition";
import Checkbox from "../components/checkbox";
import TermsAndCondition from "../components/termsAndCondition";
import { updateUserHasConsent } from "../api/user_has_consent";
import { deleteUser } from "../api/deleteUser";
import { logout } from "../api/logout";


const UserProfile: React.FC<{setActiveScreen: (screen: string) => void}> = ({ setActiveScreen }) => {

  const { user, setUser } = useUser()

  // Pega os consentimento do usuario e os Termos Atuais
  const { termOfConditions, userHasConsent } = useTerms()

  // State do modal do PDF do Termo
  const [isOpen, setIsOpen] = useState(false);

  // Pega as condições do termo ativo para exibir
  const [conditions, setConditions] = useState<Condition[]>(userHasConsent.filter((userConsent) =>
    termOfConditions.consents.some(
      (termConsent) => termConsent.id === userConsent.consent_id
    )
  )
    .map((userConsent) => {
      const newCondition = new Condition(userConsent.consent);
      newCondition.checked = userConsent.isAccept;
      return newCondition;
    }))

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

  const handleSaveChanges = async (e: React.FormEvent) => {

    e.preventDefault()
  

    const updatedUserDetails = { ...userDetails };

    //Se o usuário não colocar senha ela não sera alterada
    if (updatedUserDetails.password === "") {
      delete updatedUserDetails.password;
    }

    const requestUpdate = conditions.map((condition)=>{
      if(condition.consentimento.isOptional){
        return updateUserHasConsent(user.id, condition.consentimento.id, condition.checked) 
      }
    })
    const resultUpdates = await Promise.all(requestUpdate)

    //salvar os userDetails
    console.log("Atualizando usuário: ", { userDetails })
    const result = await updateUser(updatedUserDetails, user.id)
    console.log("Resultado da operação: ", result)

    if (result.success) {

      //Isso salva o usuário no context, garantindo que só vai salvar as alterações
      setUser((prevUser) => ({
        ...prevUser,
        ...updatedUserDetails,
      }));

    }

    // Save changes to the server or update state as needed
    setIsEditing(false);
  };



  const handleDeleteAccount = async () => {
    if (window.confirm("Tem certeza que deseja deletar sua conta? Essa ação não pode ser desfeita!")) {

      setActiveScreen('login');
      const result = await deleteUser(user.id)
      await logout();
      console.log(result)
      
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
      <form
        onSubmit={handleSaveChanges}
      >
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


      <div className="flex w-full items-center justify-center my-4 text-center">
        <span
          className="text-white text-xl align-middle self-center justify-center justify-self-center hover:text-gray-500 hover:cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Termos e condições aceitos
        </span>
      </div>

      <div className="flex flex-col gap-6 mb-4" >
      {conditions!== undefined && conditions.map((condition, index)=>{
        if(isEditing){
          return(
            <Checkbox
              key={index}
              checked={condition.checked}
              required={condition.consentimento.isOptional ? false : true}
              onChange={function(check): void {
                condition.checked = check
                setConditions(conditions.map(conditions=>conditions))
              }}
            >
              {condition.consentimento.content}
            </Checkbox>
          )
        }else{
          return(
            <Checkbox
              key={index}
              checked={condition.checked}
              required={condition.consentimento.isOptional ? false : true}
              onChange={function(check): void {
              }}
            >
              {condition.consentimento.content}
            </Checkbox>
          )

        }
      }
      )}
      </div>

      <TermsAndCondition isOpen={isOpen}  pdfLink={termOfConditions.pdfLink!== undefined? termOfConditions.pdfLink : ''} setIsOpen={setIsOpen} />

      {isEditing && (
        <button
          type="submit"
          className="w-full bg-blue-600 p-2 rounded font-semibold hover:bg-blue-700 transition-colors mb-4"
        >
          Save Changes
        </button>
      )}

      </form>
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
