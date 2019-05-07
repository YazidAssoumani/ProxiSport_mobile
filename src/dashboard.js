import React, {Component} from 'react';
import { View, TextInput, Dimensions, FlatList, ScrollView, TouchableOpacity, Modal, Text, Textarea, Button } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { Container, Header, Tab, Tabs, ScrollableTab } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icona from 'react-native-vector-icons/FontAwesome5';
import Icone from 'react-native-vector-icons/MaterialCommunityIcons';

export default class Dashboard extends Component<Props> {
    map = null ;
    mapInput = null ;
    state = {
        comment:"",
        note:0,
        type : null,
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
    note(note) {
        this.setState({note : note})
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
            '&boundsSW[lng]=' + (region.longitude - region.longitudeDelta).toString()+
            (this.state.type ? ('&type=' + this.state.type) : '');
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

        _onPressHandle(data){
//            console.log(arguments)
//            console.log(this.state.coords)
            console.log(this.mapInput)

            fetch(
                'https://maps.googleapis.com/maps/api/place/details/json?placeid='+ data.place_id +'&key=AIzaSyB1J4K8WaIXRUifsbpyHasElywzjXDWyaE', {
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                })
                .then((response) => response.json())
                .then((datas)=>{
                    try {

                        var new_lat = datas.result.geometry.location.lat;
                        var new_lng = datas.result.geometry.location.lng;
                        var new_coords ={
                            latitude: new_lat,
                            longitude: new_lng,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121
                        }
                        console.log(new_coords)
                            this.setState({ region: new_coords}, ()=> {
                                console.log('updated')
                            })
//                        console.log(this.state.coords)
                    } catch(e) {
                        console.log('---- ', e)
                    }
                })
                .catch(function (error) {
                  console.log('Probleme fetch onpress');
                  throw error;
                })
        }

        _onPressHandleComment(data){
    //            console.log(arguments)
    //            console.log(this.state.coords)
                console.log(this.mapInput)
    
                var comment = {
                    comment: this.state.comment,
                    note: this.state.note,
                    } ;
                fetch(
                    // 'http://192.168.33.11:3000/comment/'+this.state.currentMarker._id, {
                        'http://proxisport.it-students.fr/comment/'+this.state.currentMarker._id, {
    
                        method:'POST',
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(comment),
                    })
                    .then((response) => response.json())
                    .then((datas)=>{
                        console.log(datas);
                        var currentMarker = this.state.currentMarker ;
                        var comments = currentMarker.comments || [] ;
                        comments.push(comment) ;
                        currentMarker.comments = comments ;
                        this.setState({currentMarker:currentMarker});
                        // afficher le commentaire
                    })
            }
    
    render() {
        return (
            <View style={{flex:1}}>

                {/* <Modal   
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
                            {
                                this.state.currentMarker && this.state.currentMarker.comments && this.state.currentMarker.comments.length ?
                                (
                                    this.state.currentMarker.comments.map(commentaire => {
                                        return (
                                            <Text>{commentaire.comment}</Text>
                                        )
                                    })
                                ) : null
                            }

                            <Text>Votre Commentaire :</Text>
                            <Textarea 
                                rowSpan={5} 
                                bordered placeholder="Textarea"
                                onChangeText={(text)=>{this.setState({comment:text})}}
                                />
                            <Text>Votre note :</Text>
                            <View style={{flexDirection:'row'}}>

                            <TouchableOpacity onPress={()=>{this.note(1)}}>
                                <Icon type='FontAwesome' name={this.state.note >= 1?'star':'star-o'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.note(2)}}>
                                <Icon type='FontAwesome' name={this.state.note >= 2?'star':'star-o'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.note(3)}}>
                                <Icon type='FontAwesome' name={this.state.note >= 3?'star':'star-o'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.note(4)}}>
                                <Icon type='FontAwesome' name={this.state.note >= 4?'star':'star-o'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>{this.note(5)}}>
                                <Icon type='FontAwesome' name={this.state.note >= 5?'star':'star-o'} />
                            </TouchableOpacity>
                            </View>
                            <Button block success onPress={this._onCreate.bind(this)}>
                                <Text>Enregistrer</Text>
                            </Button> 
            
                            <TouchableOpacity style={{justifyContent:"center"}} onPress={() => {
                                this.setState({modalVisible: false})
                                } }>

                            <Text style={styles.text_button }> close </Text>
                            </TouchableOpacity>    
                        </View>
                    </View>
                </Modal> */}

                <MapView style={styles.map}
                provider={PROVIDER_GOOGLE} 
                initialRegion={this.state.coords}
                region={this.state.region}
                onRegionChangeComplete={this._onRegionChangeComplete.bind(this)}
                >
                
                    {
                    this.state.markers.map(marker => {
                        return (
                            <Marker key={marker._id} coordinate={{latitude: JSON.parse(marker.coords.lat), longitude: JSON.parse(marker.coords.lng)}}/>
                            )
                        })
                    }
                    
                </MapView>
                <GooglePlacesAutocomplete 
                        ref = {(ref)=>{this.mapInput = ref}}
                        query={{ key: 'AIzaSyB1J4K8WaIXRUifsbpyHasElywzjXDWyaE'}}
                        debounce={500}
                        minLength={3} 
                        onPress={this._onPressHandle.bind(this)}
                        getDefaultValue={() => ''}
                        autoFocus={false}

                        styles={{
                            container : {
                                flex:0,
                                position:'absolute',
                                top:0,
                                width:width
                            },
                            row:{
                                backgroundColor:'white'
                            }
                        }}
                        />
                        
                    <Header noLeft style={styles.listIcones}>

                    <TouchableOpacity onPress={()=>{this.setState({type: 2802});}} style={styles.icones}>
                    <Icon name={'soccer-ball-o'} size={28} color={'rgba(255, 255, 255, 1)'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.setState({type: 3012});}} style={styles.icones}>
                    <Icone name={'badminton'} size={28} color={'rgba(255, 255, 255, 1)'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.setState({type: 501});}} style={styles.icones}>
                    <Icona name={'table-tennis'} size={28} color={'rgba(255, 255, 255, 1)'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.setState({type: 2102});}} style={styles.icones}>
                    <Icona name={'swimmer'} size={28} color={'rgba(255, 255, 255, 1)'} />
                    </TouchableOpacity>

                    </Header>
                        
            </View>
        );
    }
}

/*
                {({ handleTextChange, locationResults, fetchDetails, ActivityIndicator}) => {
                    console.log('locationResults', locationResults)
                    return (
                    <View>
                        <View style={styles.inputWrapper}>
                            <TextInput style={styles.textInput}
                            placeholder="Search"
                            onChangeText={handleTextChange}
                            />
                        </View>
                        {isSearching && <ActivityIndicator size='large' color='blue' />}
                        <ScrollView style={{backgroundColor:'red'}}>
                            {locationResults.map(el => (
                                <LocationItem
                                    style={{backgroundColor:'blue'}}
                                    {...el}
                                    key={el.id}
                                    fetchDetails={fetchDetails}
                                    />
                            ))}
                        </ScrollView>
                    </View>
                )}}

*/
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
        height: height -40,
        width: width,
        flex:1,
        margin:0,
        padding:0
    },
    input: {
      height: 40,
      marginTop: 0,
      marginLeft: 3,
      marginRight: 3,
      borderColor:'silver',
      borderWidth:1,
      paddingHorizontal: 5,
      borderRadius: 200,
      backgroundColor: 'white',
    },
    inputWrapper: {
        marginTop: 0,
        backgroundColor: 'white'
    },
    listIcones: {
        justifyContent: 'space-around',
        alignItems: 'center'
    },

};

