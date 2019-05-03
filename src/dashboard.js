import React, {Component} from 'react';
import { View, TextInput, Dimensions, FlatList, Modal, Text, TouchableHighlight,TouchableOpacity } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE, Button} from 'react-native-maps';



export default class Dashboard extends Component<Props> {
    state = {
        coords : {
            latitude: 46.1531,
            longitude: 4.9206,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        },
        coords_marker : {
            latitude: 46.15,
            longitude: 4.92,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        },
        coords_marker2 : {
            latitude: 45.751,
            longitude: 4.851,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        },
        markers: [],
        modalVisible: false,
        currentMarker : {}
    }
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }


  closeModal() {
    this.setState({modalVisible:false});
  }

    _onRegionChangeComplete(region) {
        console.log(region)
        var url = 'http://proxisport.it-students.fr/map?'+
        'boundsNE[lat]=' + (region.latitude + region.latitudeDelta).toString() + 
        '&boundsNE[lng]=' + (region.longitude + region.longitudeDelta).toString() + 
        '&boundsSW[lat]=' + (region.latitude - region.latitudeDelta).toString() + 
        '&boundsSW[lng]=' + (region.longitude - region.longitudeDelta).toString() ;
        console.log(url)
        fetch(url, {
           method: 'GET',
           credentials: 'same-origin',
           headers: {
              'content-Type': 'application/json',
            },
        })
         .then((response) => response.json())
         .then((datas) => {
             console.log(datas)
             for (var i in datas) {
                 datas[i].key = datas[i]._id
             }
           this.setState({
              markers: datas
           })
           console.log(this.state.markers)
         }).catch(function (error) { // Pour le warning d'erreur "unhandled promise rejection"
         console.log('There has been a problem with your fetch operation: ' + error.message);
          // ADD THIS THROW error
          throw error;
          });
        }
        _onPress (marker) {
            console.log("marker clicked")
            console.log(marker) ;
            this.setState({currentMarker : marker})
            this.setModalVisible(true) ;
        }

///ajouter commentaire////
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
        /////fin ajout commentaire///
    
    render() {
        return (
            <View style={{ flex:1}}>
            <Modal   
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                style={{paddingTop:130}}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{marginTop: 82}}>
                    <View style={{textAlign:"center"}}>
                        <Text style={styles.text} style={{textAlign:"center"}}> Déscription de l'endroit:
                        {'\n'+this.state.currentMarker.nom+ '\n'}
                           {this.state.currentMarker.AnneeServiceLib+ '\n'}
                           {this.state.currentMarker.NatureLibelle+ '\n'}
                           {this.state.currentMarker.NatureSolLib}
                        </Text>
                        
                        <TouchableOpacity style={{justifyContent:"center"}} onPress={() => {
                            this.setState({modalVisible: false})
                            } }>

                        <Text style={styles.text_button }> close </Text>
                        </TouchableOpacity>    
                    </View>
                </View>
            </Modal>

  
            <MapView style={styles.map} 
                provider={PROVIDER_GOOGLE} 
                initialRegion={this.state.coords}
                onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
                >
                    {
                    this.state.markers.map(marker => {
                        return (
                            <Marker 
                                coordinate={{latitude: JSON.parse(marker.coords.lat), longitude: JSON.parse(marker.coords.lng)}}
                                onPress={()=>{this._onPress(marker)}}
                                />
                            )
                        })
                    }
                    <TextInput 
                        style={styles.input}
                        autoCapitalize={'none'}
                        placeholder="Recherche"
                        onChangeText={()=>{}}
                    />
                
                </MapView>
            </View>
        );
    }
}

const {height, width} = Dimensions.get('window');


const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 30,
        fontWeight: '700',
        color: '#59656C',
        marginBottom: 10,
    },
    map: {
        height: height,
        width: width,
        flex:1,
        margin:0,
        padding:0
    },
    input: {
      height: 40,
      marginLeft: 3,
      marginRight: 3,
      borderColor:'silver',
      borderWidth:1,
      alignSelf: 'stretch',
      //flex: 1,
      paddingHorizontal: 5,
      marginTop: 50,
      borderRadius: 200,
      backgroundColor: 'white',
    },

    text_button: {
       
        paddingTop:50,
        fontSize: 30,
        fontWeight: '200',
        color: 'red',
      }
};

