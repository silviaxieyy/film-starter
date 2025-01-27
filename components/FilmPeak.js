import { useEffect, useState } from "react";
import Link from "next/link";
import './FilmPeak.css'

export default function FilmPeak({film}) {
  console.log(film)
  console.log(film.title)
  return(
    <>
      <div className="FilmPeak">
        <img 
          src={`https://image.tmdb.org/t/p/w780${film.poster_path}`} 
          alt={`${film.title} film poster`} 
        />
          <h3>{film.title}</h3>
          <p>{film.release_date}</p>

           
      </div>
    </>

  )
}