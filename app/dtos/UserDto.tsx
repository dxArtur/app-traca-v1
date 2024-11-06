import { Publication } from "./IPublication";

export interface UsersDto {
    id?: string;
    name: string;
    email: string;
    password: string;
    nick:string;
    followers: UsersDto[]
    posts: Publication[]
  }


export interface Author{
  id: string;
  name: string;
  nick:string;
}

export interface userInputSignin {
    email: string;
    password: string;
}

export interface userInputSignup {
  email: string;
  name: string;
  password: string;
  nick:string;
}

export interface Follow {
  id: string; // ID do relacionamento
  followerId: string; // ID do usuário que está seguindo
  followingId: string; // ID do usuário que está sendo seguido
  follower: UsersDto; // Detalhes do seguidor
  following: UsersDto; // Detalhes do seguido
}