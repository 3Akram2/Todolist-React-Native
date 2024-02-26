import { useNavigation } from '@react-navigation/native'
import React,{useState} from 'react'
import { KeyboardAvoidingView, Platform, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { Button, TextInput } from 'react-native-paper'
import { NavigationProp } from '@react-navigation/native';
import {register} from '../axios/requests'
import Loading from '../components/Loading';
type RootStackParamList = {
    Home: undefined;
    Register: undefined;
    Login: undefined;
  };
const RigsterScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [email,setEmail] = useState<string>('');
    const [password,setPassword] = useState<string>('');
    const [confirmPassword,setConfirmPassword] = useState<string>('');
    const [showPassword,setShowPassword] = useState<boolean>(false);
    const [emailError,setEmailError] =  useState<boolean>(false);
    const [passError,setPassError] =  useState<boolean>(false);
    const [confPassError,setConfPassError] =  useState<boolean>(false);
    const [isLoading,setLoading] =  useState<boolean>(false);
  
    const handleShowPassord = () =>{
        setShowPassword(!showPassword)
    }
    const validateEmail = () => {
        const emailRegex = /\S+@\S+\.\S+/;
        setEmailError(!emailRegex.test(email)) ;
      };
    const validatePassword = () => {
        if(password.length >= 6){
            setPassError(false);
            return
        }
        setPassError(true);
    }
    const validateConfirmPassword = ()=>{
        if(password === confirmPassword){
            setConfPassError(false);
             return
        }
        setConfPassError(true);
    }
    const  goLogin = ()=>{
        navigation.navigate('Login');
    }
    const handleRegister = async () =>{
        validateConfirmPassword();
    if(emailError || passError || confPassError){
       return alert("failed to register ")
    }
    if(!email || !password || !confirmPassword){
        return alert("enter all fields")
    }
    setLoading(true);
    try {
        const response= await register(email.toLowerCase(),password).finally(()=>setLoading(false));
       alert(response.data.msg)
       if(response.data.msg === 'user already exists'){
        goLogin();
       }
    } catch (error:any) {
        if (error.response) {
            const status = error.response.status;
            if (status === 401) {
              alert('User already exists');
            } else {
              console.error('Login error:', error);
              alert('An error occurred while registering');
            }
        }
    }
    } 
  return (
    isLoading?<Loading/>:
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
     error={emailError}
     />
     {emailError?<Text style={styles.inputError} >Invalid email address</Text>:''}
     <TextInput
      mode="outlined"
      label="Password"
      secureTextEntry={!showPassword}
      value={password}
      onChangeText={newPass => setPassword(newPass)}
      onBlur={validatePassword}
      right={showPassword?<TextInput.Icon icon="eye-off" onPress={handleShowPassord} />:<TextInput.Icon icon="eye" onPress={handleShowPassord} />}
      style={styles.input}
    />
    {passError?<Text style={styles.inputError} >Password must be at least 6 characters long</Text>:''}
     <TextInput
      mode="outlined"
      label="confirm Password"
      secureTextEntry
      value={confirmPassword}
      onChangeText={confPass => setConfirmPassword(confPass)}
      onBlur={validateConfirmPassword}
      style={styles.input}
    />
{confPassError?<Text style={styles.inputError}>Passwords do not match</Text>:''}
    </View>
    <View>
        <Button style={styles.btn} textColor='black' buttonColor='#55BCF6' onPress={handleRegister}>Register</Button>
    </View>
    <Text style={styles.subtitle}>
            Already a member? 
             <Text onPress={goLogin} style={styles.rigLink}>LOGIN</Text>
    </Text>
   </KeyboardAvoidingView>
  )
}

export default RigsterScreen

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
    inputError:{
        fontSize:10,
        color:"red",
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
    }
})