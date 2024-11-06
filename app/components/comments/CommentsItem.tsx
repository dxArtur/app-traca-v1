import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import HeaderComment from '../headers/HeaderComment';
import { Comments } from '@/app/dtos/IComment';
import { useTimeAgo } from '@/app/hooks/useTimeAgo';
import { Colors } from '@/app/styles/colors';
import { useNavigation } from '@react-navigation/native';
import PublicationStatsOverview from '@/app/components/overview/PublicationStatsOverview';
import { usePublications } from '@/app/context/PublicationsProvider';
import { useAuth } from '@/app/hooks/useAuth';

interface CommentItemProps {
    comment: Comments;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
    const { markAsLikeComment } = usePublications();
    const { user } = useAuth();
    const navigation = useNavigation();
    const [liked, setLiked] = useState(comment.userIdsWhoLiked.includes(user?.id!));
    const [currentLikeCount, setCurrentLikeCount] = useState(comment.likeCount);

    const handleViewReplies = () => {
        navigation.navigate('Replies', { parentId: comment.id, parentData: comment });
    };

    const pressLikeInComment = () => {
        markAsLikeComment(comment.postId, comment.id, user?.id!)
        setLiked(!liked)
        setCurrentLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1))
    }


    useEffect(() => {
        setLiked(comment.userIdsWhoLiked.includes(user?.id!));
    }, [comment.userIdsWhoLiked, user?.id, comment.likeCount]);

    return (
        <View style={styles.container}>
            <HeaderComment
                userName={comment.author.name}
                userNick={comment.author.nick}
            />
            <View style={styles.contentContainer}>
                <Text style={styles.commentContent}>{comment.content}</Text>
                <Text style={styles.timeAgo}>{useTimeAgo(comment.createdAt)}</Text>
            </View>
            <PublicationStatsOverview
                style={{}}
                id={comment.id}
                parentId={comment.postId}
                typeContent="comment"
                userIdsWhoLiked={comment.userIdsWhoLiked}
                onPressLike={pressLikeInComment}
                commentCount={comment.replies.length}
                likeCount={currentLikeCount}
                liked={liked}
                onPressComment={handleViewReplies}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
        marginLeft: 15,
        width: '100%',
        gap:10,
    },
    contentContainer: {
        borderBottomWidth: 1,
        borderColor: Colors.border,
        paddingBottom: 10,
        paddingLeft: 15,
    },
    commentContent: {
        fontSize: 16,
        color: '#333',
        textAlign: 'justify',
    },
    timeAgo: {
        fontStyle: 'italic',
        textAlign: 'right',
        paddingRight: 10,
        color: 'gray',
    },
});

export default CommentItem;
