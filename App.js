import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Provider } from 'react-redux';
import store from './src/store';
import MovieModal from './src/components/MovieModal';

export default function App() {
  let [isLoadingComplete, setIsLoadingComplete] = useState(false);
  let [isModalVisible, setIsModalVisible] = useState(false);
  let [selectedMovie, setSelectedMovie] = useState(false);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const storeData = store.getState();
      if (storeData.selectedMovie?.movie) {
        setSelectedMovie(storeData.selectedMovie?.movie);
        setIsModalVisible(true);
      } else {
        setIsModalVisible(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

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
        {isModalVisible && <MovieModal selectedMovie={selectedMovie} />}
      </NavigationContainer>
    </Provider>
  );
}
