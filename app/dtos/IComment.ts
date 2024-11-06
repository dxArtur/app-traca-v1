import { Author, UsersDto } from "./UserDto";

export interface Comments {
    updatedAt?: string;
    id: string;          // ID único do comentário
    content: string;     // Conteúdo do comentário
    createdAt: string;   // Data de criação do comentário (formato ISO 8601)
    authorId: string;
    author: Author;   // ID do autor do comentário
    postId: string;      // ID da publicação à qual o comentário pertence
    parentId: string | null; // ID do comentário pai, se houver (para respostas)
    replies: Comment[];  // Respostas a este comentário
    likeCount: number;
    commentCount: number;
    userIdsWhoLiked: string []
  }