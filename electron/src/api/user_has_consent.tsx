import { BACKEND_URL } from "../constants";

export async function createUserHasConsent(body: {
  user_id: number;
  consent_id: number;
  isAccept: boolean
}) {
  try {
    const request = await fetch(BACKEND_URL + "user-has-consent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return request;
  } catch (error) {
    console.error(error);
  }
}


export async function getUserHasConsent(
  user_id: number
) {
  try {
    const request = await fetch(BACKEND_URL + "user/user-has-consent/"+user_id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include', // Inclui cookies de sessão na requisição
    });

    return request;
  } catch (error) {
    console.error(error);
  }
}


export async function updateUserHasConsent(
  user_id: number,
  consent_id: number,
  isAceito: boolean
) {
  try {
  
    const request = await fetch(BACKEND_URL + `consent-update/${user_id}/consentimentos/${consent_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include', // Inclui cookies de sessão na requisição
      body:JSON.stringify({isAceito})
    });

    return request;
  } catch (error) {
    console.error(error);
  }
}
