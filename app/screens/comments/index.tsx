import { getComments } from '@/app/api/apiComments';
import CommentsList from '@/app/components/comments/CommentsList';
import { Comments } from '@/app/dtos/IComment';
import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/@types/navigation';
import PublicationItem from '@/app/components/publication/PublicationItem';
import { usePublications } from '@/app/context/PublicationsProvider';
import { useAuth } from '@/app/hooks/useAuth';



/* interface CommentsPageProps {
  route: RouteProp<RootStackParamList, 'Comments'>;
  //navigation: StackNavigationProp<RootStackParamList, 'Comments'>;
} */

const CommentsPage: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Comments'>>() // Obtém o ID da publicação
  const { publicationId, publicationData } = route.params
  const {comments, loadComments} = usePublications();

  useEffect(() => {
    loadComments(publicationId);
  }, [publicationId])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
      <Text style={styles.title}>Veja os comentários</Text>
        <PublicationItem
        showStatsOverview={false}
          typeContent='publication'
          publication={publicationData}
        />
        <CommentsList
          comments={comments}
        />
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    
  },
  scrollContainer: {
    width:'90%',
  },
  title: {
    paddingTop: 24,
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CommentsPage;
