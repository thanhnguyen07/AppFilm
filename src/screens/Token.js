import { View, StyleSheet } from 'react-native'
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './LoadingScreen';

const Token = ({navigation}) => {

    const getData = async () => {
        try {
          const idUser = await AsyncStorage.getItem('idUser')
         
          if(idUser !== null) {
            console.log('Id User save',idUser)
            navigation.navigate("HomeStack" , {
                screen: 'Profile',
                params: {idUser},
              });
            navigation.navigate("HomeStack" , {
                screen: 'Home',
                params: {idUser},
            });
          }
          else {
            navigation.navigate('LoginScreen')
          }
        } catch(e) {
          // error reading value
        }
      }
    getData();
    return (
        <View style = {styles.container}>
         <LoadingScreen/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default Token