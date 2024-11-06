import React from 'react';
import { View, Image, Text, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HeaderProfileProps = {
    userNick: string;
    userName: string;
    onSignOut: () => void;
};

const HeaderProfile: React.FC<HeaderProfileProps> = ({ userNick, userName, onSignOut }) => {
    return (
        <View style={styles.HeaderContainer}>
            <View style={styles.Line}>
                <Text style={styles.Username}>{userNick}</Text>
                <Pressable onPress={onSignOut}>
                    <MaterialCommunityIcons name="exit-run" size={24} color="red" />
                </Pressable>
            </View>
            
            <Text style={styles.Name}>{userName}</Text>
        </View>
    );
};


const styles = StyleSheet.create({
    HeaderContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
    },
    Line: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    Username: {
        fontSize: 27,
        fontWeight: '700',
        color: '#1e1e1e',
        textAlign: "center",
    },
    Name: {
        fontSize: 15,
        fontWeight: '500',
        color: '#929292',
        textAlign: "center",
        marginBottom:20,
    },

})

export default HeaderProfile;