export interface LoginResponse {
    success: boolean;
    message?: string;
  }

export async function login(email: string, password: string): Promise<LoginResponse> {
    try {
        // Ivan Germano: Log para verificar os dados que estão sendo enviados ao backend.
        console.log('Tentando fazer login com:', { email, password }); 
        const response = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      // Ivan Germano: Log com a resposta Bruta, para debug.
      console.log('Resposta do backend:', response);
  
      if (response.ok) {
        console.log('Login bem-sucedido');
        return { success: true };
      } else {
        const data = await response.json();
        // Ivan Germano: Log com erros ao logar, server side - backend.
        console.log('Erro do backend:', data); 
        return { success: false, message: data.message || 'Login Falhou. Tente novamente!.' };
      }
    } catch (error) {
      // Ivan Germano: Log com erros de conexão/requisição.
      console.log('Erro na requisição:', error); 
      return { success: false, message: 'Oops algo deu errado, tente novamente!' };
    }
  }