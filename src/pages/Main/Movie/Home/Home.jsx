import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMovieContext } from '../../../../context/MovieContext';

const Home = () => {
  const navigate = useNavigate();
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const { movieList, setMovieList, setMovie } = useMovieContext();

  const getMovies = () => {
    axios
      .get('/movies') // Replace with your API endpoint
      .then((response) => {
        setMovieList(response.data);
        const randomIndex = Math.floor(Math.random() * response.data.length);
        setFeaturedMovie(response.data[randomIndex]);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <div className="main-container">
      <h1 className="page-title">Now Showing</h1>
      {featuredMovie && (
        <div className="featured-list-container">
          <div
            className="featured-backdrop"
            style={{
              backgroundImage: `url(${featuredMovie.backdropPath || featuredMovie.posterPath})`,
            }}
          >
            <span className="featured-movie-title">{featuredMovie.title}</span>
          </div>
        </div>
      )}
      <div className="list-container">
        {movieList.map((movie) => (
          <div
            className="movie-card"
            key={movie.id}
            onClick={() => {
              setMovie(movie);
              navigate(`/view/${movie.id}`);
            }}
          >
            <img
              src={movie.posterPath || 'https://via.placeholder.com/150x225?text=No+Image'}
              alt={movie.title}
            />
            <span className="movie-card-title">{movie.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
