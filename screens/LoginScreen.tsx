import { useNavigation } from '@react-navigation/native'
import React,{useState} from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { NavigationProp } from '@react-navigation/native';
import { login } from '../axios/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
    Home: undefined;
    Register: undefined;
    Login:undefined;
  };
const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [showPassword,setShowPassword] = useState<boolean>(false);
    const [emailError,setEmailError] =  useState<boolean>(false);
    
    const handleShowPassord = () =>{
        setShowPassword(!showPassword)
    }
    const validateEmail = () => {
        // email validation using regex
        const emailRegex = /\S+@\S+\.\S+/;
        setEmailError(!emailRegex.test(email)) ;
      };
    const  goRigster = ()=>{
        navigation.navigate('Register');
    }
    const handleLogin =async () => {
        
        if(emailError){
            alert('invalid input')
            return
        }
        if(!email || !password){
            alert('enter all fields')
            return
        }
        try {
            const response = await login(email.toLowerCase(),password);
            if (response.status === 200) {
                const token = response.data.token;
                await AsyncStorage.setItem("token",token);
                navigation.navigate('Home');
                setEmail('')
                setPassword('')
              }
            } catch (error:any) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    const status = error.response.status;
                    if (status === 404) {
                      alert('User not found');
                    } else if (status === 401) {
                      alert('Wrong email or password');
                    } else {
                      console.error('Login error:', error);
                      alert('An error occurred while logging in');
                    }
            }
    }}
  return (
   <KeyboardAvoidingView 
   style={styles.container}
   behavior={Platform.OS === 'ios'?'padding':'height'}
   >
    <View>
     <TextInput  
     mode="outlined"
     label="Email"
     value={email}
     onChangeText={newEmail => setEmail(newEmail)}
     onBlur={validateEmail}
     style={styles.input}
     />
      {emailError?<Text style={styles.inputError} >Invalid email address</Text>:''}
     <TextInput
      mode="outlined"
      label="Password"
      secureTextEntry={!showPassword}
      value={password}
      onChangeText={newPass => setPassword(newPass)}
      
      right={showPassword?<TextInput.Icon icon="eye-off" onPress={handleShowPassord} />:<TextInput.Icon icon="eye" onPress={handleShowPassord} />}
      style={styles.input}
    />

    </View>
    <View>
        <Button style={styles.btn} textColor='black' buttonColor='#55BCF6'  onPress={handleLogin}>Login</Button>
    </View>
    <Text style={styles.subtitle}>
             Has not Registered Yet? 
             <Text onPress={goRigster} style={styles.rigLink}>REGISTER</Text>
    </Text>
   </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
       justifyContent:'center',
       alignItems:'center',
       flex:1
    },
    input:{
        marginVertical:6,
        width:300,
    },
    btn:{
        borderRadius:10,
        width:150,
        marginTop:6,
    },
    subtitle:{
        fontSize:10,
        color:'black',
        marginTop:4,
    },
    rigLink:{
        color:'#55BCF6',
        fontSize:14,
        fontWeight:"bold",
        textDecorationLine:'underline',
    },
    inputError:{
        fontSize:10,
        color:"red",
    },
})