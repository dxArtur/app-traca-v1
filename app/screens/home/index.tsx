import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, SafeAreaView } from 'react-native';
import api from '@/app/api/apiClient'; 
import { usePublications } from '@/app/context/PublicationsProvider';
import PublicationList from '@/app/components/list/PublicationList';
import { Colors } from '@/app/styles/colors';

const HomeScreen: React.FC = () => {
  const {publications, loadPublications} = usePublications();
  useEffect(() => {
    loadPublications();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Estão falando sobre</Text>
      <PublicationList
        type='publication'
        publications={publications}
        onSelectPublication={()=> {}}
      />

      {/* <FlatList
         data={posts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Ajuste conforme seu ID
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1} // Distância para carregar mais
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        contentContainerStyle={{ paddingBottom: 20 }} // Para adicionar espaço no final
      />
      {!hasMore && !loading && posts.length > 0 && (
        <TouchableOpacity style={styles.reloadButton} onPress={handleReload}>
          <Text style={styles.reloadButtonText}>Carregar mais posts</Text>
        </TouchableOpacity>
      )} */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title:{
    marginTop:8,
    marginLeft:6,
    color:Colors.secondary,
    fontWeight:'bold',
    fontSize:24
  },
  /* postContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  readButton: {
    marginTop: 8,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  readButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  reloadButton: {
    padding: 15,
    backgroundColor: '#FF5733',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  reloadButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }, */
});

export default HomeScreen;
