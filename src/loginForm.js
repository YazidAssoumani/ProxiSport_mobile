import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {};
export default class Dashboard extends Component<Props> {

    state ={
        showPass: true,
        identificationLogin : '',
        identificationPassword : ''
    }

    
  showPass = () => {
    if(this.state.press == false) {
      this.setParentState({ showPass: false, press: true})
    }
    else {
      this.setParentState({ showPass: true, press: false})
    }
  }

    _onLogin(){
        
        fetch(
            'http://proxisport.it-students.fr/login', {
              method:'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: this.state.identificationLogin,
                password: this.state.identificationPassword,
              }),
            })
            .then((response) => response.json())
            .then((datas)=>{
              if(datas.message == "ok") {
                this.props.setParentState({isLogged : true}) ;
                console.log(this.state)
                alert('Vous êtes connecté')
              } else {
                this.setState({identificationPassword:''})
                alert(datas.message) ;
              }
            })
        }      

    render(){
        return(
            <View style={styles.login}>
                  <View style={{flexDirection:'row'}}>
                    <TextInput autoCapitalize='none' style={styles.input} placeholder="Email" onChangeText={(text)=>{this.setState({identificationLogin:text})}} />
                    <Icone name={'email'} size={28} color={'rgba(0, 0, 0, 1)'} 
                  style={styles.inputIcon} />
                    
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TextInput autoCapitalize='none' style={styles.input} secureTextEntry={this.state.showPass} placeholder="Password" value = {this.state.identificationPassword}  onChangeText={(text)=>{this.setState({identificationPassword:text})}} />
                    <Icon name={'lock'} size={28} color={'rgba(0, 0, 0, 1)'} 
                  style={styles.inputIcon} />
                    <TouchableOpacity style={styles.btnEye} onPress={()=>{this.setState({ showPass: !this.state.showPass})}}>
                      <Icon name={this.state.showPass ? 'eye' : 'eye-slash'} size={26} color={'rgba(0,0,0,1)'} />
                    </TouchableOpacity>
                  
                  </View>
                  <TouchableOpacity onPress={this._onLogin.bind(this)} style={styles.button}>
                    <Text style={styles.text_button}> Identification </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.props.setParentState({islogin: false});}} style={styles.button}>
                    <Text style={styles.text_button}> Créer un compte </Text>
                  </TouchableOpacity>
                </View>
        )
    }
}
const {width} = Dimensions.get('window')
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