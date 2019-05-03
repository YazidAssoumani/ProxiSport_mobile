import React, {Component} from 'react';
import { View, TextInput, Dimensions, FlatList, ScrollView, TouchableOpacity } from 'react-native';
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
        markers: []
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
        
        // else{
        // var url = 'http://proxisport.it-students.fr/map?'+
        // 'boundsNE[lat]=' + (region.latitude + region.latitudeDelta).toString() + 
        // '&boundsNE[lng]=' + (region.longitude + region.longitudeDelta).toString() + 
        // '&boundsSW[lat]=' + (region.latitude - region.latitudeDelta).toString() + 
        // '&boundsSW[lng]=' + (region.longitude - region.longitudeDelta).toString() ;
        // console.log(url)
        // }
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
    
    render() {
        return (
            <View style={{flex:1}}>
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

