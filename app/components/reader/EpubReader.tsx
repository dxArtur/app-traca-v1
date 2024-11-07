import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, SafeAreaView, Button, Alert } from 'react-native';
import { Reader, ReaderProvider, Section  } from '@epubjs-react-native/core';
import { useFileSystem } from '@epubjs-react-native/expo-file-system';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Location } from '@epubjs-react-native/core';
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
  /* a: {
    color: '#fff'
  } */
};

const lightTheme = {
  body: {
      background: '#fff',
      color: '#000',
  },
 /*  a: {
    color: '#fff'
  } */
};


const EpubReader: React.FC = () => {
  const route = useRoute()
  const { book } = route.params as { book: Book }
  const [theme, setTheme] = useState(darkTheme)
  const navigation = useNavigation()
  const fileUri = book.uri

  //const [currentLocation, setCurrentLocation] = useState<string | null>(null);
  const [bookLocation, setBookLocation] = useState<string | null>(null);

  const loadPosition = async () => {
    try {
      const savedLocation = await AsyncStorage.getItem('bookLocation');
      if (savedLocation) {
        setBookLocation(savedLocation);
      }
    } catch (error) {
      console.error('Erro ao carregar a posição do livro', error);
    }
  };

  const saveLocation = async (cfi: string) => {
    try {
      await AsyncStorage.setItem('bookLocation', cfi);
    } catch (error) {
      console.error('Erro ao salvar a posição do livro', error);
    }
  };

  // Atualiza a posição do livro a cada mudança de página
  const onLocationChanged = (totalLocations: number, currentLocation: Location, progress: number, currentSection: Section | null) => {
    const cfi = currentLocation.start.cfi; // Extrair o CFI da localização atual
    setBookLocation(cfi);
    saveLocation(cfi); // Salvar a nova posição
  }


  useEffect(() => {
    loadPosition();
  }, []);
  

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
          onLocationChange={onLocationChanged}
          initialLocation={bookLocation!}
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