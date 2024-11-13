import { BACKEND_URL } from "../constants";

export default async function CreateTermOfConditions(body: {
  pdfLink: string;
}) {
  try {
    const request = await fetch(BACKEND_URL + "term-of-condition", {
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
