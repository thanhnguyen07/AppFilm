import { View, Text, StyleSheet, ScrollView, 
  TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import LinearGradient from 'react-native-linear-gradient';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LoadingScreen from './LoadingScreen';
import getData from '../components/getData';
import getDataUser from '../components/getDataUser'


function Playlist({ navigation, route}){
  const {idUser} = route.params;
  const dataFilms = getData();
  const dataUsers = getDataUser();
  
  if (dataUsers.length != 0){
      const dataUser = dataUsers.find((element) => {
        return element._id === idUser
      });
      const dataList = dataUser.playlist
      const renderList = dataList.map((element) => {
        const idFilmList = element;
        const x =dataFilms.map((element, index) => {
          const dataFilm = element;
          const idFilm = dataFilm._id;
          if( idFilm == idFilmList) {
            return(
            <TouchableOpacity 
            key = {index}
              onPress={() => { navigation.navigate('DetailScreenNew',{
                idFilm: dataFilm._id,
                idUser,
                dataFilms
                  }
              )}}
              style={styles.viewFilmsTrending} >
                <Image source={{uri: dataFilm.avatar}}
                  style={styles.avatar} />
                <View style={styles.viewTextsTrending}>
                  <Text style={styles.titleFilmTrending}>{dataFilm.title}</Text>
                  <Text style={styles.textTrending}>Thời Lượng: {dataFilm.time}</Text>
                  <Text style={styles.textTrending}>Trạng Thái: {dataFilm.quality}</Text>
                  <Text style={styles.textTrending}>
                    Nội Dung Phim: {dataFilm.overview.slice(0, 160)}...
                  </Text>
                </View>
            </TouchableOpacity>
            )
          }
        })
        return x;
      })

      return (
        <LinearGradient 
        colors = {['#FFEFBA', '#FFFFFF']}
        style = {styles.container}
        > 
        {/* {console.log('Render Playlist')} */}
          <View style = {styles.viewHeader}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons
              name='chevron-left'
              color='white'
              size={45}
              style = {styles.iconBack}
            />
            </TouchableOpacity>
          <Text style ={styles.textHeader}>Danh Sách Xem Sau</Text>
          </View>
          <ScrollView>
          {renderList}
          </ScrollView>
        </LinearGradient>
      )
    }
    else {
      return (
        <View>
          <LoadingScreen/>
        </View>
      )   
    }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewHeader: {
    marginTop:40,
    flexDirection: 'row',
    // justifyContent: 'center'
  },
  textHeader:{
    marginLeft: 24,
    fontSize: 30,
    textAlign: 'center',
  },
  iconBack: {
    color: 'gray'
  },
  viewFilmsTrending: {
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
  },
  avatar: {
    width: 150, 
    height: 200, 
    borderRadius: 20
  },
  titleFilmTrending: {
    color: 'red',
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
  textTrending: {
    marginLeft: 10,
    marginTop: 5,
    marginRight: 10
  },
  viewTextsTrending: {
    width: 200,
  },
})
export default Playlist