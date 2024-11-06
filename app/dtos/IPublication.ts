import { Author } from "./IAuthor";

export interface Publication {
    id: string;
    content: string;
    createdAt: string;  
    updatedAt: string;  
    authorId: string;
    author: Author;
    likesCount: number;    
    commentCount: number;
    userIdsWhoLiked: string[]

}

export interface PublicationComment {
    id: string;
    content: string;
    createdAt: string;  
    updatedAt: string;  
    authorId: string;
    //author?: Author;
    likesCount: number;    
    commentCount: number     
}

