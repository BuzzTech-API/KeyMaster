import { BACKEND_URL } from "../constants";

export default async function CreateUser(body: {
  name: string;
  password: string;
  email: string;
  isSuperUser: boolean;
}) {
  try {
    const request = await fetch(BACKEND_URL + "user", {
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
