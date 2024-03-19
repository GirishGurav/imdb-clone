import React, { useState, useEffect } from 'react';
import genreids from '../utility/genre';

const WatchList = ({ watchlist, setWatchList , handelRemoveFromWatchList }) => {
  const [search, setSearch] = useState('');
  const [genreList, setGenreList] = useState(['All Genres']);
  const [currGenre, setCurrGenre] = useState('All Genres')

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handelFilter=(genre)=>{
    setCurrGenre(genre)
  }

  const sortIncreasing = () => {
    const sortedIncreasing = watchlist.slice().sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setWatchList(sortedIncreasing);
  };

  const sortDecreasing = () => {
    const sortedDecreasing = watchlist.slice().sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setWatchList(sortedDecreasing);
  };

  useEffect(() => {
    let temp = watchlist.map((movieObj) => {
      return genreids[movieObj.genre_ids[0]];
    });
    setGenreList(['All Genres', ...new Set(temp)]); 
  }, [watchlist]);

  return (
    <>
      <div className='flex justify-center flex-wrap m-4 gap-5'>
        {genreList.map((genre, index) => {
          return (
            <div key={index} onClick={()=>handelFilter(genre)} className={currGenre==genre?'bg-blue-400 flex justify-center h-[3rem] w-[9rem] rounded-xl items-center text-white' : 'bg-gray-400 flex justify-center h-[3rem] w-[9rem] rounded-xl items-center text-white'}>
              {genre}
            </div>
          );
        })}
      </div>
      
      <div className='flex justify-center m-4'>
        <input
          onChange={handleSearch}
          value={search}
          type='text'
          placeholder='Search Movies'
          className='h-[3rem] w-[18rem] bg-gray-200 outline-none px-4'
        />
      </div>
      <div className='border border-gray m-8'>
        <table className='w-full text-gray-500 text-center'>
          <thead className='border-b-2'>
            <tr>
              <th>Movies Name</th>
              <th className='flex justify-center'>
                <div onClick={sortIncreasing} className='p-2'>
                  <i className='fa-solid fa-arrow-up'></i>
                </div>
                <div className='p-2'>Rating</div>
                <div onClick={sortDecreasing} className='p-2'>
                  <i className='fa-solid fa-arrow-down'></i>
                </div>
              </th>
              <th>Popularity</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.filter((movieObj)=>{
              if(currGenre=='All Genres'){
                return true
              }
              else{
                return genreids[movieObj.genre_ids[0]]==currGenre;
              }
            }).filter((movieObj) => {
                return movieObj.title.toLowerCase().includes(search.toLowerCase());
              })
              .map((movieObj, index) => {
                return (
                  <tr key={index}>
                    <td className='flex items-center py-4'>
                      <img
                        className='h-[15rem] w-[10rem] p-4'
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt={`${movieObj.title} Poster`}
                      />
                      <div className='mx-10'>{movieObj.title}</div>
                    </td>
                    <td>{movieObj.vote_average}</td>
                    <td>{movieObj.popularity}</td>
                    <td>{genreids[movieObj.genre_ids[0]]}</td>
                    <td onClick={()=>handelRemoveFromWatchList(movieObj)} className='text-red-800'>Delete</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
