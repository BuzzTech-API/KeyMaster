import { BACKEND_URL } from "../constants";

export default async function CreateConsent(body: {
  content: string;
  isOptional: boolean;
  termOfCondition_id: number;
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
