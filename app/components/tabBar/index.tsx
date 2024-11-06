import { Pressable, SafeAreaView, Text, StyleSheet} from "react-native"
import {MaterialIcons, Ionicons, FontAwesome6}  from '@expo/vector-icons';

interface TabBarReaderProps {
    goBack: ()=> void;
    toggleTheme: () => void
    currentTheme: { body: { background: string; color: string } }
  }

const TabBarReader: React.FC<TabBarReaderProps> = ({ goBack, toggleTheme, currentTheme}) => {
    const isDarkMode = currentTheme.body.background === '#333'
    return(
        <SafeAreaView style={[styles.container, { backgroundColor: currentTheme.body.background }]}>
            <Pressable onPress={goBack}><Ionicons style={{ color: currentTheme.body.color }} name="arrow-back" size={24} color="black" /></Pressable>
            <Pressable onPress={toggleTheme}>
                <MaterialIcons 
                        name={isDarkMode ? 'light-mode' : 'dark-mode'} 
                        size={24}
                        color={currentTheme.body.color}
                    />
            </Pressable>
            <Pressable><FontAwesome6 style={{ color: currentTheme.body.color }} name="bookmark" size={24} color="black" /></Pressable>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
      flexDirection:'row',
      justifyContent:'space-between',
      backgroundColor: '#fff',
      borderColor:'#ccc',
      borderRadius:5,
      borderWidth:1,
      padding:10
    },
    epub: {
      flex: 1,
    },
  });

export default TabBarReader
