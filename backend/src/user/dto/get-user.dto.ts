import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class GetUserDTO{
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    // Ivan Germano: Adiciona o campo de ADM conforme criado no Banco de Dados.
    @IsBoolean()
    @IsNotEmpty()
    isSuperUser: boolean;
}
