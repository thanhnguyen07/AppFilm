import { View, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react';
const LoadingScreen = () => {

  return (
    <View style= {styles.viewView}>
    {console.log('render loading')}
      <ActivityIndicator size='large'/>
    </View>
  )
}
const styles = StyleSheet.create({
  viewView: {
    flex: 1,
    justifyContent: "center"
  },
})
export default LoadingScreen