import { useEffect, useState } from "react"
import FilmDetail from "./FilmDetail";
import FilmDetailEmpty from "./FilmDetailEmpty";
import './FilmLibrary.css';
import FilmRow from "./FilmRow";
import './FilmRow.css'
import TMDB, { TMDB_API_KEY } from "./TMDB";

function FilmLibrary() {
  const [TMDBData, setTMDBData] = useState([]);
  const [page, setPage] = useState(1);
  const [year, setYear] = useState(2022);
  const [readMoreFilm, setReadMoreFilm] = useState({});
  const [faveFilms, setFaveFilms] = useState([]);


  useEffect(() => {
    fetchData();
  }, [page, year])

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&primary_release_year=${year}&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`

    try {
      const response = await fetch(url);
      const DATA = await response.json();
      
      if (DATA.results.length >0) {
        setTMDBData(prev => [...prev, ...DATA.results])
      }
      
      console.log(DATA.results);
      console.log(DATA.results[0].poster_path);
      console.log(DATA.results[0].backdrop_path);
    } catch (error) {
      console.log("failed to fetch film data: ", error)
    }
  }; 
  
  const handleReadMoreDetail = (index) => {
    setReadMoreFilm(TMDBData[index]);
  }
  
  const handleAddToQueue = (film) => {
    if (!faveFilms.includes(film)) {
      setFaveFilms([...faveFilms, film]);
    } else {
      setFaveFilms(faveFilms.filter(faveFilm => faveFilm !== film));
    }
  }

  const handleLoadMore = (prev) => {
    setPage(prev => prev + 1);
  }

  const handleYearChange = (e) => {
    const inputYear = e.target.value;
    if (inputYear >= 1920) {
      setTMDBData([]);
      setFaveFilms([]);
      setYear(inputYear);
      setPage(1);
    }
  }
  

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button className="film-list-filter is-active">
            ALL
            <span className="section-count">{TMDBData.length}</span>
          </button>
          <button className={`film-list-filter ${faveFilms.length !== 0 ? 'is-active' : ''}`}>
            FAVES
            <span className="section-count">{faveFilms.length}</span>
          </button>
          <label className="film-list-filter">
            Released Year
          </label>
            <input 
              className="film-list-filter is-active" 
              placeholder="year"     
              onChange={handleYearChange}
            />
          

        </div>
        
       {TMDBData?.map((film, index) => {
         const releaseDate = new Date(film.release_date);

         return (
           <FilmRow 
             key={index} 
             src={film.poster_path} 
             title={film.title} 
             year={releaseDate.getFullYear()} 
             handleReadMoreDetail={()=> handleReadMoreDetail(index)}
             handleAddToQueue={() => handleAddToQueue(film)}
             isFave={faveFilms.includes(film)}
          />)
       })} 
      
      <button 
        className="my-25 px-6"
        onClick={handleLoadMore}
      >
        Load More
      </button>
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {readMoreFilm === null ?
          <FilmDetailEmpty /> :
            <FilmDetail 
              title={readMoreFilm.title} 
              backdrop_path={readMoreFilm.backdrop_path}
              poster_path={readMoreFilm.poster_path}
              overview={readMoreFilm.overview}
            />
          }
      </div>
    </div>
  )
}

export default FilmLibrary