// Ivan Germano: DTO responsável por padronizar os dados a serem validados no login.
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginUserDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}