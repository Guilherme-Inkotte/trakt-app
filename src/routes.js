import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Import das telas
import HomeScreen from './screens/Home';
import FavoritesScreen from './screens/Favorites';

const Tab = createBottomTabNavigator();

const Routes = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} />
    </Tab.Navigator>
  );
};

export default Routes;
