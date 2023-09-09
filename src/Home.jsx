import React from 'react'
import Slider from './Componets/Slider'
import ProductionHouse from './Componets/ProductionHouse'
import GenreMovieList from './Componets/GenreMovieList'

export default function Home({movie,setMovie}) {
  return (
    <div>       
<Slider setMovie={setMovie}/>

<GenreMovieList movie={movie} setMovie={setMovie}/>
    </div>
  )
}
