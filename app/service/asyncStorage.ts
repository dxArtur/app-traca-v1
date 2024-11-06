import AsyncStorage from '@react-native-async-storage/async-storage';

const FILES_KEY = '@files';

// Função para salvar os arquivos no AsyncStorage
export const saveFilesToStorage = async (files: Book[]) => {
  try {
    const jsonValue = JSON.stringify(files);
    await AsyncStorage.setItem(FILES_KEY, jsonValue);
  } catch (e) {
    console.error('Erro ao salvar os arquivos:', e);
  }
};

// Função para recuperar os arquivos do AsyncStorage
export const loadFilesFromStorage = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(FILES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Erro ao carregar os arquivos:', e);
    return [];
  }
}