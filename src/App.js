import { View, StyleSheet, Text } from 'react-native';
import React from 'react';
import Routers from './router';
import Loading from './screens/LoadingScreen';



const App = () => {
  return (
    <View style = {styles.container}>
      <Routers/>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex:1,
  }
})
export default App