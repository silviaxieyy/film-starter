import { useEffect, useState } from "react";
import  "./FilmRow.css";

export default function FilmRow(props) {

  return(
    <div className="FilmRow">
      <img src={props.src} alt={`${props.title} film poster`} />
      <div className="film-summary">
        <h3>{props.title}</h3>
        <p>{props.year}</p>
        <div className="actions">
          <button className="action" onClick={props.handleAddToQueue}>
          {props.isFave ? <span className="material-icons">remove_to_queue</span> : <span className="material-icons">add_to_queue</span>}
          </button>
          <button className="action" onClick={props.handleReadMoreDetail}>
            <span className="material-icons">read_more</span>
          </button>
        </div>                       
      </div>
    </div>
  )
}