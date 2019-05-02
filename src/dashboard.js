import React, {Component} from 'react';
import { View, TextInput, Dimensions } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default class Dashboard extends Component<Props> {
    state = {
        coords : {
            latitude: 45.75,
            longitude: 4.85,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
        },
        coords_marker : {
            latitude: 45.75,
            longitude: 4.85,
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

    componentWillMount() {

        fetch('http://proxisport.it-students.fr/map', {
           method: 'GET',
           credentials: 'same-origin',
           headers: {
              'content-Type': 'application/json',
            },
        })
         .then((response) => response.json())
         .then((datas) => {
           this.setState({
              markers: datas
           })
         }).catch(function (error) { // Pour le warning d'erreur "unhandled promise rejection"
         console.log('There has been a problem with your fetch operation: ' + error.message);
          // ADD THIS THROW error
          throw error;
          });
        }
    
    render() {
        return (
            <View style={{ flex:1}}>
                <MapView style={styles.map} provider={PROVIDER_GOOGLE} initialRegion={this.state.coords}>
                    <Marker coordinate={this.state.coords_marker} />
                    <Marker coordinate={this.state.coords_marker2} />
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
    },
};

