import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

import {Icon} from 'react-native-elements';

export default class ProfileScreen extends Component {
  render() {
    const user = this.props.route.params.user;
    const isFavourite = this.props.route.params.isFavourite;
    console.log(user, isFavourite);
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <Image style={styles.avatar} source={{uri: user.picture}} />
        <View style={styles.body}>
        <View
              style={{
                flex: 1,
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 25
              }}>
              <Icon
                raised
                name={isFavourite ? 'heart' : 'heart-o'}
                size={20}
                type="font-awesome"
                color="red"
              />
            </View>
          <View style={styles.bodyContent}>
            
            <Text style={styles.id}>Id:- {user.id}</Text>
            <Text style={styles.name}>
              Name:- {user.title + '.' + user.firstName + ' ' + user.lastName}
            </Text>
            <Text style={styles.info}>Email:- {user.email}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#009387',
    height: 200,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 130,
  },
  id: {
    fontSize: 18,
    color: 'grey',
    fontWeight: '100',
    marginBottom: 15,
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: '600',
    marginBottom: 15,
  },
  info: {
    fontSize: 16,
    color: '#00BFFF',
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: '#696969',
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: '#00BFFF',
  },
});
