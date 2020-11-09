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
} from 'react-native';
import {Icon} from 'react-native-elements';
import {ListItem, Avatar} from 'react-native-elements';

export default class Favourites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
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

  
  render() {
    const renderItem = ({item, index}) => {
      if(this.props.route.params.favourite.includes(item.id))
        {return (
        <View>
          <ListItem>
            <Avatar rounded activeOpacity={0.7} source={{uri: item.picture}} />
            <ListItem.Title>
              {item.firstName + ' ' + item.lastName}
            </ListItem.Title>
          </ListItem>
        </View>
      )}
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
        <FlatList
          data={this.props.route.params.users}
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
