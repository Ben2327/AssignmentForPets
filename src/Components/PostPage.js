import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {ListItem, Avatar, Card, Button} from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

export default class Postpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      isFavourite: [],
      userId: '',
      posts: [],
      flag: false,
    };
  }
  componentDidMount() {
    this.retrievePost();
  }

  retrievePost = () => {
    fetch('https://dummyapi.io/data/api/post?limit=10', {
      method: 'GET',
      headers: {
        'app-id': '5fa8b635bf51d21d8d2fa6b5',
        'content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          loading: false,
          dataSource: responseJson.data,
        });
        console.log(this.state.dataSource);
        // let obj = this.state.dataSource;
        // console.log(obj.data[0].firstName);
        //console.log(this.state.dataSource[0].firstName);
      })
      .catch((error) => console.log(error));
  };

  showPostForSelectedUser = (id) => {
    if (id) {
      console.log(id);
      fetch(`https://dummyapi.io/data/api/user/${id}/post?limit=10`, {
        method: 'GET',
        headers: {
          'app-id': '5fa8b635bf51d21d8d2fa6b5',
          'content-type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
            loading: false,
            posts: responseJson.data,
            flag: true,
          });
          //console.log(this.state.posts);
        })
        .catch((error) => console.log(error));
    }
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      />
    );
  };

  dropDownPicker (id) {
    this.showPostForSelectedUser(id);
    this.setState({flag: false})
  }

  render() {

    const renderItems = ({item, index}) => {
      var dates = [item.publishDate];
      var data = [];
      for (var date of dates) {
        date = new Date(date);
        var final = date.toString();
        var final = final.substring(4, 24);
        data.push(final);
      }
      var array = [item.tags];
      let tag = array.join(' ,');

      return (
        <View>
        
          <Card>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 63,
                borderWidth: 4,
                borderColor: 'white',
                marginBottom: 10,
                alignSelf: 'center',
              }}
              source={{uri: item.owner.picture}}
            />
            <Card.Title style={{marginTop: 10}}>
              {item.owner.firstName + ' ' + item.owner.lastName}
            </Card.Title>
            <Card.Title>{item.owner.email}</Card.Title>
            <Card.Divider />
            <Card.Image source={{uri: item.image}} style={{height: 300}} />
            <Card.Divider />
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title={'Tags:- ' + ' ' + tag}
            />
            <Text style={{marginBottom: 10}}>{item.text}</Text>
            <Text
              style={{marginBottom: 10, color: 'blue'}}
              onPress={() => Linking.openURL(item.link)}>
              {item.link}
            </Text>
            <Button
              icon={<Icon name="heart" color="red" type="font-awesome" />}
              buttonStyle={{
                backgroundColor: 'white',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
              }}
              title={item.likes + ' ' + 'Likes'}
              titleStyle={{color: 'black'}}
            />
            <Button
              buttonStyle={{
                backgroundColor: 'white',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
              }}
              title={data}
              titleStyle={{color: 'black'}}
            />
          </Card>
        </View>
      );
    };


    const renderItem = ({item, index}) => {
      var dates = [item.publishDate];
      var data = [];
      for (var date of dates) {
        date = new Date(date);
        var final = date.toString();
        var final = final.substring(4, 24);
        data.push(final);
      }
      var array = [item.tags];
      let tag = array.join(' ,');

      return (
        <View>

          <Card>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 63,
                borderWidth: 4,
                borderColor: 'white',
                marginBottom: 10,
                alignSelf: 'center',
              }}
              source={{uri: item.owner.picture}}
            />
            <Card.Title style={{marginTop: 10}}>
              {item.owner.firstName + ' ' + item.owner.lastName}
            </Card.Title>
            <Card.Divider />
            <Card.Image source={{uri: item.image}} style={{height: 300}} />
            <Card.Divider />
            <Button
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title={'Tags:- ' + ' ' + tag}
            />
            <Text style={{marginBottom: 10}}>{item.text}</Text>
            <Text
              style={{marginBottom: 10, color: 'blue'}}
              onPress={() => Linking.openURL(item.link)}>
              {item.link}
            </Text>
            <Button
              icon={<Icon name="heart" color="red" type="font-awesome" />}
              buttonStyle={{
                backgroundColor: 'white',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
              }}
              title={item.likes + ' ' + 'Likes'}
              titleStyle={{color: 'black'}}
            />
            <Button
              buttonStyle={{
                backgroundColor: 'white',
                alignItems: 'flex-start',
                alignContent: 'flex-start',
                justifyContent: 'flex-start',
              }}
              title={data}
              titleStyle={{color: 'black'}}
            />
          </Card>
        </View>
      );
    };

    if (this.state.loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#0c9" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
      <View>
        <RNPickerSelect
          placeholder={{label: 'Select a User...',value: null }}
          onValueChange={(value) => this.dropDownPicker(value)}
          items={[
            {
              label:
                this.state.dataSource[0].owner.firstName +
                ' ' +
                this.state.dataSource[0].owner.lastName,
              value: this.state.dataSource[0].owner.id,
            },
            {
              label:
                this.state.dataSource[1].owner.firstName +
                ' ' +
                this.state.dataSource[1].owner.lastName,
              value: this.state.dataSource[1].owner.id,
            },
            {
              label:
                this.state.dataSource[2].owner.firstName +
                ' ' +
                this.state.dataSource[2].owner.lastName,
              value: this.state.dataSource[2].owner.id,
            },{
              label:
                this.state.dataSource[3].owner.firstName +
                ' ' +
                this.state.dataSource[3].owner.lastName,
              value: this.state.dataSource[3].owner.id,
            },
            {
              label:
                this.state.dataSource[4].owner.firstName +
                ' ' +
                this.state.dataSource[4].owner.lastName,
              value: this.state.dataSource[4].owner.id,
            },
            {
              label:
                this.state.dataSource[5].owner.firstName +
                ' ' +
                this.state.dataSource[5].owner.lastName,
              value: this.state.dataSource[5].owner.id,
            },{
              label:
                this.state.dataSource[6].owner.firstName +
                ' ' +
                this.state.dataSource[6].owner.lastName,
              value: this.state.dataSource[6].owner.id,
            },
            {
              label:
                this.state.dataSource[7].owner.firstName +
                ' ' +
                this.state.dataSource[7].owner.lastName,
              value: this.state.dataSource[7].owner.id,
            },
            {
              label:
                this.state.dataSource[8].owner.firstName +
                ' ' +
                this.state.dataSource[8].owner.lastName,
              value: this.state.dataSource[8].owner.id,
            },{
              label:
                this.state.dataSource[9].owner.firstName +
                ' ' +
                this.state.dataSource[9].owner.lastName,
              value: this.state.dataSource[9].owner.id,
            },
          ]}
        />
        </View>
        {this.state.flag ? (
          <View>
          <FlatList
            data={this.state.posts}
            renderItem={renderItems}
            keyExtractor={(item) => item.id.toString()}
          />
          </View>
        ) : (
          <FlatList
            data={this.state.dataSource}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    paddingVertical: 4,
    margin: 5,
    backgroundColor: '#fff',
  },
});
