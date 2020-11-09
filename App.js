import React, {Component} from 'react';
import {View, Platform, Button} from 'react-native';
import Homepage from './src/Components/HomePage';
import Favouritespage from './src/Components/FavouritesPage';
import ProfileScreen from './src/Components/ProfileScreen';
import Postpage from './src/Components/PostPage';
import Tagspage from './src/Components/TagsPage';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Icon} from 'react-native-elements';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const FavouritesStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const TagpageStack = createStackNavigator();
const PostsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({navigation}) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <HomeStack.Screen
      name="Home"
      component={Homepage}
      options={{
        headerLeft: () => (
          <Icon
            reverse
            name="bars"
            type="font-awesome"
            color="#009387"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
        ),
      }}
    />
    <FavouritesStack.Screen
      name="Favourites"
      component={Favouritespage}
      options={{
        headerLeft: () => (
          <Icon
            reverse
            name="arrow-left"
            type="font-awesome"
            color="#009387"
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      }}
    />
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerLeft: () => (
          <Icon
            reverse
            name="arrow-left"
            type="font-awesome"
            color="#009387"
            onPress={() => {
              navigation.goBack();
            }}
          />
        ),
      }}
    />
  </HomeStack.Navigator>
);

const TagpageStackScreen = ({navigation}) => (
  <TagpageStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <TagpageStack.Screen
    name="Tag Info"
    component={Tagspage}
    options={{
      headerLeft: () => (
        <Icon
          reverse
          name="bars"
          type="font-awesome"
          color="#009387"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
    }}
  />
    
  </TagpageStack.Navigator>
);
const PostsStackScreen = ({navigation}) => (
  <PostsStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
    <PostsStack.Screen
    name="Posts"
    component={Postpage}
    options={{
      headerLeft: () => (
        <Icon
          reverse
          name="bars"
          type="font-awesome"
          color="#009387"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
    }}
  />
    
  </PostsStack.Navigator>
);

function Root() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeStackScreen} />
        <Drawer.Screen name="Posts" component={PostsStackScreen} />
        <Drawer.Screen name="Tags" component={TagpageStackScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <Root />
      </View>
    );
  }
}

export default App;
