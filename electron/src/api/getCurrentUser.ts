/* eslint-disable @typescript-eslint/no-explicit-any */
// Ivan  Germano: Rota para obter dados sobre o usuário logado.
export async function getCurrentUser(): Promise<{ success: boolean; user?: any; message?: string }> {
    try {
      const response = await fetch('http://localhost:8000/session/current', {
        method: 'GET',
        credentials: 'include', // Inclui cookies de sessão na requisição
      });
  
      if (response.ok) {
        const data = await response.json();
        return { success: true, user: data.user };
      } else {
        const data = await response.json();
        return { success: false, message: data.message || 'Não foi possível obter o usuário atual.' };
      }
    } catch (error) {
      return { success: false, message: 'Oops, algo deu errado ao obter o usuário atual.' };
    }
  }
  