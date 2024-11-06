import HeaderProfile from "@/app/components/headers/HeaderProfile";
import ProfileStatsOverview from "@/app/components/overview/ProfileStatsOverview";
import ProfileTabsOverview from "@/app/components/overview/ProfileTabsOverview";
import { useAuth } from "@/app/hooks/useAuth";
import { Colors } from "@/app/styles/colors";
import { FontAwesome5, Ionicons, FontAwesome6, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import { View, Text, Alert, Image, StyleSheet, Pressable, ActivityIndicator } from "react-native"


const ProfileScreen: React.FC = () => {
    const { user, signOut } = useAuth();
    console.log(user)


    return (
        <View style={styles.container}>
            {/* <View style={styles.coverContainer}>
                <Image
                    style={styles.coverImage}
                    source={require('@/assets/images/logo-traca.png')}
                />
            </View> */}
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.imageProfileContainer}
                        source={require('@/assets/images/logo-traca.png')}
                    />
                    
                </View>
                <HeaderProfile
                    userName={user?.name!}
                    userNick={user?.nick!}
                    onSignOut={signOut}
                />
                <ProfileStatsOverview
                    followersCount={user?.followers.length!}
                    postsCount={user?.posts.length!}
                />
                {/* <ProfileTabsOverview
                    publications={user?.posts!}
                    renderLists={()=>{}}
                    renderPublications={()=>{}}
                    renderReview={()=>{}}

                /> */}

                
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    coverContainer: {
        width: '100%',
        height: '20%',
    },
    coverImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: "cover",
    },
    profileContainer: {
        marginTop: 10,
        alignItems: "center",
    },
    
    imageProfileContainer: {
        marginTop:32,
        width: 150,
        height: 150,
        borderRadius: 100,
        shadowColor: 'black',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
  
});

export default ProfileScreen