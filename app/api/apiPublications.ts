import axios from "axios"
import api from "./apiClient"
import { Publication } from "../dtos/IPublication"


export const getPublications = async(): Promise<Publication[]> => {
    try {
        const response = await api.get(`/publication`)
        if (response.status !== 200) {
            throw new Error(`erro ao buscar `)
        }

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const newPublication = async(content: string, authorId: string): Promise<Publication> => {
    try {
        const response = await api.post(`/publication`, {content, authorId})
        console.log(response.data)
        if (response.status !== 201) {
            throw new Error(`erro ao buscar `)
        }

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}