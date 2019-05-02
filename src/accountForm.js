import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, ImageBackground, Image, TextInput, Dimensions, TouchableOpacity, TouchableNativeFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {};
export default class Dashboard extends Component<Props> {

    state ={
        showPass: true,
        createNom : '',
        createPrenom : '',
        createEmail : '',
        createPassword : '',
        createBirth : '',
    }

    
  showPass = () => {
    if(this.state.press == false) {
      this.setParentState({ showPass: false, press: true})
    }
    else {
      this.setParentState({ showPass: true, press: false})
    }
  }

    _onCreate(){

        fetch(
            'http://proxisport.it-students.fr/users', {
              method:'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                nom: this.state.createNom,
                prenom: this.state.createPrenom,
                birth: this.state.createBirth,
                email: this.state.createEmail,
                password: this.state.createPassword,
              }),
            })
            .then((response) => response.json())
            .then((datas)=>{
                console.log(datas);
              if(datas.message == 'ok') {
                alert("compte créer :)")
                this.props.setParentState({isLogged : true}) ;
                console.log(this.state)
              }
              else {
                alert(datas.message) ;
              }
            })
        }      

    render(){
        return(
            <View style={styles.login}>
                  <View style={{flexDirection:'row'}}>
                    <TextInput autoCapitalize='none' style={styles.input} placeholder="Nom" onChangeText={(text)=>{this.setState({createNom:text})}} />
                    <Icon name={'user'} size={28} color={'rgba(0, 0, 0, 1)'} 
                  style={styles.inputIcon} />
                    
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TextInput autoCapitalize='none' style={styles.input} placeholder="Prenom" onChangeText={(text)=>{this.setState({createPrenom:text})}} />
                    <Icon name={'user'} size={28} color={'rgba(0, 0, 0, 1)'} 
                  style={styles.inputIcon} />
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TextInput autoCapitalize='none' style={styles.input} placeholder="Email" onChangeText={(text)=>{this.setState({createEmail:text})}} />
                    <Icone name={'email'} size={28} color={'rgba(0, 0, 0, 1)'} 
                  style={styles.inputIcon} />
                  </View>
                  <View style={{flexDirection:'row'}}>
                    <TextInput autoCapitalize='none' style={styles.input} placeholder="YYYY" onChangeText={(text)=>{this.setState({createBirth:text})}} />
                  </View>

                  <View style={{flexDirection:'row'}}>
                    <TextInput autoCapitalize='none' style={styles.input} secureTextEntry={this.state.showPass} placeholder="Password" value = {this.state.createPassword}  onChangeText={(text)=>{this.setState({createPassword:text})}} />
                    <Icon name={'lock'} size={28} color={'rgba(0, 0, 0, 1)'} 
                  style={styles.inputIcon} />
                    
                    <TouchableOpacity style={styles.btnEye} onPress={()=>{this.props.setParentState({ showPass: !this.state.showPass})}}>
                      <Icon name={this.state.showPass ? 'eye' : 'eye-slash'} size={26} color={'rgba(0,0,0,1)'} />
                    </TouchableOpacity>

                  </View>
                  <TouchableOpacity onPress={this._onCreate.bind(this)} style={styles.button}>
                    <Text style={styles.text_button}> Créer </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={()=>{this.props.setParentState({islogin: true});}} style={styles.button}>
                    <Text style={styles.text_button}> Retour </Text>
                  </TouchableOpacity>
                  <View>
                    <TouchableOpacity onPress={() => {Linking.openURL("http://proxisport.it-students.fr/cgu")} }>
                            <Text style={styles.text_button}> CGU </Text>       
                    </TouchableOpacity>
                  </View>
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