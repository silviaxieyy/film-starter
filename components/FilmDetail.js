import './FilmDetail.css';

export default function FilmDetail(props) {

  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img src={props.backdrop_path} alt={`${props.title} backdrop`} />
        <h1 className="film-title">{props.title}</h1>
      </figure>

      <div className="film-meta">
        <p className="film-detail-overview">
          <img src={props.poster_path} className="film-detail-poster" alt={props.title} />
          {'Overview goes here'}
        </p>
      </div>
    </div>
  )
}

