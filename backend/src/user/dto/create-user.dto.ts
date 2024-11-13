import { IsString, IsNotEmpty, MinLength, IsBoolean } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    password: string;

    // Ivan Germano: Adiciona o campo de ADM conforme criado no Banco de Dados.
    @IsBoolean()
    @IsNotEmpty()
    isSuperUser: boolean;
}
