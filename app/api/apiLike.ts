import axios from "axios"
import api from "./apiClient"
import { Publication } from "../dtos/IPublication"


export const likePublication = async(pulbicationId: string, authorId: string): Promise<Publication[]> => {
    try {
        const response = await api.post(`/like/publication/${pulbicationId}`, { authorId })


        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const likeComment = async(commentId: string, authorId: string): Promise<Publication[]> => {
    try {
        const response = await api.post(`/like/comment/${commentId}`, { authorId })

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}






