import { useEffect, useState } from "react";
import  "./FilmRow.css";
import Link from "next/link";

export default function FilmRow(props) {

  return(
    <>
      <div className="FilmRow">
        <img src={`https://image.tmdb.org/t/p/w780${props.src}`} alt={`${props.title} film poster`} />
        <div className="film-summary">
          <h3>{props.title}</h3>
          <p>{props.year}</p>
          <div className="actions">
            <button className="action" onClick={props.handleAddToQueue}>
              {props.isFave ? <span className="material-icons">remove_to_queue</span> : <span className="material-icons">add_to_queue</span>}
            </button>

            <Link href={`/films/${props.id}`} className="action" passHref>
              <span className="material-icons">read_more</span>
            </Link>

            {/* <button className="action" onClick={props.handleReadMoreDetail}>
              <span className="material-icons">read_more</span>
            </button> */}

          </div>                       
        </div>
      </div>
    </>

  )
}