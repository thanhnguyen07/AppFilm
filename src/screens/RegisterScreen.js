import { View, Text, ImageBackground, Alert,
  StyleSheet, TextInput, TouchableOpacity, 
  TouchableWithoutFeedback, Keyboard } from 'react-native';
import React, {useState, useEffect} from 'react';
import registerBg from '../assets/images/login-bg.png';
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import url from '../components/url';
const axios = require('axios').default


function Register({ navigation}) {
  const Url = url();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');
  
  const checkInput = email != '' && password != '' && name != ''
  
  const checkAndCreateUser =  () => {
    if(checkInput) {
      const postData = async() => {
        await axios.post(`${Url}/createUser`, {
          name: name,
          email: email,
          password: password,
        })
        .then( (res) => {
          if(res.data){
            Alert.alert('Email đã tồn tại!!!');
          }
          else {
            Alert.alert('Đăng ký thành công !!!');
            navigation.navigate('LoginScreen');
          }
        })
        .catch( (error) => {
            console.error(error);
        });
      }
      postData();
    } 
    else {
      Alert.alert('Vui lòng nhập đủ thông tin !!!');
    }
  }
  return (
  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  <ImageBackground
    style = {styles.background}
    source={registerBg} >
  
      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}
      style={styles.viewHeader} >
        <EvilIcons
          name='chevron-left'
          size={45}
          style = {styles.iconBack}
        />
      <Text style = {styles.textHeader}>Đăng Nhập</Text>
      </TouchableOpacity>


    <View style={styles.viewTitle}>
      <Text style = {styles.title}>Tạo Tài Khoản Mới</Text>
    </View>
    <View style = {styles.inputView}>
        <View>
          <Text style = {styles.titleInput}>Tên Tài Khoản</Text>
          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            clearButtonMode ='always'
            keyboardAppearance = 'dark'
            style={styles.input}
            placeholder='VD: Nguyễn Văn A'
            placeholderTextColor="#5913F7"
            maxLength = {30}
          />
        </View>
        <View>
          <Text style = {styles.titleInput}>Email</Text>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            clearButtonMode ='always'
            keyboardAppearance = 'dark'
            keyboardType = 'email-address'
            style={styles.input}
            placeholder='example@gmail.com'
            placeholderTextColor="#5913F7"
            maxLength = {30}
          />
        </View>
        <View>
          <Text style = {styles.titleInput}>Mật Khẩu</Text>
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            clearButtonMode ='always'
            keyboardAppearance = 'dark'
            secureTextEntry = {true}
            placeholder='********'
            placeholderTextColor="#5913F7"
            maxLength = {20}
            style={styles.input}
          />
        </View>
      </View>
    <LinearGradient
    colors={['#8E2DE2', '#4A00E0']}
    style = {styles.buttonLogin}
    >
      <TouchableOpacity onPress = { checkAndCreateUser } >
        <Text style = {styles.textButton}>Đăng Ký</Text>
      </TouchableOpacity>
    </LinearGradient>
  </ImageBackground>
  </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  viewHeader: {
    marginTop: 40,
    flexDirection: 'row',
  },
  viewTitle: {
    marginHorizontal: 40,
    marginTop: 70,
  },
  iconBack: {
  },
  textHeader: {
    textAlign: 'center', 
    fontSize: 20,
    marginTop: 5,
  },
  title:  {
    color: '#5913F7',
    fontFamily:'Roboto-BlackItalic',
    fontSize: 35,
    textAlign: 'center', 
  },
  inputView: {
    marginTop: 70,
    marginHorizontal: 20,
  },
  titleInput: {
    fontSize: 20,
    marginBottom:7
  },
  input: {
    marginBottom:20,
    borderWidth: 1,
    fontSize: 20,
    borderRadius: 5,
    height: 30,
    backgroundColor:'gray',
  },
  buttonLogin: {
    backgroundColor: '#5913F7',
    marginHorizontal: 140,
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
})
export default Register