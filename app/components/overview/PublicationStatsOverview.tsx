import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Publication } from '@/app/dtos/IPublication';
import { Colors } from '@/app/styles/colors';
import { usePublications } from '@/app/context/PublicationsProvider';
import { useAuth } from '@/app/hooks/useAuth';

type PublicationStatsOverviewProps = {
    onPressComment: ()=> void;
    likeCount: number;
    commentCount: number;
    userIdsWhoLiked: string[];
    onPressLike: ()=> void;
    liked: boolean
    typeContent: "publication"|"comment"
    id: string
    style: object
    parentId: string
};


const PublicationStatsOverview: React.FC<PublicationStatsOverviewProps> = ({likeCount, commentCount, userIdsWhoLiked, onPressComment, onPressLike, liked, typeContent, id, style, parentId}) => {
    const {user} = useAuth()
    const [reply, setReply] = useState('')
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [activeReplyIndex, setActiveReplyIndex] = useState<number | null>(null)
    const {verifyIfILiked, commentPublication, replyComment} = usePublications()
    const [hasLiked, setHasLiked] = useState(false)

    const handleReplySubmit = () => {
        setReply('')
        if (typeContent === "publication") {
            commentPublication(id, user?.id!, reply)
        } else {
            replyComment(parentId, id, user?.id!, reply)
        }
        setActiveReplyIndex(null); // Oculta o campo após o envio
    }

    const toggleReplyInput = () => {
        setActiveReplyIndex(activeReplyIndex === 0 ? null : 0) // Alterna entre abrir e fechar
    };

    useEffect(() => {
        const verifyLike = async () => {
            const liked = await verifyIfILiked(userIdsWhoLiked);
            setHasLiked(liked);
        };

        verifyLike();
    }, [userIdsWhoLiked])


    //return <Text>{likeCount}, {commentCount}, {onPressComment.name}</Text>
    return(
        <View style={style}>
    <View style={styles.barActions}>
        <Pressable onPress={onPressLike}>
            <View style={styles.rowInfo}><Text >{likeCount}</Text>
            <Ionicons
                name={liked ? "heart" : "heart-outline"} // Altera o ícone baseado no estado
                size={22}
                color={liked ? Colors.tertiary : 'gray'} // Altera a cor baseado no estado
            />
            </View>
        </Pressable>
        <Pressable onPress={onPressComment}>
            <View style={styles.rowInfo}><Text>{commentCount}</Text><Ionicons name="chatbubble-ellipses-outline" size={22} color={'gray'} /></View>
        </Pressable>
        <Pressable onPress={toggleReplyInput}>
            <View style={styles.rowInfo}><Text style={styles.act}>{'Responder'}</Text></View>
        </Pressable>
        </View>
        {activeReplyIndex === 0 && (
            <View style={styles.submitReplyContainer}>
                <TextInput
                    style={styles.input}
                    value={reply}
                    onChangeText={setReply}
                    placeholder="Escreva sua resposta..."
                />
                <Pressable style={styles.submitButtonContainer} onPress={handleReplySubmit}>
                    <Text style={styles.submitButton} >Publicar</Text>
                </Pressable>
            </View>
        )}
        </View>
        /* <View style={styles.barActions}>
            <Pressable>
                <View style={styles.rowInfo}><Text>{likeCount}</Text><Ionicons name="heart-outline" size={22} color={'gray'} /></View>
            </Pressable>
            <Pressable onPress={onPressComment}>
                <View style={styles.rowInfo}><Text>{commentCount}</Text><Ionicons name="chatbubble-ellipses-outline" size={22} color={'gray'} /></View>
            </Pressable>
        </View> */
    )
}

const styles = StyleSheet.create({
    barActions: {
        marginTop:10,
        marginLeft:10,
        marginBottom:10,
        flexDirection:'row',
        flex:1,
        gap:20
    },

    rowInfo: {
        flexDirection:'row',
        textAlign:'center',
        gap:6,
        
    },
    act: {
        color:'gray', textDecorationLine:'underline'
    },
    submitButtonContainer: {
        alignSelf: 'flex-end', 
        paddingVertical:10,
    },
    
    submitButton: {
        backgroundColor: Colors.tertiary,
        padding:8,
        borderRadius:5,
        fontWeight:'bold',
        color:'#f5f5f5',
        marginRight:6,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 5,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        marginHorizontal:6
    },
    submitReplyContainer: {
        flex:1,
        flexDirection:'column',
    }
})

export default PublicationStatsOverview