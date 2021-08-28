import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Container } from './styles';
import MovieList from '../../components/MovieList';
import trakt from '../../apis/trakt';
import omdb from '../../apis/omdb';
import appConfig from '../../../secret/appConfig.json';

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    trakt
      .get('/movies/trending')
      .then((res) => {
        res.data.map((movie, index) => {
          omdb
            .get(`?apikey=${appConfig.OMDB_API_KEY}&i=${movie.movie.ids.imdb}`)
            .then(({ data }) => {
              res.data[index] = { ...res.data[index], ...data };
            })
            .catch((e) => console.log(e))
            .finally(() => setTrendingMovies(res.data));
        });
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  return (
    <Container>
      <ScrollView contentContainerStyle={{ paddingTop: 80 }}>
        <MovieList categoryTitle="Filmes em alta" movies={trendingMovies} />
      </ScrollView>
    </Container>
  );
};

export default Home;
