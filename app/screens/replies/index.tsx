// RepliesScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/@types/navigation';
import { usePublications } from '@/app/context/PublicationsProvider';
import CommentList from '@/app/components/comments/CommentsList';
import { Colors } from '@/app/styles/colors';
import PublicationItem from '@/app/components/publication/PublicationItem';
import { Publication } from '@/app/dtos/IPublication';



const RepliesScreen: React.FC = () => {
    const route = useRoute<RouteProp<RootStackParamList, 'Replies'>>()
    const { parentId, parentData } = route.params
    const {replies, loadReplies} = usePublications()


    useEffect(()=>{
        loadReplies(parentId);
    }, [parentId])

    

    const publicationData = {
        id: parentData.id,
        content: parentData.content,
        createdAt: parentData.createdAt,
        updatedAt: parentData.updatedAt || parentData.createdAt, // Usa createdAt se updatedAt não existir
        authorId: parentData.authorId,
        author: parentData.author, // Assegure-se de que o author está presente
        likesCount: parentData.likeCount,
        commentCount: replies.length, // Ajusta conforme necessário
        userIdsWhoLiked: parentData.userIdsWhoLiked,
    };


    return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                <Text style={styles.title}>Veja as respostas</Text>
                <PublicationItem
                    showStatsOverview={false}
                    typeContent='comment'
                    publication={publicationData}
                />
                <CommentList
                    comments={replies}
                />
                </ScrollView>
            </SafeAreaView>
        )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        gap:10,
    },
    title:{
        marginTop:8,
        marginLeft:6,
        color:Colors.secondary,
        fontWeight:'bold',
        fontSize:24
      },
    replyContainer: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    replyAuthor: {
        fontWeight: 'bold',
    },
    replyContent: {
        marginTop: 5,
    },
});

export default RepliesScreen