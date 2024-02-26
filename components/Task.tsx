import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, IconButton, MD3Colors } from 'react-native-paper';



interface TaskProps {
    id: string;
    title: string;
    completed:boolean;
    delTask: (id: string) => void;
    updTask:(id:string)=>void;
}

const Task: React.FC<TaskProps> = ({ id,title,completed, delTask,updTask }) => {
  const handleDeleteTask = async ()=>{
    await delTask(id);
  }
 const handleUpdate = async () =>{
  await updTask(id);
 }
  return (
    <Card style={completed?[styles.taskCard, styles.taskCompleted]:styles.taskCard}>
      <Card.Title
        title={
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        }
        right={() => (
          <IconButton iconColor={MD3Colors.error50} size={30} onPress={handleDeleteTask} icon='delete-circle-outline' />
        )}
        left={() => (
          <TouchableOpacity style={styles.square} onPress={handleUpdate}></TouchableOpacity>
        )}
        titleVariant='headlineSmall'
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    borderRadius: 10,
    width: '100%',
    backgroundColor: '#FFF',
    padding: 10,
    marginTop: 20,
    maxHeight:90,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center', 
  },
  titleText: {
    flexWrap: 'wrap',
    fontSize: 16,
    fontWeight: '600',
    paddingTop:6,   
  },
  square: {
    width: 24,
    height: 24,
    backgroundColor: '#55BCF6',
    opacity: 0.4,
  },
  taskCompleted: {
    borderLeftWidth: 8,
    borderLeftColor: 'green',
  },
});

export default Task;
