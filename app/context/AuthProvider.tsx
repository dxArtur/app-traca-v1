import { UsersDto, userInputSignin } from "@/app/dtos/UserDto";
import api from "@/app/api/apiClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { SignInResponse, SignUpResponse } from "@/app/dtos/SigninResponse";


interface AuthContextData {
    tokenState: string | null;
    user: UsersDto | null;
    isAuthenticated: boolean;
    signIn: (input: userInputSignin) => Promise<SignInResponse>;
    signUp: (input: UsersDto) => Promise<SignUpResponse>; 
    signOut: () => void;

}


export const AuthContext = createContext<AuthContextData | undefined>(undefined);
//export const AuthContext = createContext({} as AuthContextData);


interface AuthProviderProps {
  children: React.ReactNode;
}


export const AuthProviderContext = ({ children }: AuthProviderProps) => {
    //export function AuthProviderContext({ children }: AuthProviderProps) {
      const [tokenState, setTokenState] = useState<string | null>(null);
      const [user, setUser] = useState<UsersDto | null>(null);
      const [loading, setLoading] = useState(true);
      const isAuthenticated = !!user;
    
      useEffect(() => {
        async function loadStoredUser() {
          const storedUser = await AsyncStorage.getItem('@user');
          const token = await AsyncStorage.getItem('@token');
          
          if (storedUser && token) {
            setUser(JSON.parse(storedUser));
            setTokenState(token);
          }
          setLoading(false)
        }
        loadStoredUser();
      }, []);
    


async function signIn(userInput: userInputSignin): Promise<SignInResponse> {
  
    try {
        const response = await api.post('/signin', userInput);
        const { token, userData } = response.data;

        if (!token || !userData) {
            throw new Error('Dados de autenticação inválidos');
        }

        await AsyncStorage.setItem('@user', JSON.stringify(userData));
        await AsyncStorage.setItem('@token', token);

        setTokenState(token);
        setUser(userData);
        return response.data
    } catch (error) {
        console.error(error);
        throw new Error('Erro ao fazer login. Tente novamente mais tarde.');
    }
  }

  async function signUp(userData: UsersDto): Promise<SignUpResponse> {
    try {
      const response = await api.post('/signup', userData);

      const newUser = response.data

      return newUser
    } catch (error: any) {
        console.error('Erro ao se cadastrar:', error);
        throw new Error('Erro ao se cadastrar. Tente novamente mais tarde.');
    }
}

function signOut() {
    AsyncStorage.removeItem('@token');
    AsyncStorage.removeItem('@user');
    setTokenState(null);
    setUser(null);
  }


return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, tokenState, signIn, signUp, signOut }}>
      {!loading && children}
    </AuthContext.Provider>
  );

}