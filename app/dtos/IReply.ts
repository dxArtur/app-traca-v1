export interface Reply {
  id: string;               // ID do reply
    content: string;         // Conteúdo do reply
    createdAt: string;       // Data de criação
    authorId: string;        // ID do autor do reply
    parentId: string;        // ID do reply pai
    likeCount: number;       // Contagem de likes
    replyCount: number;      // Contagem de respostas
    replies: Reply[];        // Respostas aninhadas (caso haja)
}


export interface ReplyResponse {
  id: string; // ID do reply
  content: string; // Conteúdo do reply
  createdAt: string; // Data de criação
  authorId: string; // ID do autor do reply
  parentId: string; // ID do reply pai
  likeCount: number; // Contagem de likes
  replyCount: number; // Contagem de respostas
  replies: ReplyResponse[]; // Respostas aninhadas (caso haja)
}