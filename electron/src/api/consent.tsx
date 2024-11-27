import { BACKEND_URL } from "../constants";

export default async function CreateConsent(body: {
  content: string;
  isOptional: boolean;
  termOfCondition_id: number;
}) {
  try {
    const request = await fetch(BACKEND_URL + "consent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include', // Inclui cookies de sessão na requisição
      body: JSON.stringify(body),
    });

    return request;
  } catch (error) {
    console.error(error);
  }
}
