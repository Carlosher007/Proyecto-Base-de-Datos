/** @format */

import React from 'react';
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';

const Card = (props) => {
  const navigate = useNavigate();
  return (
    <div className='card'>
      <div className='imgBx'>
        <img src={props.image} alt={props.title} />
      </div>
      <div className='content'>
        <div className='details'>
          <h2>{props.title}</h2>
          <p>{props.text}</p>
          {/* <a href={props.link}>Read More</a> */}
          <button onClick={() => navigate(props.link)}>Acceder</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
