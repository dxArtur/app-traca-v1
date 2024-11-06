import { useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View, StyleSheet, Image } from "react-native";
import EmailInput from "@/app/components/input/EmailInput";
import PasswordInput from "@/app/components/input/PasswordInput";
import AuthButton from "@/app/components/button/AuthButton";
import { useAuth } from "@/app/hooks/useAuth";
import { userInputSignin } from "@/app/dtos/UserDto";
import { useNavigation } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import { SignInResponse } from "@/app/dtos/SigninResponse";

export default function SigninScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn, signOut,  user,  } = useAuth();
  const navigation = useNavigation()
  
  async function handleSignin() {
    try {
      const signinInput: userInputSignin = {email, password}
      const response = await signIn(signinInput)

      console.log(response)

      navigation.navigate('Home')
    } catch (error) {
        console.log(error)
    }
  }

  async function gotoSignup() {
    navigation.navigate('Signup')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
      <Image 
            style={styles.headerImage}
            source={require('@/assets/images/logo-traca.png')}
          />
        <Text style={styles.title}>Bem vindo de volta</Text>
        <Text style={styles.subtitle}>Leia, compartilhe e esteja com a gente</Text>
        <View style={styles.buttonsContainer}>
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
          <AuthButton
              title="Entrar"
              backgroundColor={"#98ff98"} //"#98ff98"
              textColor="#003366"
              onPress={handleSignin} // Navega para a tela de cadastro
            /> 
        </View>
        <Pressable onPress={gotoSignup}>
          <View>
            <Text style={styles.formFooter}>ainda não tem uma conta?
              <Text  style={{textDecorationLine:"underline", color: '#003366'}}> Registre-se agora</Text>
            </Text>
          </View>
        </Pressable>
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
  headerImage: {
    width: 130,
    height: 130,
    alignSelf:"center",
    marginBottom:36
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 8,
    color:'#003366'
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#6b7280',
    marginBottom: 8,
  },
  buttonsContainer: {
    marginTop: 32
  },
  formFooter: {
    marginTop: 25,
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
    textAlign: 'center',
    letterSpacing: 0.15
  }
})