/* import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View, StyleSheet, Image } from "react-native";
import EmailInput from "@/app/components/input/EmailInput";
import PasswordInput from "@/app/components/input/PasswordInput";

export default function Index() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  function handleSignin(): void {
    
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Que bom tê-lo de volta</Text>
        <Text style={styles.subtitle}>Leia, compartilhe e esteja com a gente</Text>
        <View style={styles.buttonsContainer}>
        <EmailInput value={email} onChange={setEmail} />
        <PasswordInput value={password} onChange={setPassword} />
          {/* <EmailInput value={email} onChange={setEmail} />
          
          <AuthButton
            title="Entrar"
            backgroundColor={"#98ff98"} //"#98ff98"
            textColor="#003366"
            onPress={handleSignin} // Navega para a tela de cadastro
          /> 
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  innerContainer: {
    width: '80%',
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'left',
    color: '#6b7280',
    marginBottom: 8,
  },
  buttonsContainer: {
    marginTop: 32
  }
}) */