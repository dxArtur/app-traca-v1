import { Comments } from '@/app/dtos/IComment';
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/app/styles/colors';
import HeaderComment from '../headers/HeaderComment';
import CommentItem from './CommentsItem';
import { useAuth } from '@/app/hooks/useAuth';
import { usePublications } from '@/app/context/PublicationsProvider';

interface CommentListProps {
    comments: Comments[];
    //pressLike: (commentId: string)=> void;
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {

    return (
        <View style={styles.container}>
            <View style={styles.sideLine} />
            {comments.map((comment) => (
                <CommentItem
                    key={comment.id} 
                    comment={comment} 
            />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    commentContainer: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        marginLeft:15
    },
    commentContent: {
        fontSize: 16,
        color: '#333',
    },
    commentRow: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Alinha os itens ao topo
        marginBottom: 10, // Espaçamento entre os comentários
    },
    viewRepliesText: {
        color: 'blue',
        marginTop: 5,
        textDecorationLine: 'underline',
    },
    sideLine: {
        position: 'absolute',
        width: 4, // Largura da linha
        backgroundColor: Colors.tertiary, //'#007bff', // Cor da linha
        marginRight: 10, // Espaço entre a linha e o comentário
        height: '100%', // Altura da linha (pode ser ajustada conforme necessário)
    },
});

export default CommentList;



