import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesListSlice";
import { useEffect } from "react";
import {API_OPTIONS} from "../utils/constant"


const useNowPlayingMoviesList = ()=>{
     //Fetch data from TMDB API and update the store
     const dispatch = useDispatch();
     const getNowPlayingMovies = async ()=>{
         const data = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'", API_OPTIONS);
         const json = await data.json();
         // console.log(json.results);
         dispatch(addNowPlayingMovies(json.results))
     }
     useEffect(()=>{
         getNowPlayingMovies()
     },[])

}

export default useNowPlayingMoviesList;