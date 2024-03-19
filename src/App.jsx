import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Movies from './components/Movies';
import WatchList from './components/WatchList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Banner from './components/Banner';

function App() {
  const [watchlist, setWatchList] = useState([]);

  const handelAddtoWatchlist = (movieObj) => {
    const newWatchList = [...watchlist, movieObj];
    localStorage.setItem('moviesApp' ,JSON.stringify(newWatchList))
    setWatchList(newWatchList);
  };

  const handelRemoveFromWatchList = (movieObj) => {
    const filteredWatchlist = watchlist.filter((movie) => {
      return movie.id !== movieObj.id;
    });
    setWatchList(filteredWatchlist);
    localStorage.setItem('moviesApp' , JSON.stringify(filteredWatchlist))
  };

  useEffect(()=>{
    let moviesFromLocalStorage = localStorage.getItem('moviesApp')
    if(!moviesFromLocalStorage){
      return
    }
    setWatchList(JSON.parse(moviesFromLocalStorage))
  }, [])

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
        <Route path='/' element={<><Banner /><Movies watchlist={watchlist} handelAddtoWatchlist={handelAddtoWatchlist} handelRemovefromwatchlist={handelRemoveFromWatchList} /></>} />

          <Route path='/watchlist' element={<WatchList watchlist={watchlist} setWatchList={setWatchList} handelRemoveFromWatchList={handelRemoveFromWatchList}/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
