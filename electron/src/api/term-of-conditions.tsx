import { BACKEND_URL } from "../constants";

async function CreateTermOfConditions(body: {
  pdfLink: string;
}) {
  try {
    const request = await fetch(BACKEND_URL + "term-of-condition", {
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


export async function GetTermOfConditions() {
  try {
    const request = await fetch(BACKEND_URL + "term-of-condition", {
      method: "get",
    });

    return request
  } catch (error) {
    console.error(error);
  }
}

export default CreateTermOfConditions; GetTermOfConditions;
