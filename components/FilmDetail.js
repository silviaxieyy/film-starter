import './FilmDetail.css';
import { useEffect, useState } from 'react';
import { TMDB_API_KEY } from "./TMDB";


export default function FilmDetail(props) {
  const [readMoreFilm, setReadMoreFilm] = useState({});

  useEffect(() => {
    const fetchFilmById = async (id) => {
      if (!id) return;
      
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${TMDB_API_KEY}`

      try {
        const response = await fetch(url);
        const filmData = await response.json();

        setReadMoreFilm(filmData);

        console.log(readMoreFilm);

      } catch (error) {
        console.log("failed to fetch film data: ", error);
      }}

      fetchFilmById(props.id);
    }, [props.id])

  

  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img src={`https://image.tmdb.org/t/p/w780${readMoreFilm?.backdrop_path}`} alt={`${readMoreFilm?.title} backdrop`} />
        <h1 className="film-title">{readMoreFilm?.title}</h1>
      </figure>

      <div className="film-meta">        
        <p className="film-detail-overview">
          <img src={`https://image.tmdb.org/t/p/w780${readMoreFilm?.poster_path}`} className="film-detail-poster" alt={readMoreFilm?.title} />
          <strong>{readMoreFilm?.tagline}</strong> 
          <br />
          <br />
          {readMoreFilm?.overview}
        </p>
      </div>
    </div>
  )
}

