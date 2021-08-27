import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

export default function App() {
  let [isLoadingComplete, setIsLoadingComplete] = useState(false);

  async function loadResourcesAsync() {
    await Promise.all([
      Font.loadAsync({
        'Nunito-Regular': require('./src/assets/fonts/Nunito-Regular.ttf'),
        'Nunito-Bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
      }),
    ]);
  }

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onFinish={() => setIsLoadingComplete(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}
