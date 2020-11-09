import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Platform,
  Image,
  Linking
} from 'react-native';
import {SearchBar, ListItem,Card, Button,Icon} from 'react-native-elements';
export default class Tagpage extends Component {
  constructor(props) {
    super(props);
    this.state = {search: '', isLoading: true, dataSource: [], tagSource: [],flag : false}, 
    this.arrayholder = [];
  }
  componentDidMount() {
    this.retrieveTags();
    this.retrievePostsOfTags();
  }

  retrieveTags = () => {
    fetch('https://dummyapi.io/data/api/tag?page=1&limit=20', {
      method: 'GET',
      headers: {
        'app-id': '5fa8b635bf51d21d8d2fa6b5',
        'content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.data,
          },
          function () {
            this.arrayholder = responseJson.data;
          },
        );
      })
      .catch((error) => console.log(error));
  };

  retrievePostsOfTags = async () => {
    if (this.state.search) {
      console.log('ok',this.state.search)
      await fetch(
        `https://dummyapi.io/data/api/tag/${this.state.search}/post?limit=20`,
        {
          method: 'GET',
          headers: {
            'app-id': '5fa8b635bf51d21d8d2fa6b5',
            'content-type': 'application/json',
          },
        },
      )
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState(
            {
              tagSource: responseJson.data,
            },
            () => {
              console.log(this.state.tagSource);
            },
          );
        })
        .catch((error) => console.log(error));
    }
  };

  search = (text) => {
    console.log(text);
  };
  clear = () => {
    this.search.clear();
  };
  SearchFilterFunction(text) {
    const newData = this.arrayholder.filter(function (item) {
      const itemData = item ? item.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({dataSource: newData, search: text, flag: false});
  }
  getItem = async (item) => {
    this.setState({search: item, flag: true},()=>{this.retrievePostsOfTags()});
    
    
  };
  render() {
    const renderItem = ({item, index}) => {
      return (
        <View>
          <ListItem
            onPress={() => {
              this.getItem(item);
            }}>
            <ListItem.Title>{item}</ListItem.Title>
          </ListItem>
        </View>
      );
    };

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
        </View>
      );
    };
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 21}}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.viewStyle}>
        <SearchBar
          round
          searchIcon={{size: 25}}
          onChangeText={(text) => this.SearchFilterFunction(text)}
          onClear={(text) => this.SearchFilterFunction('')}
          placeholder="SEARCH BY TAG"
          value={this.state.search}
          lightTheme
        />
        {this.state.flag ? (
          <FlatList
            data={this.state.tagSource}
            renderItem={renderItems}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <FlatList
            data={this.state.dataSource}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
  },
  textStyle: {padding: 11},
});
