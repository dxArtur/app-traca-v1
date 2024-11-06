import { Publication } from '@/app/dtos/IPublication';
import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, Pressable, KeyboardAvoidingView } from 'react-native';
import PublicationItem from '../publication/PublicationItem';

interface PublicationListProps {
    publications: Publication[];
    onSelectPublication: (publications: Publication) => void;
    type: "publication"|"comment"
}

const PublicationList:React.FC<PublicationListProps> =  ({ publications, onSelectPublication, type }) => {
  const renderItem = ({ item }: {item: Publication}) => (
    <Pressable style={{}} onPress={() => onSelectPublication(item)}>
      <PublicationItem
        typeContent={type}
        publication={item}
      />
    </Pressable>
  );

  return (
    <KeyboardAvoidingView  style={styles.container} behavior='height'>
        <FlatList
        data={publications}
        renderItem={renderItem}
        keyExtractor={item => item.id} // Assumindo que cada livro tem um ID único
        />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({

  container: {
    paddingBottom:80
  }
})

export default PublicationList