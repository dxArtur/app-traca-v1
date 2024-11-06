import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Publication } from '../dtos/IPublication';
import { PublicationCreationDTO } from '../dtos/PublicationDto';
import { getPublications, newPublication } from '../api/apiPublications';
import { commentInPublication, getComments, getReplies, replyInComment } from '../api/apiComments';
import { Comments } from '../dtos/IComment';
import { likeComment, likePublication } from '../api/apiLike';
/* import { getIssues, updateIssue, createIssues, getAuthorIssue } from '@/src/api/issues';
import { Issue } from '@/src/dtos/IssueDTO';
import { useAuth } from '@/src/app/hooks/useAuth';
import { getMyIssues } from '@/src/api/apiUser';
 */

type PublicationsContextData = {
  replies: Comments[];
  comments: Comments[];
  publications: Publication[];
  myPublications: Publication[];
  loadPublications: () => Promise<void>;
  markAsLikePublication: (parentId: string, author: string) => Promise<void>;
  markAsLikeComment: (parentId:string, commentId: string, author: string) => Promise<void>;
  loadComments: (parentId: string) => Promise<void>;
  loadReplies: (parentId: string) => Promise<void>;
  verifyIfILiked: (usersWhoLiked: string[]) =>Promise<boolean>;
  commentPublication: (parentId: string, authorId: string, content: string) => Promise<void>
  replyComment: (parentId: string, commentId: string, authorId: string, content: string) => Promise<void>
  createPublication: (content: string, authorId: string) => Promise<void>
  //loadMyPublications: () => Promise<void>;
  //createNewPublication: (publicationData: Partial<PublicationCreationDTO>) => Promise<void>;
  //updateExistingPublication: (publicationData: PublicationCreationDTO) => Promise<void>;
  //getAuthorName: (authorId: string) => Promise<string>;
};

export const PublicationsContext = createContext<PublicationsContextData | undefined>(undefined);

type PublicationsProviderProps = {
  children: ReactNode;
};

export const PublicationsProviderContext = ({ children }: PublicationsProviderProps) => {
  const { user } = useAuth();
  const [publications, setPublications] = useState<Publication[]>([]);
  const [myPublications, setMyPublications] = useState<Publication[]>([]);
  const [replies, setReplies] = useState<Comments[]>([]);
  const [comments, setComments] = useState<Comments[]>([]);

  // Carrega todas as issues
  const loadPublications = async () => {
    try {
      const allPublications = await getPublications();
      setPublications(allPublications);
    } catch (error) {
      console.error('Erro ao carregar publicações:', error);
    }
  };

  //carrega todas as respostas
  const loadReplies = async (parentId: string) => {
    try {
        const replies = await getReplies(parentId);
        setReplies(replies);
    } catch (error) {
        console.error('Error loading replies:', error);
    }
  }

  //carrega todos os comentarios
  const loadComments = async (parentId: string) => {
    try {
      const comments = await getComments(parentId);
      setComments(comments);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  }

  const markAsLikePublication = async (parentID: string, author: string) => {
    try {
      await likePublication(parentID, author)
      await loadPublications()
    } catch (error) {
      console.error('Error in like:', error);
    }
  }

  const markAsLikeComment = async (parentId: string, commentId: string, author: string) => {
    try {
      await likeComment(commentId, author)
      //const comments = await getReplies(parentId);
      await loadComments(parentId)
    } catch (error) {
      console.error('Error in like:', error);
    }
  }

  const verifyIfILiked = async (usersWhoLiked: string[])=>{
    try {
      const likedSet = new Set(usersWhoLiked)
      return likedSet.has(user?.id!)
    } catch (error) {
      console.error(error)
      return false
    }
  }

  const commentPublication = async (parentId: string, authorId: string, content: string) => {
    try {
      await commentInPublication(parentId, authorId, content)
      await loadPublications()
    } catch (error) {
      console.log(error)
    }
  }

  const replyComment = async (parentId: string, commentId: string, authorId: string, content: string) => {
    try {
      await replyInComment(commentId, authorId, content)
      await loadComments(parentId)
    } catch (error) {
      console.log(error)
    }
  }


  const createPublication = async(content: string, authorId: string) => {
    try {
      await newPublication(content, authorId)
    } catch (error) {
      console.log(error)
    }
  }

  // Carrega as issues do usuário
  /* const loadMyPublications = async () => {
    try {
      if (user?.id) {
        const myIssuesResponse = await getMyPublications(user.id);
        
        // Verifica se myIssuesResponse é uma matriz
        if (Array.isArray(myIssuesResponse)) {
            setMyPublications(myIssuesResponse.filter((issue: Issue) => issue !== undefined) as Issue[]);
        } else {
          // Se não for uma matriz, define como uma matriz vazia
          setMyPublications([]);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar minhas issues:', error);
    }
  }; */
  

  // Cria uma nova issue
/*   const createNewPublication = async (publicationData: Partial<PublicationCreationDTO>) => {
    try {
      await createPublications(publicationData);  // Agora a função createIssues aceita issueData como argumento
      await loadPublications(); // Atualiza a lista de issues após criar uma nova
    } catch (error) {
      console.error('Erro ao criar publicação:', error);
    }
  }; */

  // Atualiza uma issue existente
/*   const updateExistingPublication = async (issueData: Issue) => {
    try {
      await updateIssue(issueData);
      await loadIssues(); // Atualiza a lista de issues após a atualização
    } catch (error) {
      console.error('Erro ao atualizar a issue:', error);
    }
  }; */

/*   // Obtém o nome do autor de uma issue
  const getAuthorName = async (authorId: string) => {
    try {
      return await getAuthorIssue(authorId);
    } catch (error) {
      console.error('Erro ao buscar o autor da issue:', error);
      throw error;
    }
  }; */

  useEffect(() => {
    loadPublications();
    //loadMyPublications();
  }, []);

  return (
    <PublicationsContext.Provider
      value={{
        replies,
        comments,
        publications,
        myPublications,
        loadPublications,
        loadComments,
        loadReplies,
        verifyIfILiked,
        markAsLikePublication,
        markAsLikeComment,
        commentPublication,
        replyComment,
        createPublication,
        //loadMyPublications,
        //createNewPublication,
        //updateExistingPublication,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
};

// Hook customizado para acessar o contexto de Publicações
export const usePublications = () => {
  const context = useContext(PublicationsContext);
  if (!context) {
    throw new Error('usePublications deve ser usado dentro de um PublicatuionsProvider');
  }
  return context;
};

