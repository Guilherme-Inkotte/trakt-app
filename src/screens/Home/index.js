import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { Container } from './styles';
import MovieList from '../../components/MovieList';
import trakt from '../../apis/trakt';
import omdb from '../../apis/omdb';
import appConfig from '../../../secret/appConfig.json';
import moment from 'moment';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    trakt
      .get('/movies/trending')
      .then(async (res) => {
        let promises = await res.data.map((movie, index) => {
          return omdb.get(
            `?apikey=${appConfig.OMDB_API_KEY}&i=${movie.movie.ids.imdb}`
          );
        });
        Promise.all(promises)
          .then(function (responses) {
            setTrendingMovies(responses.map((response) => response.data));
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
            setRecommendedMovies(responses.map((response) => response.data));
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
            setRecentMovies(responses.map((response) => response.data));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
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
