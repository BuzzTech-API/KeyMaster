// Ivan  Germano: Rota de Logout.
export async function logout(): Promise<void> {
    try {
      const response = await fetch('http://localhost:8000/session/logout', {
        method: 'POST',
        credentials: 'include', // Ivan Germano: Envia cookies na requisição para autenticar o usuário
      });
  
      if (!response.ok) {
        console.error('Erro ao fazer logout:', response.statusText);
      } else {
        console.log('Logout realizado com sucesso');
      }
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }
  
