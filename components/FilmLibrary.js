import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import FilmDetail from "./FilmDetail";
import FilmDetailEmpty from "./FilmDetailEmpty";
import './FilmLibrary.css';
import FilmRow from "./FilmRow";
import './FilmRow.css'
import { TMDB_API_KEY } from "./TMDB";

function FilmLibrary() {
  const [TMDBData, setTMDBData] = useState([]);
  const [currentTMDBData, setcurrentTMDBData] = useState([])
  const [page, setPage] = useState(1);
  const [year, setYear] = useState(2022);
  const [faveFilms, setFaveFilms] = useState([]);
  const [faveListOpen, setFaveListOpen] = useState(false)
  const [selectedFilmId, setSelectedFilmId] = useState(null)
  

  useEffect(() => {
    fetchData();
  }, [page, year])

  const fetchData = async () => {
    const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${page}&primary_release_year=${year}&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`

    try {
      const response = await fetch(url);
      const DATA = await response.json();
      
      if (DATA.results && DATA.results.length >0) {
        setTMDBData(prev => [...prev, ...DATA.results]);
        setcurrentTMDBData(prev => [...prev, ...DATA.results]);
      }
      
/*       console.log(DATA.results);
      console.log(DATA.results[0]?.poster_path);
      console.log(DATA.results[0]?.backdrop_path); */
    } catch (error) {
      console.log("failed to fetch film data: ", error)
    }
  }; 
  
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
      setYear(inputYear);
      setPage(1);
    }
  }

  const handleFaveClick = () => {
    setFaveListOpen(true);
  }

  
  const handleAllClick = () => {
    setFaveListOpen(false);
    setcurrentTMDBData([...currentTMDBData]);
  }

  const handleFilmClick = (id) => {
    setSelectedFilmId(id)
  }

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button 
            className="film-list-filter is-active"
            onClick={handleAllClick}
          >
            ALL
            <span className="section-count">{TMDBData.length}</span>
          </button>
          <button 
            className={`film-list-filter ${faveFilms.length !== 0 ? 'is-active' : ''}`}
            onClick={handleFaveClick}
          >
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
        
       {faveListOpen 
         ? faveFilms.map((film, index) => {
            const releaseDate = new Date(film.release_date);
  
            return (
              <FilmRow 
                key={index} 
                src={film.poster_path} 
                title={film.title} 
                year={releaseDate.getFullYear()} 
                handleReadMoreDetail={()=> handleReadMoreDetail(index)}
                handleAddToQueue={() => handleAddToQueue(film)}
                handleFilmClick={handleFilmClick}
                isFave={faveFilms.includes(film)}
                id={film.id}
              />
            )
          }) 
          : TMDBData?.map((film, index) => {
              const releaseDate = new Date(film.release_date);

              return (
                <FilmRow 
                  key={index} 
                  src={film.poster_path} 
                  title={film.title} 
                  year={releaseDate.getFullYear()} 
                  handleReadMoreDetail={()=> handleReadMoreDetail(index)}
                  handleAddToQueue={() => handleAddToQueue(film)}
                  handleFilmClick={handleFilmClick}
                  isFave={faveFilms.includes(film)}
                  id={film.id}
                />)
            })
        } 
      
      {!faveListOpen && <button 
        className="my-25 px-6"
        onClick={handleLoadMore}
      >
        Load More
      </button>}
      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
          {selectedFilmId ? <FilmDetail id={selectedFilmId} /> : <FilmDetailEmpty />}    
      </div>
    </div>
  )
}

export default FilmLibrary