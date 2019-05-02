import React, {Component} from 'react';
import { View, TextInput, } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default class Dashboard extends Component<Props> {
    state = {
        initialRegion:[{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
    }]
    }
    
    render() {
        return (
            <View style={{ flex:1, alignItems: 'stretch'}}>
            <TextInput 
                  style={styles.input}
                  autoCapitalize={'none'}
                  placeholder="Recherche"
                  onChangeText={()=>{}}
                />
                <MapView 
                style={styles.map} 
                provider={PROVIDER_GOOGLE} 
                initialRegion={this.state}
                showsUserLocation={true}>
                    <Marker coordinate={this.state} />
                </MapView>
            </View>
        );
    }
}

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
        width:400,
        flex:1
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

