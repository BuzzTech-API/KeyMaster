import React, { useEffect, useState } from "react";
import Checkbox from "../components/checkbox";
import Modal from "../components/modal";
import TermsAndCondition from "../components/termsAndCondition";
import CreateUser from "../api/createUser";
import { TermOfConditions } from "../types/termOfConditions";
import { GetTermOfConditions } from "../api/term-of-conditions";

interface Signpprops {
  setActiveScreen: React.Dispatch<React.SetStateAction<string>>; // Callback prop
  isSuperUser?: boolean;
}

const Signup: React.FC<Signpprops> = ({
  setActiveScreen,
  isSuperUser = false,
}) => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [termOfConditions, setTermOfConditions] = useState<TermOfConditions>(new TermOfConditions())
  useEffect(()=>{
    (async () => {
     const getTerms = await GetTermOfConditions()
     const newTerm = new TermOfConditions()
    newTerm.id = getTerms.id
    newTerm.isValid = getTerms.isValid
    newTerm.pdfLink = getTerms.pdfLink
    newTerm.aplicationDate = getTerms.aplicationDate
    newTerm.consents = getTerms.consent
    setTermOfConditions(newTerm)
    console.log(getTerms);
    console.log(termOfConditions); 
    })();
    
    
  },[])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // NOTE: Fazer função de fetch para cadastro do usuário
      const createUser = await CreateUser({ isSuperUser, ...signupData });
    } catch (error) {
      console.error(error);
    } finally {
      // NOTE: Configurar a criação da aceitação do termos
      setActiveScreen("login");
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          KeyMaster
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm text-gray-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={signupData.name}
              maxLength={80}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  name: e.target.value,
                })
              }
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  email: e.target.value,
                })
              }
              maxLength={120}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 mt-2 text-gray-300 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={signupData.password}
              maxLength={60}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  password: e.target.value,
                })
              }
              required
            />
          </div>
          <div className="flex w-full items-center justify-center my-4 text-center">
            <span
              className="text-white text-xl align-middle self-center justify-center justify-self-center hover:text-gray-500 hover:cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Termos e condições
            </span>
          </div>

          {termOfConditions.consents!== undefined && termOfConditions.consents.map((consent)=>{
return(
          <Checkbox
            checked={false}
            required={consent.isOptional ? false : true}
            onChange={function(check): void {
              setChecked(check);
            }}
          >
            {consent.content}
          </Checkbox>
)
}
          )}

          <TermsAndCondition isOpen={isOpen}  pdfLink={termOfConditions.pdfLink!== undefined? termOfConditions.pdfLink : ''} setIsOpen={setIsOpen} />
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Cadastrar
          </button>
        </form>
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default Signup;
