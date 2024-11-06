import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, Pressable } from 'react-native';

interface BookListProps {
    books: Book[]; // Array de livros
    onSelectBook: (book: Book) => void; // Função chamada ao selecionar um livro
}

const BookList:React.FC<BookListProps> =  ({ books, onSelectBook }) => {
  const renderItem = ({ item }: {item: Book}) => (
    <Pressable style={styles.book} onPress={() => onSelectBook(item)}>
      <View style={styles.itemContainer}>
        {/* <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} /> */}
        <Text style={styles.title}>{item.name}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
        <Text style={styles.description}>Os livros que você adicionou</Text>
        <FlatList
        //style={}
        data={books}
        renderItem={renderItem}
        keyExtractor={item => item.uri} // Assumindo que cada livro tem um ID único
        numColumns={2} // Número de colunas na grade
        columnWrapperStyle={styles.row} // Estilização das linhas
        />
    </View>
  );
};


const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '90%', // Ocupa 80% da largura da tela
        alignSelf: 'center', // Centraliza o FlatList horizontalmente
    },
    row: {
        justifyContent: 'space-between', // Espaçamento entre as colunas
    },
    itemContainer: {
        borderColor: '#ccc',
        borderRadius: 5,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    thumbnail: {
        width: 80, // Largura da miniatura
        height: 120, // Altura da miniatura
        borderRadius: 5, // Bordas arredondadas
    },
    title: {
        margin: 4,
        textAlign: 'center',
        fontSize: 14,
        color: '#6b7290'
    },
    description: {
        margin: 4,
        textAlign: 'left',
        fontSize: 14,
        color: '#6b7290'
    },
    book: {
        width: '45%',
        margin: 4,
        alignItems: 'center'
    }
});

export default BookList;