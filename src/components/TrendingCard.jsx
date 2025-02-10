import React from 'react'

const TrendingCard = ({index, movie: {title, poster_path}}) => {
  return (
    <li>
        <p>{index + 1}</p>
        <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/no-movie.png`}  alt={title || 'No title'}/>
    </li>
  )
}

export default TrendingCard