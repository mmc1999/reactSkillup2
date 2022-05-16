import React, { useState } from "react";
import "./card.styles.css"


const Card = ({ 
  editCardStatus, 
  deleteCard, 
  el: {_id,title,createdAt, user: {userName},description,status,importance},
  el
}) => {
  const [show, setShow] = useState(false);
  const limitString = (str) => {
    if (str.length > 170) {
      return { string: str.slice(0, 167).concat("..."), addButton: true };
    }
    return { string: str, addButton: false };
  };

  const dataTime = new Date(createdAt).toLocaleString() + " hs";
  return (
    <div className="card">
      <div className="close" onClick={() => deleteCard(_id)}>x</div>
      <h3>{title}</h3>
      <h6>{dataTime}</h6>
      <h5>{userName}</h5>
      <button className={status.toLowerCase()} type="button" onClick={() => editCardStatus(el)}>{status.toLowerCase()}</button>
      <button className={importance.toLowerCase()} type="button">{importance.toLowerCase(el)}</button>
      {!show && <p>{limitString(description).string}</p>}
      {
        show 
        && <>
            <p>{description}</p> 
            <button type="button" onClick={() => setShow(false)}>Ver menos</button>
          </>
      }
      {
        !show 
        && limitString(description).addButton 
        && <button type="button" onClick={() => setShow(true)}>ver mas</button>
      }
    </div>
  );
};

export default Card;
