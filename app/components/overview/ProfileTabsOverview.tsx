import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import PublicationList from '../list/PublicationList';
import { Publication } from '@/app/dtos/IPublication';

type ProfileTabsOverviewProps = {
    publications: Publication[]
    renderPublications: ()=> void
    renderLists: ()=> void
    renderReview: ()=> void
};








const ProfileTabsOverview: React.FC<ProfileTabsOverviewProps> = ({publications, renderLists, renderPublications, renderReview}) => {
    const [activeTab, setActiveTab] = useState(1)
    
/*     const renderTabContent = () => {
        switch (activeTab) {
          case 1:
            return <PublicationList publications={publications} onSelectPublication={()=>{}} />
          case 2:
            return <></>
          case 3:
            return <> </>
          default:
            return null;
        }
      } */

    return (
        <View style={styles.Container}>
            <Pressable onPress={renderPublications}>
                <View>
                    <Text style={styles.followersLabel}>Publications</Text>
                </View>
            </Pressable>
            <Pressable onPress={renderLists}>
                <View>
                    <Text style={styles.followersLabel}>Lists</Text>
                </View>
            </Pressable>
            <Pressable onPress={renderReview}>
                <View>
                    <Text style={styles.followersLabel}>Review</Text>
                </View>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
Container: {
    flexDirection: 'row',
    marginTop:20,
    gap:10,
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

export default ProfileTabsOverview