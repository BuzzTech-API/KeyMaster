import Consentimento from "../types/consentimento";
import { TermOfConditions } from "../types/termOfConditions";


export type UserConsent = {
  user_id: number;
  consent_id: number;
  isAccept: boolean;
  consent: Consentimento;
};

export function validateUserConsent(
  userConsentList: UserConsent[],
  termsOfCondition: TermOfConditions
): { allConsentsValid: boolean; hasUnacceptedMandatory: boolean } {
  const termConsents = termsOfCondition.consents;

  // Verificar se todos os consentimentos obrigatórios estão aceitos
  const hasUnacceptedMandatory = termConsents.some(
    (consent) =>
      !consent.isOptional && // É obrigatório
        !userConsentList.some(
          (userConsent) =>
            userConsent.consent_id === consent.id && userConsent.isAccept
        )
  );

  // Verificar se todos os consentimentos (apenas os obrigatórios precisam ser aceitos) estão presentes
  const allConsentsValid = !hasUnacceptedMandatory;  
  return {
    allConsentsValid,
    hasUnacceptedMandatory,
  };
}

