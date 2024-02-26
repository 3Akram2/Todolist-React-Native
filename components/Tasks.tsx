import React,{useState,useEffect} from 'react';
import { Icon, IconButton } from 'react-native-paper';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View,ScrollView } from 'react-native';
import Task from './Task';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllTodos,addTask ,deleteTask,updateTask} from '../axios/requests';
import Loading from './Loading';
import { useNavigation,NavigationProp } from '@react-navigation/native';

interface iTask {
    id: string;
    title: string;
    completed:boolean; 
  }
  type RootStackParamList = {
    Home: undefined;
    Register: undefined;
    Login:undefined;
  };
const Tasks:React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [tasks, setTasks] = useState<iTask[]>([]);
    const [title,setTitle] = useState<string>("");
    const [isLoading,setLoading]=useState<boolean>(true)
  useEffect( ()=>{
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if(token){
          const resonse = await getAllTodos(token).finally(()=>setLoading(false))
          setTasks(resonse.data.todos)
        }    
      } catch (error) {
        console.error('Error retrieving token:', error);
      }
    };
    fetchData();
  },[])
  const handleTextChange = (text:string) => {
  setTitle(text)
  }
  const handleAddTask = async() => {
    Keyboard.dismiss()
    if(!title){
      return alert('enter task title')
    }
    const token = await AsyncStorage.getItem("token");
    if(token){
   const response = await addTask(token,title)
   setTasks([...tasks,response.data.newTask])
   setTitle('')
    }
  };
  const delTask = async (id:string) => {
    const token = await AsyncStorage.getItem("token");
    if(token){
      const response = await deleteTask(token,id);
      setTasks(response.data.todos)
    }
  }  
  const updTask = async(id:string)=>{
    const token = await AsyncStorage.getItem("token");
    if(token){
  const response = await updateTask (token,id);
  const index = tasks.findIndex(task => task.id === id);  
      if (index !== -1) {
        // Update tasks state by replacing the old task with the updated task
        setTasks(prevTasks => {
          const updatedTasks = [...prevTasks];
          updatedTasks[index] = response.data.updatedTask;
          return updatedTasks;
        });
      }
  }
  }
  const handleSignOut= async()=>{
    await AsyncStorage.removeItem("token");
    navigation.navigate('Login');
  }
  return (
    isLoading?<Loading/>:
    <View style={styles.container}>
      {/* tasks  */}
      <View style={styles.tasksWrapper}>
        <View style={styles.headSection}>
        <Text style={styles.sectionTitle}>TodoList App</Text>
        <IconButton icon='logout' size={25} onPress={handleSignOut}></IconButton>
        </View>
        <ScrollView style={styles.items} >
          {/* here go the tasks */}
          {
            tasks.length!==0?
          tasks?.map((item,index)=>{
           return <Task key={index} title={item?.title} id={item?.id} completed={item?.completed} delTask={delTask} updTask={updTask} />
          }):<Text>no tasks yet </Text>
        } 
        </ScrollView>
      </View >
      {/* Add Task */}
      <KeyboardAvoidingView  
      behavior={Platform.OS === "ios"? "padding" : "height"} 
      style={styles.addTaskWrapper}
      >
      <TextInput style={styles.input} placeholder='Add Task' value={title} onChangeText={text=>handleTextChange(text)} />
      <TouchableOpacity onPress={handleAddTask}>
        <View style={styles.addWrapper} >
        <Icon  
        source="plus"
        size={20}
        />
        </View>
      </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E8EAED',
    },
    tasksWrapper:{
      paddingTop:80,
      paddingHorizontal:20,
    },
    sectionTitle:{
      fontSize:24,
      fontWeight:'bold',
    },
    items:{
      height:'80%'
    },
    addTaskWrapper:{
      position:'absolute',
      bottom:60,
      width:'100%',
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center'
    },
    input:{
      padding:15,
      width:250,
      backgroundColor:'#FFF',
      borderRadius:60,
      borderColor:'#C0C0C0',
      borderWidth:1,
    },
    addWrapper:{
      width:60,
      height:60,
      backgroundColor:'#FFF',
      borderRadius:60,
      borderColor:'#C0C0C0',
      borderWidth:1,
      justifyContent:'center',
      alignItems:'center'
    },
    headSection:{
      flexDirection:'row',
      justifyContent:'space-around',
      alignItems:'center'
    },
  });

export default Tasks