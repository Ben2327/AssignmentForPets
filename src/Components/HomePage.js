import React from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Button
} from 'react-native';
import {Icon} from 'react-native-elements';
import {ListItem, Avatar} from 'react-native-elements';

export default class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataSource: [],
      isFavourite: [],
    };
  }
  componentDidMount() {
    fetch('https://dummyapi.io/data/api/user?page=1&limit=20', {
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
  }

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

  markFavourite = (index, flag) => {
    !flag
      ? this.setState(
          {isFavourite: this.state.isFavourite.concat(index)},
          // () => {
          //   console.log('okok', this.state.isFavourite);
          // },
        )
      : this.setState(
          {isFavourite: this.state.isFavourite.filter((item) => item != index)},
          // () => {
          //   console.log('okok', this.state.isFavourite);
          // },
        );
  };
  render() {
    const renderItem = ({item, index}) => {
      return (
        <View>
          <ListItem
            onPress={() => {
              this.props.navigation.navigate('Profile', {
                user: item,
                isFavourite: this.state.isFavourite.includes(item.id),
              });
            }}>
            <Avatar rounded activeOpacity={0.7} source={{uri: item.picture}} />
            <ListItem.Title>
              {item.firstName + ' ' + item.lastName}
            </ListItem.Title>
            <View
              style={{
                flex: 1,
                alignContent: 'flex-end',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}>
              <Icon
                raised
                reverse
                name={
                  this.state.isFavourite.includes(item.id) ? 'heart' : 'heart-o'
                }
                size={20}
                type="font-awesome"
                onPress={() =>
                  this.markFavourite(
                    item.id,
                    this.state.isFavourite.includes(item.id),
                  )
                }
                color="#00aced"
              />
            </View>
          </ListItem>
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
      <Button  title="List of Favourite Users" onPress={() => {
        this.props.navigation.navigate('Favourites', {
          users: this.state.dataSource,
          favourite: this.state.isFavourite,
        })
      }}></Button>
        <FlatList
          data={this.state.dataSource}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
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
