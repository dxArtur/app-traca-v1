import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text, Alert } from 'react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReadScreen: React.FC = () => {
  const [epubs, setEpubs] = useState([]);

  const importEpub = async () => {
    try {
      const result = await DocumentPicker.pick({
        types: [DocumentPicker.types.allFiles], // Você pode restringir para EPUBs se quiser
      });
      
      const filePath = result.uri;
      const fileName = result.name;

      // Salva o EPUB em um diretório específico
      const destinationPath = `${RNFS.DocumentDirectoryPath}/epubs/${fileName}`;
      await RNFS.mkdir(`${RNFS.DocumentDirectoryPath}/epubs`);
      await RNFS.moveFile(filePath, destinationPath);

      // Atualiza a lista de EPUBs
      await saveEpubMetadata(destinationPath, fileName);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        // Usuário cancelou
      } else {
        Alert.alert("Erro", error.message);
      }
    }
  };

  const saveEpubMetadata = async (filePath, fileName) => {
    const newEpub = { name: fileName, path: filePath };
    const storedEpubs = await AsyncStorage.getItem('epubs');
    const epubList = storedEpubs ? JSON.parse(storedEpubs) : [];
    
    epubList.push(newEpub);
    await AsyncStorage.setItem('epubs', JSON.stringify(epubList));
    setEpubs(epubList);
  };

  const loadEpubs = async () => {
    const storedEpubs = await AsyncStorage.getItem('epubs');
    if (storedEpubs) {
      setEpubs(JSON.parse(storedEpubs));
    }
  };

  useEffect(() => {
    loadEpubs();
  }, []);

  return (
    <View>
      <Button title="Importar EPUB" onPress={importEpub} />
      <FlatList
        data={epubs}
        keyExtractor={(item) => item.path}
        renderItem={({ item }) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
};

export default ReadScreen;
