import { 
  View, Text, TouchableOpacity, 
  StyleSheet, Image, ScrollView,
  ImageBackground
  } from 'react-native';
import React from 'react';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import LoadingScreen from './LoadingScreen';
import loading from '../assets/images/loading.gif';
import getData from '../components/getData'

const Home = ({navigation, route}) => {
  const {idUser} = route.params;
  const dataFilms = getData()
 

  let totalPoint = 0;
  dataFilms.map((element) => {
    totalPoint += element.point;
  })
  const pointAvg = totalPoint/(dataFilms.length);
 
  const renderAllFilms = (dataFilm, index) => (
    <TouchableOpacity key = {index} 
    onPress={() => { navigation.navigate('DetailScreen',{
        idFilm: dataFilm._id,
        idUser,
        dataFilms
      })}}
    style={styles.itemFilmAll}
    >  
      <ImageBackground
      source = {loading}
      style = {styles.viewLoading}
      >
        <Image source={{uri: dataFilm.avatar}}
        style={styles.avatar}/>
      </ImageBackground>
      <Text style={styles.titleFilmAll}> {dataFilm.title} </Text>
    </TouchableOpacity>
  )
  const renderTrending = (dataFilm, index) => {
    if(dataFilm.point > pointAvg ){ return(
      <TouchableOpacity key = {index}
      onPress={() => { navigation.navigate('DetailScreen',{
        idFilm: dataFilm._id,
        idUser,
        dataFilms
      })}}
      style={styles.viewFilmsTrending} >
        <ImageBackground
        source = {loading}
        style = {styles.viewLoading}>
          <Image source={{uri: dataFilm.avatar}}
          style={styles.avatar}/>
        </ImageBackground>
        <View style={styles.viewTextsTrending}>
          <Text style={styles.titleFilmTrending}>{dataFilm.title}</Text>
          <Text style={styles.textTrending}>Thời Lượng: {dataFilm.time}</Text>
          <Text style={styles.textTrending}>Trạng Thái: {dataFilm.quality}</Text>
          <Text style={styles.textTrending}>
            Nội Dung Phim: {dataFilm.overview.slice(0, 160)}...
          </Text>
        </View>
    </TouchableOpacity>
    )}
  }

  const viewHeader = (
    <View style={styles.viewHeader}>
      <Text style= {styles.titleHome}>Trang Chủ</Text>
      <TouchableOpacity onPress={() => navigation.navigate('SearchScreen',{dataFilms: dataFilms, idUser})} >
        <SearchIcon
          name="md-search-circle-sharp"
          size={45}
          style = {styles.searchButton}
          />
      </TouchableOpacity>
    </View>
  );
  const viewAllFilms = (
    <View style={styles.viewAllFilms}>
      <ScrollView horizontal={true} >
          {dataFilms.map(renderAllFilms)}
      </ScrollView>
    </View>
  );
  const viewTrending = (
    <View style={styles.viewTrending}>
      <Text style= {styles.titleTrending}>Thịnh Hành</Text>
      <ScrollView>
          {dataFilms.map(renderTrending)}
      </ScrollView>
    </View>
  )

  if (dataFilms.length != 0){
    return (
      <LinearGradient colors={['#659999', '#f4791f']}
      style={styles.container} >
        {/* {console.log('Render Home')} */}
        {viewHeader}
        {viewAllFilms}
        {viewTrending}
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
    flex: 1.2,
    flexDirection: 'row',
    justifyContent:'space-between',
  },
    titleHome: {
      marginTop: 40,
      textAlign: 'center',
      color: '#FFFF',
      fontSize: 30,
      fontFamily: 'Roboto-Black',
      marginLeft: 20,
    },
    searchButton: {
      marginRight:10,
      marginTop: 30,
      color:'#ffff'
    },

  viewAllFilms: {
    flex: 3.5,
  },
    itemFilmAll: {
      marginHorizontal: 10,
    },
    titleFilmAll: {
      marginTop: 5,
      textAlign: 'center',
      color: 'yellow',
      fontFamily: 'Roboto-Bold',
    },

  viewTrending: {
    flex: 7,
  },
    titleTrending:{
      fontSize: 30,
      color: 'green',
      // textAlign: 'center',
      fontFamily: 'Roboto-Black',
      marginLeft: 20,
      // backgroundColor: 'gray',
    },
    viewFilmsTrending: {
      marginHorizontal: 20,
      marginTop: 20,
      flexDirection: 'row',
    },
    viewTextsTrending: {
      width: 200,
    },
    titleFilmTrending: {
      color: 'yellow',
      marginLeft: 10,
      fontSize: 20,
      fontFamily: 'Roboto-Bold',
    },
    textTrending: {
      marginLeft: 10,
      marginTop: 5,
      marginRight: 10
    },

  avatar: {
    width: 150, 
    height: 200, 
    borderRadius: 20
  },
  viewLoading: {
    borderRadius: 20,
    width: 150, 
    height: 200,
    overflow: 'hidden',
  },
})
export default Home