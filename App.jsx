import { Text, SafeAreaView,StyleSheet } from 'react-native'
import React from 'react'
import CameraComponent from './src/screen/CameraComponent';
const App = () => {
  return (
    <SafeAreaView style={styles.container}> 
      <Text>App</Text>
      <CameraComponent/>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App