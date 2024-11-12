import { useUser } from "../context/UserContext";
import { Password } from "../interfaces/password.interface";


export async function getUserPasswords(userId: number): Promise<Password[]> {
    try {
        const response = await fetch(`http://localhost:8000/password/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error("Failed to fetch passwords");
        }

        const data: Password[] = await response.json();
        return data; // Ensures data is returned
    } catch (error) {
        console.error("Error fetching passwords:", error);
        return []; // Return an empty array on error to match the return type
    }
}


export async function createPassword(newPassword: Password, userId: number): Promise<Password | null> {

    try {
        const response = await fetch(`http://localhost:8000/password/user/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(newPassword),
        });

        if (!response.ok) {
            throw new Error("Failed to create password");
        }

        const createdPassword: Password = await response.json();
        return createdPassword;
    } catch (error) {
        console.error("Error creating password:", error);
        return null;
    }
}


export async function deleteUserPassword(userId: number): Promise<boolean> {
    try {
        const response = await fetch(`http://localhost:8000/password/${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error("Failed to delete password");
        }

        return true; // Return true if the deletion is successful
    } catch (error) {
        console.error("Error deleting password:", error);
        return false; // Return false on error
    }

}
