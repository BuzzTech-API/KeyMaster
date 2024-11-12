

export async function deleteUser(userId: number): Promise<{ success: boolean; message?: string }>{

    try {
        const response = await fetch(`http://localhost:8000/user/${userId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });

        if (response.ok) {
            return { success: true, message: 'User Deleted successfully.' };
        } else {
            const data = await response.json();
            return { success: false, message: data.message || 'Failed to Delete user.' };
        }
    } catch (error) {
        return { success: false, message: 'Oops, something went wrong while Deleting the user.' };
    }
}