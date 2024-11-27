import { BACKEND_URL } from '../constants';
import { UpdateUserDto } from '../interfaces/user.interface'



export async function updateUser(userData: UpdateUserDto, id: number): Promise<{ success: boolean; message?: string }> {

    try {
        const response = await fetch(BACKEND_URL +`user/${String(id)}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            return { success: true, message: 'User updated successfully.' };
        } else {
            const data = await response.json();
            return { success: false, message: data.message || 'Failed to update user.' };
        }
    } catch (error) {
        return { success: false, message: 'Oops, something went wrong while updating the user.' };
    }
}
