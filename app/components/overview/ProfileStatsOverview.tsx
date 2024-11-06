import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

type ProfileStatsOverviewProps = {
    followersCount: number;
    postsCount: number;
};

const ProfileStatsOverview: React.FC<ProfileStatsOverviewProps> = ({ followersCount, postsCount }) => {
    return (
        <View style={styles.infoContainer}>
            <Pressable>
                <View style={styles.buttonContainer}>
                    {/* <Ionicons style={styles.icon} name="person" size={24} color="gray" /> */}
                    <View style={styles.followersContainer}>
                        <Text style={styles.followers}>{followersCount}</Text>
                        <Text style={styles.followersLabel}>Followers</Text>
                    </View>
                </View>
            </Pressable>

            <Pressable>
                <View style={styles.buttonContainer}>
                    {/* <MaterialIcons style={styles.icon} name="comment" size={24} color="black" /> */}
                    <View style={styles.followersContainer}>
                        <Text style={styles.followers}>{postsCount}</Text>
                        <Text style={styles.followersLabel}>Posts</Text>
                    </View>
                </View>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
},
icon: {
    color: '#76c776',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#aaa',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    marginRight: 4,
},
followersContainer: {
    flexDirection: 'column',
},
followers: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#929292',
},
followersLabel: {
    fontSize: 15,
    fontWeight: '500',
    color: '#929292',
},
infoContainer: {
    flexDirection: "row",
    padding: 8,
    gap: 15,
    justifyContent: 'center',
},
})

export default ProfileStatsOverview