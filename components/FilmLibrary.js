import { useEffect, useState } from "react"
import FilmDetail from "./FilmDetail";
import FilmDetailEmpty from "./FilmDetailEmpty";
import './FilmLibrary.css';
import FilmRow from "./FilmRow";
import './FilmRow.css'
import TMDB from "./TMDB"

function FilmLibrary() {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [faveFilms, setFaveFilms] = useState([]);

  const handleReadMoreDetail = (index) => {
    setSelectedFilm(TMDB.films[index]);
  }
  
  const handleAddToQueue = (film) => {
    if (!faveFilms.includes(film)) {
      setFaveFilms([...faveFilms, film]);
    } else {
      setFaveFilms(faveFilms.filter(faveFilm => faveFilm !== film));
    }
  }

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="film-list-filters">
          <button className="film-list-filter is-active">
            ALL
            <span className="section-count">{TMDB.films.length}</span>
          </button>
          <button className="film-list-filter">
            FAVES
            <span className="section-count">{faveFilms.length}</span>
          </button>
        </div>
        
       {TMDB.films.map((film, index) => {
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

      </div>

      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {selectedFilm === null ?
          <FilmDetailEmpty /> :
            <FilmDetail 
              title={selectedFilm.title} 
              backdrop_path={selectedFilm.backdrop_path}
              poster_path={selectedFilm.poster_path} 
            />
          }
      </div>
    </div>
  );
}

export default FilmLibrary