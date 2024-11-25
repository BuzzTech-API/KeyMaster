// Ivan Germano: Rota responsável pela deleção do usuário, também aciona o trigger da blacklist.
export async function deleteUser(userId: number): Promise<boolean>{
    try {
      const response = await fetch(`http://localhost:8000/user/${userId}`, {
        method: 'DELETE',
        credentials: 'include', // Envia os cookies da sessão para autenticação
      });
  
      if (!response.ok) {
        console.error('Erro ao excluir a conta:', response.statusText);
        return false;
      } else {
        console.log('Conta excluída com sucesso');
        return true;
      }
    } catch (error) {
      console.error('Erro ao excluir a conta:', error);
      return false;
    }
  }
  
  
