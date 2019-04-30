import React, {Component} from 'react';
import { View, TextInput, } from 'react-native';
import MapView from 'react-native-maps';

export default class Dashboard extends Component<Props> {
    state = {
        latitude: 20.9948891,
        longitude: 105.799677,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
    }
    
    render() {
        return (
            <View style={{ flex:1}}>
                <MapView style={styles.map} initialRegion={this.state}>
                    <MapView.Marker coordinate={this.state} />
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

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    text: {
        fontSize: 30,
        fontWeight: '700',
        color: '#59656C',
        marginBottom: 10,
    },
    map: {
        width: 400,
        height: 400,
        flex: 1
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

