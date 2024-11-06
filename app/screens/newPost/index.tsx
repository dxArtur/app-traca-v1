import PublicationForm from "@/app/components/publication/PublicationForm"
import { Colors } from "@/app/styles/colors"
import {Text, StyleSheet, SafeAreaView } from "react-native"

const NewPostScreen: React.FC = () => {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>O que você está pensando?</Text>
            <PublicationForm>
                
            </PublicationForm>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    title:{
      marginTop:8,
      marginLeft:6,
      color:Colors.secondary,
      fontWeight:'bold',
      fontSize:24
    },
})

export default NewPostScreen