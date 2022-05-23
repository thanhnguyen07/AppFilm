import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getDataUser from '../components/getDataUser'
import LoadingScreen from './LoadingScreen';

function Profile({navigation, route}) {
  const {idUser} = route.params;
  console.log(idUser)
  const dataUsers = getDataUser();
  
  
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
      // clear error
    }
    console.log('Clear token')
  }
  const handlerOut = () => {
    clearAll()
    navigation.navigate('LoginScreen')
  }

  const buttonList = (
    <TouchableOpacity onPress={() => navigation.navigate('PlaylistScreen',
        {idUser})}
      style = {styles.viewButtonList}>
          <Text style = {styles.textList}>Danh Sách Xem Sau</Text>
      </TouchableOpacity>
  )

  if (dataUsers.length != 0){
  const dataUser = dataUsers.find((element) => {return element._id === idUser})
  return (
    <LinearGradient colors={['#bdc3c7', '#2c3e50']}
      style={styles.container} >
      {/* {console.log('Render Profile')} */}
      <View>
      <LinearGradient 
      colors={['#232526', '#414345']}
      style = {styles.viewHeader}>
        <Text style = {styles.textHeader}>Thông Tin Tài Khoản</Text>
      </LinearGradient>
      <View style = {styles.viewName}>
        <Text style = {styles.textName}>{dataUser.name}</Text>
      </View>
      <View style = {styles.viewEmail}>
        <Text style = {styles.textEmail}>{dataUser.email}</Text>
      </View>
    </View>
      {buttonList}
      <TouchableOpacity onPress={handlerOut}
      style = {styles.buttonOut}>
          <Text style = {styles.textOut}>Đăng Xuất</Text>
      </TouchableOpacity>
      </LinearGradient>
  )
  }
  else{
    return (
      <View>
        <LoadingScreen/>
      </View>
    )  
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  viewHeader: {
    marginTop: 60,
    backgroundColor: 'black'
  },
  textHeader: {
    fontSize: 30,
    color: 'white',
    fontFamily:'Roboto-BlackItalic',
    textAlign: 'center',
  },
  viewName: {
    marginTop: 40,
  },
  textName: {
      color: 'gray',
      fontFamily:'Roboto-BlackItalic',
      fontSize: 40,
      textAlign: 'center', 
  },
  viewEmail: {
    marginTop: 10
  },
  textEmail: {
    color: 'grey',
    fontFamily:'Roboto-BlackItalic',
    fontSize: 20,
    textAlign: 'center', 
},
viewButtonList: {
  marginTop: 20,
  backgroundColor:'white',
  marginHorizontal: 75,
  borderWidth: 1,
  borderRadius: 8,
  height: 30,
},
textList: {
  textAlign: 'center',
  fontSize: 25,
  fontFamily:'Roboto-BlackItalic',
},
buttonOut: {
  marginTop: 50,
  borderWidth: 1,
  borderRadius: 8,
  height: 35,
  marginHorizontal: 120,
  backgroundColor: 'red',
  justifyContent: 'center',
},
textOut: {
  textAlign: 'center',
  fontSize: 25,
  color: 'black',
  fontFamily:'Roboto-Black',
},
})
export default Profile