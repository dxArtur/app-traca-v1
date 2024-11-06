import { useTheme } from '@/app/context/ThemeContext';
import { Publication } from '@/app/dtos/IPublication';
import { Colors } from '@/app/styles/colors';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTimeAgo } from '@/app/hooks/useTimeAgo'
import PublicationStatsOverview from '../overview/PublicationStatsOverview';
import HeaderComment from '../headers/HeaderComment';
import { usePublications } from '@/app/context/PublicationsProvider';
import { useAuth } from '@/app/hooks/useAuth';

interface PublicationItemProps {
    typeContent: "publication"|"comment"
    publication: Publication;
    showStatsOverview?: boolean;
}

const PublicationItem:React.FC<PublicationItemProps> =  ({ typeContent, publication, showStatsOverview=true}) => {
    const navigation = useNavigation()
    const { markAsLikePublication } = usePublications()
    const { user } = useAuth()
    const [liked, setLiked] = useState(publication.userIdsWhoLiked.includes(user?.id!))
    const [currentLikeCount, setCurrentLikeCount] = useState(publication.likesCount)
    const [activeReplyIndex, setActiveReplyIndex] = useState<number | null>(null)

    const handlePressComments = () => {
        navigation.navigate('Comments', { 
            publicationId: publication.id, 
            publicationData: publication 
        })
    }

    const pressLikeInPublication = () => {
        console.log(publication.id)
        markAsLikePublication(publication.id, user?.id!)
        setLiked(!liked)
        setCurrentLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={()=> {}}>
                <View>
                <HeaderComment
                    userName={publication.author.name}
                    userNick={publication.author.nick}
                />
                </View>
            </Pressable>
            <View style={styles.containerContent} >
                <Text style={styles.content}>{publication.content}</Text>
                <Text style={styles.infoTime} >{useTimeAgo(publication.createdAt)}</Text>
            </View>
            {showStatsOverview && (
            <PublicationStatsOverview style={styles.overview}
                parentId={publication.id}
                id={publication.id}
                typeContent={typeContent}
                liked={liked}
                userIdsWhoLiked = {publication.userIdsWhoLiked}
                commentCount={publication.commentCount}
                likeCount={currentLikeCount}
                onPressComment={handlePressComments}
                onPressLike={pressLikeInPublication}
            />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        margin:6,
        flex:1,
        borderRadius:8,
        borderBottomWidth:2,
        borderColor:Colors.border,
        backgroundColor: Colors.backgroundOverlay
    },
    containerAuthorName:{
        marginTop:8,
        marginLeft:10,
        marginBottom:10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    containerAuthorNick:{
        marginTop:8,
        marginBottom:10,
        fontSize: 15,
        color:'gray'
    },
    containerContent:{
        marginLeft:10,
        marginVertical:5,
        paddingBottom:10,
        fontSize: 15,
        textAlign:'justify'
    },
    content: {
        flex:1,
        width:'90%',
        textAlign:'justify',
        marginLeft:4,
        //color:'gray'
    },
    infoTime:{
        marginRight: 10, 
        fontStyle: 'italic', 
        textAlign: 'right',
        color:'gray'
    },  
    rowAuthorInfo:{
        flexDirection:'row',
        textAlign:'left',
        gap:6,
        alignItems:'center'
    },
    overview : {
        borderColor:Colors.border,
        borderTopWidth:1,
        marginHorizontal:2,
        alignSelf:'center',
        width:'95%'
    }
})


export default PublicationItem