import { UsersDto } from "./UserDto";

export interface SignInResponse {
    token: string;
    userData: UsersDto;
}

export interface SignUpResponse {
    newUser: UsersDto
}