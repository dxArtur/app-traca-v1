import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, TextInput, View, StyleSheet, Image } from "react-native";
import EmailInput from "@/app/components/input/EmailInput";
import PasswordInput from "@/app/components/input/PasswordInput";
import AuthButton from "@/app/components/button/AuthButton";
import { useAuth } from "@/app/hooks/useAuth";
import { userInputSignin, userInputSignup } from "@/app/dtos/UserDto";
import { useNavigation } from "@react-navigation/native";
import { AxiosResponse } from "axios";
import { SignInResponse } from "@/app/dtos/SigninResponse";
import NickInput from "@/app/components/input/NickInput";
import NameInput from "@/app/components/input/NameInput";
import { checkNickAvailability, searchUsers } from "@/app/api/apiUsers";

export default function SignupScreen() {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [nick, setNick] = useState('')
  const [nickValid, setNickValid] = useState(true)
  const [password, setPassword] = useState('')
  const {signUp,  user,  } = useAuth();
  const navigation = useNavigation()
  
  async function handleSignup() {
    try {
      const signupInput: userInputSignup = {email, name, nick, password}
      const response = await signUp(signupInput)
      
      navigation.navigate('Signin')
    } catch (error) {
        console.log(error)
    }
  }
  async function gotoSignin() {
    navigation.navigate('Signin')
  }

  useEffect(() => {
    if (nick) {
      const debounceTimer = setTimeout(async () => {
        const response = await checkNickAvailability(nick);
        setNickValid(response);
      }, 200); // Aguarda 500ms antes de fazer a chamada

      return () => clearTimeout(debounceTimer); // Limpa o timer
    } else {
      setNickValid(true); // Resetar se o nick estiver vazio
    }
  }, [nick])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Image 
          style={styles.headerImage}
          source={require('@/assets/images/logo-traca.png')}
          />
        <Text style={styles.title}>Sua primeira vez aqui?</Text>
        <Text style={styles.subtitle}>preencha esses campos para se registrar</Text>
        <View style={styles.buttonsContainer}>
        <EmailInput value={email} onChange={setEmail} />
        <NameInput value={name} onChange={setName} />
        { !nickValid  ? <Text style={[styles.subtitle, {textAlign:'left'}]}>Esse nome de usuário já está em uso</Text>  : null}
        <NickInput
          value={nick}
          onChange={setNick}
          />
        <PasswordInput value={password} onChange={setPassword} />
        <AuthButton
            title="Cadastrar"
            backgroundColor={"#98ff98"} //"#98ff98"
            textColor="#003366"
            onPress={handleSignup} // Navega para a tela de cadastro
          /> 
        </View>
        <Pressable onPress={gotoSignin}>
          <View>
            <Text style={styles.formFooter}>Já tem uma conta?
              <Text  style={{textDecorationLine:"underline", color: '#003366'}}> Entre agora</Text>
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