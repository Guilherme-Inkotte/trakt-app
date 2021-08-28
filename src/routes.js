import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from './constants/Fonts';
import { screenFont } from './constants/Screen';
// Import das telas
import HomeScreen from './screens/Home';
import FavoritesScreen from './screens/Favorites';

const Tab = createBottomTabNavigator();

function getRouteTitle(route) {
  switch (route.name) {
    case 'Home':
      return 'Início';
    case 'Favorites':
      return 'Favoritos';
    default:
      return 'Trakt app';
  }
}

const Routes = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Favorites':
              iconName = 'heart-outline';
              break;
            default:
              iconName = 'home-outline';
              break;
          }
          return <Ionicons name={iconName} size={24} color={color} />;
        },
        title: getRouteTitle(route),
        tabBarActiveTintColor: '#da1e37',
        tabBarInactiveTintColor: '#e8eddf',
        tabBarLabelStyle: { fontFamily: Fonts.main, fontSize: screenFont },
        tabBarStyle: {
          backgroundColor: '#000',
        },
        headerTitleStyle: {
          fontFamily: Fonts.mainBold,
          color: '#da1e37',
          fontSize: screenFont + 10,
          position: 'absolute',
          top: 0,
          left: 0,
        },
        headerTransparent: true,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default Routes;
