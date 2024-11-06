import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Button, Alert } from 'react-native';
import { Reader, ReaderProvider, useReader  } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { useNavigation, useRoute } from '@react-navigation/native';

import TabBarReader from '@/app/components/tabBar';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Book = {
    uri: string;
    mimeType: string;
    name: string;
    size: number;
}



const darkTheme = {
  body: {
      background: '#333',
      color: '#fff',
  },
};

const lightTheme = {
  body: {
      background: '#fff',
      color: '#000',
  },
};


const EpubReader: React.FC = () => {
  const route = useRoute()
  const { book } = route.params as { book: Book }
  const [theme, setTheme] = useState(darkTheme)
  const navigation = useNavigation()
  

  const fileUri = book.uri;
  

  const [currentPage, setCurrentPage] = useState(0)

    // Carregar a posição salva ao abrir o livro
    useEffect(() => {
        const loadSavedLocation = async () => {
            const savedLocation = await AsyncStorage.getItem(`lastLocation:${fileUri}`);
            if (savedLocation) {
                setCurrentPage(parseInt(savedLocation, 10));
            }
        };

        loadSavedLocation();
    }, [fileUri]);

    // Salvar a posição ao mudar de página
    useEffect(() => {
        const saveCurrentLocation = async () => {
            await AsyncStorage.setItem(`lastLocation:${fileUri}`, currentPage.toString());
        };

        saveCurrentLocation();
    }, [currentPage, fileUri])


  if (!book) {
    return (
      <View style={[styles.container,  { backgroundColor: theme.body.background }]}>
        <Text >Nenhum livro foi passado!</Text>
      </View>
    );
  }

  const handleGoBack = () => {
    navigation.navigate('ler')
  } 

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === darkTheme ? lightTheme : darkTheme))
  };

  return (
    <SafeAreaView style={[styles.container,  { backgroundColor: theme.body.background }]}>
      <ReaderProvider>
        <Reader
          fileSystem={useFileSystem}
          src={fileUri}
          defaultTheme={theme}
          
        />
        <TabBarReader goBack={handleGoBack} toggleTheme={toggleTheme} currentTheme={theme}/>
      </ReaderProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:24,
    //backgroundColor: '#fff',
  },
  epub: {
    flex: 1,
  },
});

export default EpubReader;