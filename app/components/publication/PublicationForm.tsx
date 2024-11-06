import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@/app/styles/colors';
import { usePublications } from '@/app/context/PublicationsProvider';
import { useAuth } from '@/app/hooks/useAuth';



const PublicationForm:React.FC = ({}) => {
  const [content, setContent] = useState('')
  const navigation = useNavigation()
  const { createPublication, loadPublications} = usePublications()
  const {user} = useAuth()

  const handleReplySubmit = () => {
    if (content !== '') {
      createPublication(content, user?.id!)
      setContent('')
      loadPublications()
      //navigation.navigate('Home')
    } else{
      console.log('digite um texto')
    }
  }


 /*  const handleCreatePost = async () => {
    if (!content) {
      Alert.alert('Erro', 'Por favor, digite o conteúdo da publicação.');
      return;
    }

    try {
      const response = await api.post('/posts', { content });
      if (response.status === 201) {
        Alert.alert('Sucesso', 'Publicação criada com sucesso!');
        navigation.goBack(); // Volta para a tela anterior
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível criar a publicação.');
    }
  }; */

  return (
    <View style={styles.submitReplyContainer}>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        placeholder="Escreva sua resposta..."
        
      />
      <Pressable style={styles.submitButtonContainer} onPress={handleReplySubmit}>
        <Text style={styles.submitButton} >Publicar</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({

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
},
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
/*   input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  }, */
});

export default PublicationForm;

{/* <View style={styles.container}>
      <Text style={styles.title}>Criar Publicação</Text>
      <TextInput
        style={styles.input}
        placeholder="O que você quer compartilhar?"
        value={content}
        onChangeText={setContent}
        multiline
      />
      <Button title="Criar Publicação" onPress={handleCreatePost} />
    </View> */}