import React, { createContext, useContext, useEffect, useState } from "react";
import { GetTermOfConditions } from "../api/term-of-conditions";
import { getUserHasConsent } from "../api/user_has_consent"; // API para atualizar consentimentos
import { validateUserConsent, UserConsent } from "../functions/validateUserConsent";
import { TermOfConditions } from "../types/termOfConditions";
import { useUser } from "./UserContext";

interface TermContextProps {
  termOfConditions: TermOfConditions | null;
  userHasConsent: UserConsent[];
  allConsentsValid: boolean;
  hasUnacceptedMandatory: boolean;
  revalidateTerms: () => Promise<void>; // Nova função para revalidar os termos
}

// Criação do contexto
const TermContext = createContext<TermContextProps | undefined>(undefined);

export const TermProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const [termOfConditions, setTermOfConditions] = useState<TermOfConditions | null>(null);
  const [userHasConsent, setUserHasConsent] = useState<UserConsent[]>([]);
  const [allConsentsValid, setAllConsentsValid] = useState(false);
  const [hasUnacceptedMandatory, setHasUnacceptedMandatory] = useState(true);

  // Função para buscar e validar os termos e consentimentos
  const fetchAndValidateTerms = async () => {
    try {
      const response = await GetTermOfConditions()

      const getTerms = await response.json()
      console.log(getTerms)
      const newTerm = new TermOfConditions();
      newTerm.id = getTerms.id;
      newTerm.isValid = getTerms.isValid;
      newTerm.pdfLink = getTerms.pdfLink;
      newTerm.aplicationDate = getTerms.aplicationDate;
      newTerm.consents = getTerms.consent;

      setTermOfConditions(newTerm);

      if (user) {
        const userHasConsentResponse = await getUserHasConsent(user.id);
        const userHasConsent: UserConsent[] = await userHasConsentResponse.json();
        setUserHasConsent(userHasConsent)

        const validate = validateUserConsent(userHasConsent, newTerm);
        setAllConsentsValid(validate.allConsentsValid);
        setHasUnacceptedMandatory(validate.hasUnacceptedMandatory);
      }
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchAndValidateTerms();
  }, [user]);

  // Função para atualizar os consentimentos do usuário e revalidar os termos
  const revalidateTerms = async () => {
    if (user && termOfConditions) {
      // Revalida os termos
      await fetchAndValidateTerms();
    }
  };

  return (
    <TermContext.Provider
      value={{
        termOfConditions,
        allConsentsValid,
        hasUnacceptedMandatory,
        revalidateTerms,
        userHasConsent,
      }}
    >
      {children}
    </TermContext.Provider>
  );
};

export const useTerms = (): TermContextProps => {
  const context = useContext(TermContext);
  if (!context) {
    throw new Error("useTerms must be used within a TermProvider");
  }
  return context;
};

