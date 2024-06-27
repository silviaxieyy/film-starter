import FilmPeak from '../components/filmPeak'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { TMDB_API_KEY } from '../components/TMDB';

export default function Home() {
  const [films, setFilms] = useState([])

  useEffect(() => {
    const fetchFilms = async () => {
      const url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${1}&primary_release_year=${2024}&sort_by=popularity.desc&api_key=${TMDB_API_KEY}`
    
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data.results)
      setFilms(data.results)
    } catch (error) {
      console.log('Failed to fetch films', error)
      }
    }
    fetchFilms()
  }, [])

  return (
    <>
      <h1>Home Page</h1>
      <h2>Welcome</h2>
      <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
      <div className='linktofilms'>
        <Link href="/films">Go to Films</Link>
      </div>
      <div className='filmpeaklists'>
        {films.map((film) => (
          <FilmPeak key={film.id} film={film} />
        ))}
      </div>

      
    </>
  )
}
