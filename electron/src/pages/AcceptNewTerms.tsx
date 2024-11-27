import React, { useEffect, useState } from "react";
import Checkbox from "../components/checkbox";
import TermsAndCondition from "../components/termsAndCondition";
import { TermOfConditions } from "../types/termOfConditions";
import Condition from "../types/condition";
import { createUserHasConsent } from "../api/user_has_consent";
import { useUser } from "../context/UserContext";
import { useTerms } from "../context/TermsContext";

interface AcceptNewTermsProps {
  termOfConditions: TermOfConditions
}

const AcceptNewTerms: React.FC<AcceptNewTermsProps> = ({
  termOfConditions
}) => {
  const { user } = useUser()
  const { revalidateTerms } = useTerms()
  const [errorMessage, setErrorMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [conditions, setConditions] = useState<Condition[]>(termOfConditions.consents.map((consent)=>{
    return new Condition(consent)
  }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const requestsConsents = conditions.map((condition)=>{
        return createUserHasConsent({
          user_id: user.id,
          consent_id: condition.consentimento.id,
          isAccept: condition.checked
        })
      })
      await Promise.all(requestsConsents)
    } catch (error) {
      console.error(error);
    } finally {
      await revalidateTerms()
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex flex-row items-center justify-center gap-6 mb-8">
          <h2 className="text-3xl font-bold text-white text-center">
            KeyMaster
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex w-full items-center justify-center my-4 text-center">
            <span
              className="text-white text-xl align-middle self-center justify-center justify-self-center hover:text-gray-500 hover:cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Termos e condições
            </span>
          </div>

          {conditions!== undefined && conditions.map((condition, index)=>{
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
          }
          )}

          <TermsAndCondition isOpen={isOpen}  pdfLink={termOfConditions.pdfLink!== undefined? termOfConditions.pdfLink : ''} setIsOpen={setIsOpen} />
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Aceitar termos
          </button>
        </form>
        {errorMessage && (
          <div className="mt-4 text-red-500 text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default AcceptNewTerms;
