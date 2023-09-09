import React, { useEffect, useRef, useState } from 'react'
import GlobalApi from '../Services/GlobalApi'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
const IMAGE_BASE_URL="https://image.tmdb.org/t/p/original";
const screenWidth=window.innerWidth;
import { useNavigate } from 'react-router-dom'
function Slider({setMovie}) {
    const navigate=useNavigate();
    const [movieList,setMovieList]=useState([]);
    const elementRef=useRef();
    useEffect(()=>{
        getTrendingMovies();
    },[])
    
    const handleClick=()=>{
      console.log("click")
      setMovie({show:true,movie:movie}) 
      navigate('/moviedetails')
     
    }
    const getTrendingMovies=()=>{
        GlobalApi.getTrendingVideos.then(resp=>{
            console.log(resp.data.results);
            setMovieList(resp.data.results)
        })
    }

    const sliderRight=(element)=>{
        element.scrollLeft+=screenWidth-110
    }
    const sliderLeft=(element)=>{
        element.scrollLeft-=screenWidth-110
    }
  return (
    <div>
        <HiChevronLeft className="hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer " 
        onClick={()=>sliderLeft(elementRef.current)}/>
        <HiChevronRight className='hidden md:block text-white text-[30px] absolute
        mx-8 mt-[150px] cursor-pointer right-0' 
        onClick={()=>sliderRight(elementRef.current)}/>

   
    <div className='flex overflow-x-auto w-full px-16 py-4
    scrollbar-none scroll-smooth' ref={elementRef}> 
        {movieList.map((item,i)=>(
            <img src={IMAGE_BASE_URL+item.backdrop_path} 
            onClick={()=>{    setMovie({show:true,movie:item}) 
                               navigate('/moviedetails')}}
            className='min-w-full  md:h-[310px] object-cover
            object-left-top mr-5 rounded-md hover:border-[4px]
            border-gray-400 transition-all duration-100 ease-in' key={i} />
        ))}
    </div>
    </div>
  )
}

export default Slider