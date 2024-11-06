import React, { createContext, useState, ReactNode, useEffect } from 'react';
import api from '@/app/api/apiClient';
import { Alert } from 'react-native';
import { Reply, ReplyResponse } from '@/app/dtos/IReply'; // Supondo que você tenha um DTO para Replies
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getReplies } from '../api/apiComments';

// Definindo a interface para o contexto
interface ReplyContextData {
  replies: Reply[];
  createReply: (replyData: Reply) => Promise<void>;
  loadReplies: (parentId: string) => Promise<void>;
  updateReply: (replyId: string, updatedData: Partial<Reply>) => Promise<void>;
}

// Criando o contexto
export const ReplyContext = createContext<ReplyContextData>({} as ReplyContextData);

// Criando o provider do contexto
export const ReplyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [replies, setReplies] = useState<Reply[]>([]);

  // Função para carregar os replies da API
  const loadReplies = async (parentId: string): Promise<void> => {
    try {
        const replies = await getReplies(parentId);
        console.log('Fetched replies:', replies);
        setReplies(replies);
    } catch (error) {
        console.error('Error loading replies:', error);
    }
};

  // Função para criar um novo reply
  const createReply = async (replyData: Reply) => {
    try {
      const response = await api.post('/reply/new', replyData);
      setReplies([...replies, response.data]); // Adicionar novo reply ao estado
      Alert.alert('Sucesso', 'Reply criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar reply:', error);
      Alert.alert('Erro', 'Não foi possível criar o reply.');
    }
  };

  // Função para atualizar um reply
  const updateReply = async (replyId: string, updatedData: Partial<Reply>) => {
    try {
      const token = await AsyncStorage.getItem('@token'); // Recupera o token do AsyncStorage
      if (!token) throw new Error("Token não encontrado");

      const response = await api.put(`/reply/${replyId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho da requisição
        },
      });

      const updatedReplies = replies.map((reply) =>
        reply.id === replyId ? { ...reply, ...response.data } : reply
      );
      setReplies(updatedReplies);
    } catch (error) {
      console.error('Erro ao atualizar reply:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o reply.');
    }
  };

  return (
    <ReplyContext.Provider value={{ replies, createReply, loadReplies, updateReply }}>
      {children}
    </ReplyContext.Provider>
  );
};