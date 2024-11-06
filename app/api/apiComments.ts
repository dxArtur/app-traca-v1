import axios from "axios"
import api from "./apiClient"
import { Comments } from "../dtos/IComment"
import { Reply, ReplyResponse } from "../dtos/IReply"


export const getComments = async(publicationId: string): Promise<Comments[]> => {
    try {
        const response = await api.get(`/comments/${publicationId}`)
        if (response.status !== 200) {
            throw new Error(`erro ao buscar `)
        }

        /* const comments = response.data.map((comment: any) => ({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            authorId: comment.authorId,
            postId: comment.postId,
            parentId: comment.parentId,
            replies: comment.replies || [] // Garante que seja um array
        })); */

        //console.log('comments', comments)
        
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const getReplies = async(parentId: string): Promise<Comments[]> => {
    try {
        const response = await api.get(`/reply/${parentId}`)
        if (response.status !== 200) {
            throw new Error(`erro ao buscar `)
        }

        /* const replies = response.data.map((comment: any) => ({
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            authorId: comment.authorId,
            postId: comment.postId,
            parentId: comment.parentId,
            replies: comment.replies || [] // Garante que seja um array
        }));

        console.log('comments', comments) */
        //console.log(response)
        const data = await response.data
        return data
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const commentInPublication = async(publicationId: string, authorId: string, content: string) => {
    try {
        const response = await api.post(`/comments/${publicationId}`, { authorId, content})
        if (response.status !== 201) {
            throw new Error(`erro ao comentar `)
        }
        
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const replyInComment = async(commentId: string, authorId: string, content: string) => {
    try {
        const response = await api.post(`/reply/${commentId}`, { authorId, content})
        if (response.status !== 201) {
            throw new Error(`erro ao comentar `)
        }
        
        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}