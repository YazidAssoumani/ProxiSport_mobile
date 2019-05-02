/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity, TouchableNativeFeedback, Linking} from 'react-native';
import bgImage from './assets/images/background_user.jpg';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from './src/dashboard.js';
import AccountForm from './src/accountForm.js';
import LoginForm from './src/loginForm.js';
import ButtonUser from './src/buttonUser.js';
import {AsyncStorage} from 'react-native';

const {height, width} = Dimensions.get('window');
console.log(width)

type Props = {};
export default class App extends Component<Props> {

  constructor() {
    super()
    this.state={
    islogin: true,
    isLogged: false,
    buttonUser: true
    }
  }
  
  render() {
    return (
      <ImageBackground source={bgImage} style={styles.backgroundContainer}>
        <View style={styles.container}>

            {
              (this.state.buttonUser) ? (
                <View>
                  <Image source={require('./assets/images/logo.png')} style={styles.logo}/>
                  <ButtonUser setParentState={this.setState.bind(this)}/>
                </View>
                
              ) : (
                (this.state.isLogged) ? (
                  <Dashboard />
                ) : (
                  (this.state.islogin) ? (
                    <View>
                      <Image source={require('./assets/images/logo.png')} style={styles.logo}/>
                      <LoginForm setParentState={this.setState.bind(this)} />
                    </View>
                    
                  ) : (
                    <View>
                      <Image source={require('./assets/images/logo.png')} style={styles.logo}/>
                      <AccountForm setParentState={this.setState.bind(this)}/>
                    </View>
                      
                  )
                )
              )
            }

        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
    width: null,
    height: null,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex:1,
    paddingTop : 20,
    paddingHorizontal:50,
    alignItems: 'center'
  },
  logo: {
    width:100,
    height: 100
  },
  input:{
    width : width - 55 ,
    height:40,
    borderRadius: 25,
    borderColor:'silver',
    borderWidth:1,
    backgroundColor: 'white',
    textAlign: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 20
  },
  inputIcon:{
    position: 'absolute',
    top: 8,
    left: 17,
    marginBottom: 10
  },
  button: {
    width : width - 155,
    backgroundColor: "#432577",
    borderColor: 'white',
    borderWidth: 2,
    padding: 5,
    marginBottom: 10
  },
  text_button:{
    color: 'white',
    fontSize: 15,
    textAlign: 'center'
  },
  login:{
    flex: 1,
    alignItems: 'center'
  },
  btnEye :{
    position: 'absolute',
    top: 8,
    right: 17
  }
});