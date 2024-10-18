import * as bcrypt from 'bcrypt';

// Ivan Germano: Essa função é responsável por gerar a cryptografia das senhas que o usuário vai utilizar.
export async function hashedPassword(password: string): Promise<string> {
    // Ivan Germano: 'saltRounds' é uma variavel que define quantas rodadas de cripritografia vão acontecer.
    const saltRounds = 10;

    // Ivan Germano: A variavel "hashedPassword" é a responsável por armazenar o valor criptografado da senha,
    // passamos os parametros: (<string>, <numero de rodadas>) para que o bcrypt use o método 'hash' para criptografar a string. 
    const hashedPassword = await bcrypt.hash(password, saltRounds); 
    return hashedPassword;
}