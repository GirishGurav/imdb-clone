import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Pagenation from './Pagenation';

function Movies({handelAddtoWatchlist, handelRemovefromwatchlist,watchlist}) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const handelPrev = () => {
    if (pageNo === 1) {
      setPageNo(1);
    } else {
      setPageNo(pageNo - 1);
    }
  };

  const handelNext = () => {
    setPageNo(pageNo + 1);
  };

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=${pageNo}`)
      .then(function(res) {
        setMovies(res.data.results);
      })
      .catch(function(error) {
        console.error('Error fetching data:', error);
      });
  }, [pageNo]);

  return (
    <div className='p-5'>
      <div className='text-2xl m-5 font-bold text-center'>
        Trending Movies
      </div>
      <div className='flex flex-row flex-wrap gap-8 justify-around'>
        {movies.map((movieObj, index) => {
          return <MovieCard key={index} movieObj={movieObj} posterPath={movieObj.poster_path} name={movieObj.original_title} handelAddtoWatchlist={handelAddtoWatchlist} handelRemovefromwatchlist={handelRemovefromwatchlist} watchlist={watchlist}/>;
        })}
      </div>

      <Pagenation pageNo={pageNo} handelNext={handelNext} handelPrev={handelPrev} />
    </div>
  );
}

export default Movies;
