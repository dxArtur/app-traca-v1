import axios from "axios"
import { UsersDto } from "../dtos/UserDto"
import api from "./apiClient"


export const searchUsers = async(query:string): Promise<UsersDto[]> => {
    try {
        const response = await api.get(`/search/${query}`)
        if (response.status !== 200) {
            throw new Error(`erro ao buscar ${query}`)
        }

        return response.data
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const checkNickAvailability = async(query: string): Promise<boolean>=> {
    try {
        const response = await api.get(`/user/${query}`)
        return false
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
                return true
            }
        }
        console.log("Erro ao verificar a disponibilidade do usuário:", error);
        return true
    }
}