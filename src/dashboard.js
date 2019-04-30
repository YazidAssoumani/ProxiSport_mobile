import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {};
export default class Dashboard extends Component<Props> {
  state ={
    marker: []
  }

  componentWillMount(){
    fetch('')
    .then((result) => response.json())
    .then((datas) => this.setState({marker : datas}).bind(this))
  }
  
  render(){
    return (
      <View style={styles.form}>
        <Text>Bienvenue</Text>
      </View>
    ) ;
  }
  
}


const styles = StyleSheet.create({
  form : {
    flexDirection:'column',
    alignItems:'stretch',
    alignSelf: 'stretch',
    flex:1,
  },
});
