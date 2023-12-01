import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { REACT_APP_API_KEY, img_300, noPicture } from '../../../config/config';
import './Carousel.css'


const handleDragStart = (e) => e.preventDefault();



const Carousel = ({ media_type, id }) => {
  const [credits, setCredits] = useState();

  const items = credits?.map((c) => (
    <div className="carouselItem">
      <img
        src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
        alt={c?.name}
        onDragStart={handleDragStart}
        className="carouselImg"
      />
      <b className="carouselTxt">{c?.name}{<br />}({c?.character})</b>

    </div>
  ));

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const fetchCredits = async () => {
    const C_API_URL = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${REACT_APP_API_KEY}&language=en-US`;

    await fetch(C_API_URL)
      .then((res) => res.json())
      .then((data) => {
        setCredits(data.cast);
        console.log(data)
      });
  }

  useEffect(() => {
    fetchCredits();

    // eslint-disable-next-line
  }, []);

  return (
    <AliceCarousel
    mouseTracking
    infinite
    responsive={responsive}
    items={items}
    
  />
  ); 
}

export default Carousel;