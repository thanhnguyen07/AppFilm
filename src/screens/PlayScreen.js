import React from "react";
import { ImageBackground , StyleSheet, View, Text } from "react-native";
import Video from 'react-native-video';
import loading from '../assets/images/loading.gif';
import url from '../components/url';


export default  PlayScreen = ({route}) => {
  const {idVideo, name} = route.params;
  const Url = url();
    return (
      <View style = {styles.container}>
        <View style = {styles.viewName}>
        <Text style = {styles.Name}>{name}</Text>
        </View>
        <ImageBackground source = {loading} 
        resizeMode = 'contain'
        style = {styles.viewView}>
          <Video source={{ uri: `${Url}/video?id=${idVideo}`}}   
            ref={(ref) => {
            this.player = ref
          }}
          controls 
          onBuffer={this.onBuffer}                
          onError={this.videoError}               
          style={styles.Video} />
        </ImageBackground>
      </View>
    );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'gray'
  },  
  viewView: {
    flex: 1,
    marginBottom: 230,
    // backgroundColor: 'red'
  },
  Video: {
    position: 'absolute',
    top: 90,
    left: 0,
    bottom: 90,
    right: 0,
  },
  viewName: {
    // backgroundColor: 'blue',
    marginTop: 80,
  },
  Name: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily:'Roboto-Bold',
    color: 'red'
  }
});