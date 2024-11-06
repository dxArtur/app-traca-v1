import React, { useEffect, useState } from 'react';
import { Text, Button, FlatList, SafeAreaView, Pressable, StyleSheet, View } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import BookList from '@/app/components/list/BookList';
import { useNavigation } from '@react-navigation/native';
import { loadFilesFromStorage, saveFilesToStorage } from '@/app/service/asyncStorage';

export default function App() {
  const [files, setFiles] = useState<Book[]>([])
  const navigation = useNavigation()

  useEffect(() => {
    const loadFiles = async () => {
      const storedFiles = await loadFilesFromStorage();
      setFiles(storedFiles);
    };

    loadFiles();
  }, [])

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'application/epub+zip'], // Pode ser ajustado para tipos específicos
      copyToCacheDirectory: true,
    });

    console.log("Resultado do Document Picker:", result)

    if (!result.canceled) {
        const file = result.assets[0]
        console.log('file', file)
        
        // Verificar se o arquivo já foi adicionado
        const isFileAlreadyAdded = files.some(existingFile => existingFile.uri === file.uri)
        if (!isFileAlreadyAdded) {
          setFiles(prev => {
            const newFiles = [...prev, file];
            saveFilesToStorage(newFiles); // Salvar arquivos no AsyncStorage
            return newFiles;
          })
        } else {
          alert('Este arquivo já está na biblioteca!');
        }
      }
  };

  const openFile = (book: Book) => {
    navigation.navigate('EpubReader', { book })
  };

  console.log(files)

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <View style={styles.greetinsContainer}>
                <Text style={styles.title}>Essa é sua biblioteca</Text>
                {/* <Text style={styles.subtitle}>Adicione os livros que esta lendo</Text> */}

            </View>
            <Button title="+" onPress={pickDocument} />
        </View>
        <BookList 
            books={files}
            onSelectBook={openFile}
        />

      {/* <FlatList
        data={files}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <Pressable onPress={() => openFile(item.uri)}>
            <Text>{item.name}</Text>
          </Pressable>
        )}
      /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        gap:10,
        flexDirection:'column',
      flex: 1,
      
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
    },
    header: {
        marginVertical:32,
        paddingHorizontal:28,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    greetinsContainer:{
        alignItems:'flex-start'
    },
    title:{
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color:'#003366'
    },
    subtitle: {
        fontSize: 12,
        textAlign: 'center',
        color: '#6b7280',
        marginBottom: 8,
      }
})
