export interface UpdateUserDto {
    name?: string;
    email?: string;
    password?: string;
  }

export interface User {
  id: number;
  isSuperUser: boolean;
  email: string;
  name: string;
  password: string;
}
