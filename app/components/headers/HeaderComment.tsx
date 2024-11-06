import React from 'react';
import { View, Image, Text, Pressable, StyleSheet, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HeaderCommentProps = {
    userNick: string;
    userName: string;
    //onSignOut: () => void;
};

const HeaderComment: React.FC<HeaderCommentProps> = ({ userNick, userName }) => {
    return (
        <View style={styles.rowAuthorInfo}>
            <Text style={styles.containerAuthorName}>{userName}</Text>
            <Text style={styles.containerAuthorNick}>@{userNick}</Text>
        </View>
    )
}


export default HeaderComment;

    const styles = StyleSheet.create({

    container: {
        flex:1,
        width:'90%'
        //height: '80%',
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
    rowAuthorInfo:{
        flexDirection:'row',
        textAlign:'left',
        gap:6,
        alignItems:'center'
    }
})