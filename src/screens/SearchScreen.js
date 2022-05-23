import { View, Text, TouchableOpacity, StyleSheet, Image,
   TouchableWithoutFeedback, Keyboard, TextInput} from 'react-native'
import React, {useState, useEffect} from 'react'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import LinearGradient from 'react-native-linear-gradient';




const Search = ({navigation,route}) => {
  const {dataFilms, idUser} = route.params;
  const [input,setInput] = useState('Search')
  const [dataFilm,setDataFilm] = useState()
  const [show1,setShow1] = useState(false)
  const [show2,setShow2] = useState(false)
  const handlerSearch = () => {
    const check = dataFilms.find((element) => {
      const title = element.title
      return title.toLowerCase() === input.toLowerCase()
    })
    if(check != undefined){
      setDataFilm(check)
      setShow1(false)
      setShow2(true)
    }
    else{
      setShow1(true)
      setShow2(false)
    }
  }

  const viewSearchButton= (
    <LinearGradient
        colors={['#C6FFDD', '#0000']}
        style={styles.viewInput}
        >
          <TouchableOpacity onPress={() => navigation.navigate('HomeStack')}>
          <EvilIcons
          name='chevron-left'
          size={45}
          style = {styles.IconBack}
          />
          </TouchableOpacity>
          <TextInput
          clearButtonMode ='always'
          onChangeText={text =>setInput(text)}
          placeholder= {input}
          fontSize= {18}
          style = {styles.input}
          />
          <TouchableOpacity onPress={handlerSearch}
          style = {styles.IconSearch} >
          <EvilIcons
          name="search"
          size={30}
          />
          </TouchableOpacity>
        </LinearGradient>
  )

  const renderResult = (dataFilm) => {
   return(
    <TouchableOpacity
     onPress={() => { navigation.navigate('DetailScreen',{
      idFilm: dataFilm._id,
      idUser,
      dataFilms
    })}}
    style={styles.viewFilm} >
      <Image source={{uri: dataFilm.avatar}}
        style={styles.avatar} />
      <View style={styles.viewTexts}>
        <Text style={styles.titleFilm}>{dataFilm.title}</Text>
        <Text style={styles.text}>Thời Lượng: {dataFilm.time}</Text>
        <Text style={styles.text}>Trạng Thái: {dataFilm.quality}</Text>
        <Text style={styles.text}>
          Nội Dung Phim: {dataFilm.overview.slice(0, 160)}...
        </Text>
      </View>
  </TouchableOpacity>
   )
  }
  


  return (
    <TouchableWithoutFeedback 
    onPress={Keyboard.dismiss}
    style={styles.container}
    > 
    <LinearGradient colors={['#C6FFDD', '#FBD786', '#f7797d']}
    style={styles.container}>
      {viewSearchButton}
      {show1 && <View style = {styles.noResult}>
        <Text style = {styles.textNoResult}>Không tìm thấy phim !!!</Text>
      </View>}
      {show2 && <View>{renderResult(dataFilm)}</View>}
    </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewInput: {
    marginTop:50,
    flexDirection: 'row',
    // justifyContent:'space-between',
    marginHorizontal: 30,
    borderRadius: 8,
  },
  input: {
    width: 250,
    // borderRadius: 8,
    // backgroundColor: 'red'
  },
  IconSearch: {
    marginTop:5
  },
  IconBack: {
    // marginLeft: 10
  },
  noResult: {
    marginTop: 40,
  },
  textNoResult: {
    textAlign: "center",
    fontSize: 20,
    color: 'red'
  },
  viewFilm: {
    marginHorizontal: 20,
    marginTop: 40,
    flexDirection: 'row',
  },
  viewTexts: {
    width: 220,
  },
  titleFilm: {
    color: 'red',
    marginLeft: 10,
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
  },
  text: {
    marginLeft: 10,
    marginTop: 5,
    marginRight: 10
  },
  avatar: {
    width: 150, 
    height: 200, 
    borderRadius: 20
  },
})
export default Search