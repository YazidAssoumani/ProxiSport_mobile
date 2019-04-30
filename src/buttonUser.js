import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {};
export default class ButtonUser extends Component<Props> {   

    state ={
        User: true
    }

    render(){
        return(
            <View style={styles.login}>

                  <View style={{flexDirection:'row'}}>
                  <TouchableOpacity onPress={()=>{this.props.setParentState({buttonUser: !this.state.User});}} style={styles.buttonUser}>
                    <Text style={styles.text_button}> Connexion </Text>
                  </TouchableOpacity>
                  </View>
            </View>
        )
    }
}
const {width} = Dimensions.get('window')
const styles = StyleSheet.create({

    buttonUser: {
      width : width - 255,
      backgroundColor: "#003BE9",
      borderColor: 'white',
      borderWidth: 2,
      padding: 5,
      marginBottom: 10,
      alignSelf: 'flex-end'
    },
    text_button:{
      color: 'white',
      fontSize: 15,
      textAlign: 'center'
    },

  });