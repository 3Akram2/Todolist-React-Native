import { StyleSheet } from 'react-native'
import React from 'react'
import { Modal, Portal, Text, Button, PaperProvider,ActivityIndicator } from 'react-native-paper';



  

const Loading = () => {
    const [visible, setVisible] = React.useState(true);
  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible}  style={styles.containerStyle}>
        <ActivityIndicator animating={true} color='blue' />
        </Modal>
      </Portal>
      
    </PaperProvider>
  )
}

export default Loading

const styles = StyleSheet.create({
    containerStyle:{
            backgroundColor: 'white',
            padding: 20,
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
    }
})