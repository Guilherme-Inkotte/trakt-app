import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl } from 'react-native';
import { Container } from './styles';
import MovieList from '../../components/MovieList';
import trakt from '../../apis/trakt';
import omdb from '../../apis/omdb';
import appConfig from '../../../secret/appConfig.json';
import moment from 'moment';
import store from '../../store';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Registro de eventListeners
  useEffect(() => {
    // Aciona toda vez que um filme é favoritado
    const unsubscribe = store.subscribe(() => {
      // Realiza uma cópia do estado do Redux
      let storeData = store.getState();
      let trendingMoviesCopy = [...trendingMovies];
      // Percorre as 3 categorias de filmes para verificar se está favoritado ou não
      // Esse método é necessário porque caso um filme esteja em múltiplas listas
      // ele será marcado como favorito em todas as ocorrências
      for (let index in trendingMoviesCopy) {
        if (
          storeData.some(
            (movie) => movie.imdbID === trendingMoviesCopy[index].imdbID
          )
        )
          trendingMoviesCopy[index].isFavorite = true;
        else trendingMoviesCopy[index].isFavorite = false;
      }
      setTrendingMovies(trendingMoviesCopy);

      let recommendedMoviesCopy = [...recommendedMovies];
      for (let index in recommendedMoviesCopy) {
        if (
          storeData.some(
            (movie) => movie.imdbID === recommendedMoviesCopy[index].imdbID
          )
        )
          recommendedMoviesCopy[index].isFavorite = true;
        else recommendedMoviesCopy[index].isFavorite = false;
      }
      setRecommendedMovies(recommendedMoviesCopy);

      let recentMoviesCopy = [...recentMovies];
      for (let index in recentMoviesCopy) {
        if (
          storeData.some(
            (movie) => movie.imdbID === recentMoviesCopy[index].imdbID
          )
        )
          recentMoviesCopy[index].isFavorite = true;
        else recentMoviesCopy[index].isFavorite = false;
      }
      setRecentMovies(recentMoviesCopy);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function getData() {
    if (loading) return;
    setLoading(true);
    // Realiza uma cópia do estado do Redux
    let storeData = store.getState();
    trakt
      .get('/movies/trending')
      .then(async (res) => {
        // Após receber a resposta da api da Trak.tv, registra uma promise para cada filme
        // Essas promises serão realizadas simultâneamente e trarão o banner e outros dados da api OMDb
        let promises = await res.data.map((movie, index) => {
          return omdb.get(
            `?apikey=${appConfig.OMDB_API_KEY}&i=${movie.movie.ids.imdb}`
          );
        });
        // Quando as promises são resolvidas, mapeia as respostas e confere se o filme está entre os favoritos
        Promise.all(promises)
          .then(function (responses) {
            setTrendingMovies(
              responses.map((response) => ({
                ...response.data,
                isFavorite: storeData.some(
                  (movie) => movie.imdbID === response.data.imdbID
                ),
              }))
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.response);
      });
    trakt
      .get('/movies/recommended/weekly')
      .then(async (res) => {
        let promises = await res.data.map((movie, index) => {
          return omdb.get(
            `?apikey=${appConfig.OMDB_API_KEY}&i=${movie.movie.ids.imdb}`
          );
        });
        Promise.all(promises)
          .then(function (responses) {
            setRecommendedMovies(
              responses.map((response) => ({
                ...response.data,
                isFavorite: storeData.some(
                  (movie) => movie.imdbID === response.data.imdbID
                ),
              }))
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.response);
      });
    trakt
      .get('/movies/updates/' + moment().subtract(7, 'd'))
      .then(async (res) => {
        let promises = await res.data.map((movie, index) => {
          return omdb.get(
            `?apikey=${appConfig.OMDB_API_KEY}&i=${movie.movie.ids.imdb}`
          );
        });
        Promise.all(promises)
          .then(function (responses) {
            setRecentMovies(
              responses.map((response) => ({
                ...response.data,
                isFavorite: storeData.some(
                  (movie) => movie.imdbID === response.data.imdbID
                ),
              }))
            );
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.response);
      })
      .finally(() => setLoading(false));
  }

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => getData()} />
        }
        contentContainerStyle={{ paddingVertical: 20 }}
      >
        <MovieList categoryTitle="Filmes em alta" movies={trendingMovies} />
        <MovieList
          categoryTitle="Filmes recomendados"
          movies={recommendedMovies}
        />
        <MovieList
          categoryTitle="Filmes atualizados recentemente"
          movies={recentMovies}
        />
      </ScrollView>
    </Container>
  );
};

export default Home;
