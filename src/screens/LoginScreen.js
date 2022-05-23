import { 
  View, Text, ImageBackground, StyleSheet, 
  TextInput, TouchableOpacity, Alert,
  TouchableWithoutFeedback, Keyboard,  
} from 'react-native';
import React, {useState, useEffect} from 'react';
import loginBg from '../assets/images/login-bg.png';
import LinearGradient from 'react-native-linear-gradient';
import url from '../components/url';
import AsyncStorage from '@react-native-async-storage/async-storage';
const axios = require('axios').default;


function Login({ navigation }) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const Url = url();

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('idUser', value)
    } catch (e) {
      // saving error
    }
  }
  
  const checkInput = email != '' && password != ''
  const checkLogin = () => {
    if (checkInput) {
      const postData = async () => {
        await axios.post(`${Url}/login`,{
          email: email,
          password: password,
        })
        .then ((res) => {
          const dataRes =res.data;
          if (dataRes.checkEmail) {
            if(dataRes.checkPassword) {
              const idUser = dataRes.idUser;
              navigation.navigate("HomeStack" , {
                screen: 'Profile',
                params: {idUser},
              });
              navigation.navigate("HomeStack" , {
                screen: 'Home',
                params: {idUser},
              });
              storeData(idUser)
            }
            else {
              Alert.alert('Mật khẩu vừa nhập không đúng!!!')
            }
          }
          else(
            Alert.alert('Email vừa nhập chưa được đăng ký!!!')
          )
        })
        .catch ((error) => {
          console.error(error)
        })
      };
      postData();
    }
    else {
      Alert.alert('Vui lòng nhập đủ thông tin !!!')
    }

  }
return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ImageBackground
      style = {styles.background}
      source={loginBg} >
        <View style={styles.viewTitle}>
          <Text style = {styles.title}>APP MOVIES</Text>
        </View>
        <View style = {styles.inputView}>
          <View>
            <Text style = {styles.titleInput}>Email</Text>
            <TextInput
              clearButtonMode ='always'
              value={email}
              onChangeText ={text =>setEmail(text)}
              keyboardAppearance = 'dark'
              keyboardType = 'email-address'
              style={styles.input}
              placeholder='example@gmail.com'
              placeholderTextColor="#5913F7"
            />
          </View>
          <View>
            <Text style = {styles.titleInput}>Mật Khẩu</Text>
            <TextInput
              value={password}
              onChangeText ={text =>setPassword(text)}
              clearButtonMode ='always'
              keyboardAppearance = 'dark'
              secureTextEntry
              style={styles.input}
              placeholder='********'
              placeholderTextColor="#5913F7"
            />
          </View>
        </View>
        <LinearGradient 
        colors={['#8E2DE2', '#4A00E0']}
        style = {styles.buttonLogin}
        >
          <TouchableOpacity onPress={checkLogin}>
              <Text style = {styles.textButton}>Đăng Nhập</Text>
          </TouchableOpacity>
        </LinearGradient>

        <View style = {styles.registrationView}>
          <Text>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style = {styles.buttonRegistration}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
  </TouchableWithoutFeedback>
)
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  viewTitle: {
    marginHorizontal: 40,
    marginBottom: 70,
    marginTop: 140,
  },
  title:  {
    color: '#5913F7',
    fontFamily:'Roboto-BlackItalic',
    fontSize: 50,
    textAlign: 'center', 
  },
  inputView: {
    marginHorizontal: 33,
  },
  titleInput: {
    fontSize: 20,
    marginBottom:7
  },
  input: {
    marginBottom:20,
    borderWidth: 1,
    borderColor: 'gray',
    fontSize: 20,
    borderRadius: 5,
    height: 30,
    backgroundColor:'whitesmoke'
  },
  buttonLogin: {
    backgroundColor: '#5913F7',
    marginHorizontal: 125,
    marginTop: 5,
    borderRadius: 40,
    height: 46,
    justifyContent: 'center'
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center', 
    color: "white",
  },
  registrationView: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonRegistration: {
    color: '#0091FC'
  },
  textSkip: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  }
})

export default Login