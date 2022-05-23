import { 
  View, Text, TouchableOpacity,
  StyleSheet, Image, ScrollView,
  ImageBackground,
  } from 'react-native';
import React, {useState} from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IconLike from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import url from '../components/url';
import getDataUser from '../components/getDataUser';
import LoadingScreen from './LoadingScreen';
import YoutubePlayer from "react-native-youtube-iframe";
import IconAdd from 'react-native-vector-icons/MaterialIcons';
import loading from '../assets/images/loading.gif';
const axios = require('axios').default;

const DetailScreen = ({navigation, route}) => {
  const [showList,setShowList] =useState (true);
  const [showAddList,setShowAddList] =useState (false)
  const [showDellList,setShowDellList] =useState (false)
  const [showLike,setShowLike] =useState (true);
  const [showAddLike,setShowAddLike] =useState (false)
  const [showDellLike,setShowDellLike] =useState (false)
  const Url = url();
  const { idFilm, idUser, dataFilms } = route.params;
  const dataUsers = getDataUser();
  const dataUser = dataUsers.find((element) => {
    return (element._id === idUser)
  });
  const dataFilm = dataFilms.find((data) => {
    return (data._id === idFilm)
  })

  const addPlayList = ()=>{
    const postData = async () =>{
      await axios.post(`${Url}/addList`,
      {
        idUser: dataUser._id,
        idFilm: idFilm
      })
      .then ((res) => {
        const dataRes= res.data;
        if(dataRes.checkList) {
          if(dataRes.addList){
            // Alert.alert('Đã thêm vào danh sách xem sau!!!')
            setShowList(false),
            setShowDellList(true)
            setShowAddList(false)
          }
        }
      })
    }
    postData()
  }

  const dellList = () => {
    const postData = async () =>{
      await axios.post(`${Url}/dellList`,
      {
        idUser: dataUser._id,
        idFilm: idFilm
      })
      .then ((res) => {
        if (res.data) {
          // Alert.alert('Đã xoá phim khỏi danh sách xem sau')
          setShowList(false),
          setShowAddList(true)
          setShowDellList(false)
        }        
      })
    }
    postData()
  }
  const like = () => {
    const postData = async () =>{
      await axios.post(`${Url}/like`,
      { 
        idUser: idUser,
        idFilm: idFilm
      })
      .then ((res) => {
        const dataRes =res.data
        if(dataRes){
          upPoint();
          setShowLike(false);
          setShowAddLike(false);
          setShowDellLike(true)
        }
        else {
          // Alert.alert('Bạn đã Like phim này rồi!')
        }
      })
    }
    postData()
  }

  const unLike = async() => {
      await axios.post(`${Url}/unLike`,
      { 
        idUser: idUser,
        idFilm: idFilm
      })
      .then ((res) => {
        downPoint();
        setShowLike(false);
        setShowAddLike(true);
        setShowDellLike(false)
      })
  }

  const upPoint= () => {
    const postData = async () =>{
      await axios.post(`${Url}/upPoint`,
      { 
        idFilm: idFilm
      })
      .then ((res) => {
        // console.log('Up point: ',res.data)
      })
    }
    postData()
  }
  const downPoint= () => {
    const postData = async () =>{
      await axios.post(`${Url}/downPoint`,
      { 
        idFilm: idFilm
      })
      .then ((res) => {
        // console.log('Down point: ',res.data)
      })
    }
    postData()
  }


  

  ///////////////Render UI////////////////////////////
  if (dataFilms.length != 0 && dataUsers.length != 0) {
    //////////////LIKE//BUTTON///HANDLER//////////////////////////////
    const likeHandler = () => {
      const dataLike = dataUser.like;
      const checkLike = dataLike.find((element) => {return element === idFilm})
      if (checkLike != undefined){
        return ( 
          <TouchableOpacity  onPress = {unLike}
          style = {styles.buttonLike}>
          <IconLike
          name="heart"
          size={45}
          />
          </TouchableOpacity>
        )
      }
      else {
        return (
          <TouchableOpacity  onPress = {like}
          style = {styles.buttonLike}>
          <IconLike
          name="heart-outlined"
          size={45}
          />
          </TouchableOpacity>
        )
      }
    }
    const buttonAddLike =(
      <TouchableOpacity  onPress = {like}
          style = {styles.buttonLike}>
          <IconLike
          name="heart-outlined"
          size={45}
          />
      </TouchableOpacity>
    )
    const buttonDellLike =(
      <TouchableOpacity  onPress = {unLike}
          style = {styles.buttonLike}>
          <IconLike
          name="heart"
          size={45}
          />
        </TouchableOpacity>
    )

    //////////////PLAYLIST//BUTTON///HANDLER//////////////////////////////
    const listHandler = () => {
      const dataList = dataUser.playlist;
      const checkList = dataList.find((element) => {return element === idFilm})
      if (checkList != undefined){
        return ( 
          <TouchableOpacity onPress = {dellList}
          style = {styles.buttonAdd}>
            <IconAdd
            name="playlist-add-check"
            size={45}
            />
          </TouchableOpacity>
        )
      }
      else {
        return (
          <TouchableOpacity onPress = {addPlayList}
          style = {styles.buttonAdd}>
            <IconAdd
            name="playlist-add"
            size={45}
            />
          </TouchableOpacity>
        )
      }
   }
   const buttonAddList =(
    <TouchableOpacity onPress = {addPlayList}
    style = {styles.buttonAdd}>
      <IconAdd
      name="playlist-add"
      size={45}
      />
    </TouchableOpacity>
   )
   const buttonDellList = (
    <TouchableOpacity onPress = {dellList}
    style = {styles.buttonAdd}>
      <IconAdd
      name="playlist-add-check"
      size={45}
      />
    </TouchableOpacity>
   )
  //////////////////////////////////////////////////////////
    const viewButton = (
      <View style = {styles.viewButton}>
        {showLike && likeHandler()}
        {showAddLike && buttonAddLike}
        {showDellLike && buttonDellLike}
        <LinearGradient 
        colors={['#8E2DE2', '#4A00E0']}
        style = {styles.buttonPlay} >
          <TouchableOpacity onPress={() => {
          navigation.navigate("PlayScreen",{
            idVideo: dataFilm.video,
            name : dataFilm.name
          })
          }}>
              <Text style = {styles.textButton}>Xem Phim</Text>
          </TouchableOpacity>
        </LinearGradient>
        {showList && listHandler()}
        {showAddList && buttonAddList}
        {showDellList && buttonDellList}
      </View>
    )
    const viewHeader = (
      <View style = {styles.viewHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <EvilIcons
              name='chevron-left'
              color='white'
              size={45}
              style = {styles.iconBack}
            />
          </TouchableOpacity>
          <Text style ={styles.textHeader}>Chi Tiết</Text>
        </View>
    );
    const viewTrailer = (
      <ImageBackground 
      source={loading}
      style = {styles.viewTrailer}>
        <YoutubePlayer
        height={220}
        videoId={dataFilm.trailer} />
      </ImageBackground>
    );
    const viewDetails = (
      <View style = {styles.viewDetails}>
          <View>
            <Text style = {styles.textName}>{dataFilm.name}</Text>
          </View>
          {viewButton}
          <Text style = {styles.textDetail} >Thời Lượng: {dataFilm.time} </Text>
          <Text style = {styles.textDetail} >Trạng Thái: {dataFilm.quality}</Text>
          <Text style = {styles.textDetail} >Năm Sản Xuất: {dataFilm.release_date}</Text>
          <Text style = {styles.textDetail} >Quốc Gia: {dataFilm.country}</Text>
          <Text style = {styles.titleOverview} >Nội dung phim:</Text>
          <Text style = {styles.textOverview} >{dataFilm.overview}</Text>
        </View>
    );
    const renderImages = (element,index) => (
      <ImageBackground key = {index}
      source = {loading}
      style = {styles.viewImage}>
        <Image
          source = {{uri: element}}
          style = {styles.Images}
        />
      </ImageBackground>
    )
    const viewImages = (
      <View style = {styles.viewImages}>
          <ScrollView 
          horizontal={true}>
            {dataFilm.images.map(renderImages)}
          </ScrollView>
        </View>
    )
    return (
      <LinearGradient 
      colors = {['#FFFDE4', '#005AA7']}
      style = {styles.container}>
      {/* {console.log('Render Detail')} */}
        {viewHeader}
        <ScrollView>
        {viewTrailer}
        {viewDetails}
        {viewImages}
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
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewTrailer: {
    marginTop: 5,
    height: 210,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  viewDetails: {
    marginTop: 30,
  },
  viewImages: {
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  viewImage: {
    marginHorizontal: 10,
    width: 180, 
    height: 270, 
  },
  textHeader:{
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
    marginRight: 170,
  },
  iconBack: {
    marginTop: 10,
    color: 'gray'
  },
  Images: {
    width: 180, 
    height: 270, 
  },
  textDetail: {
    marginLeft: 20,
    marginTop: 8,
    fontSize: 16,
    color: 'white'
  },
  textName: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily:'Roboto-BlackItalic',
    color: 'yellow',
  },
  textPlay: {
    fontSize: 20,
    textAlign: 'center', 
  },
  titleOverview: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
    fontFamily:'Roboto-BlackItalic',
  },
  textOverview: {
    fontSize: 16,
    marginHorizontal: 20
  },
  buttonPlay: {
    backgroundColor: '#5913F7',
    marginTop: 30,
    borderRadius: 40,
    height: 46,
    justifyContent: 'center',
    width: 140,
    marginBottom: 30
  },
  buttonAdd : {
    justifyContent: 'center',
    marginRight: 30,
  },
  buttonLike: {
    justifyContent: 'center',
    marginLeft: 30
  },
  textButton: {
    fontSize: 20,
    textAlign: 'center', 
    color: "white",
    fontFamily:'Roboto-Black',
  },
})
export default DetailScreen