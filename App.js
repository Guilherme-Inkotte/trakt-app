import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import store from './src/store';

export default function App() {
  let [isLoadingComplete, setIsLoadingComplete] = useState(false);

  // Função que carrega as fontes do sistema
  async function loadResourcesAsync() {
    await Promise.all([
      Font.loadAsync({
        'Nunito-Regular': require('./src/assets/fonts/Nunito-Regular.ttf'),
        'Nunito-Bold': require('./src/assets/fonts/Nunito-Bold.ttf'),
      }),
    ]);
  }

  // Carrega os recursos enquanto o aplicativo carrega
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
    <Provider store={store}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </Provider>
  );
}
