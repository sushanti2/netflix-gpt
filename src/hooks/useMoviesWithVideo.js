import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addTrailerVideo } from "../utils/moviesListSlice"
import { API_OPTIONS } from "../utils/constant"

const useMoviesWithVideo = (movieId) => {
    const dispatch = useDispatch()

    const getMoviesWithVideo = async()=>{
        const data = await fetch("https://api.themoviedb.org/3/movie/"+ movieId +"/videos?language=en-US", API_OPTIONS)
        const json = await data.json()
        // console.log(json.results)
        const filterData = json.results.filter(video=> video.type == "Trailer")
        const trailer = filterData.length ? filterData[0] : json.results[0];
        // console.log(trailer);
        dispatch(addTrailerVideo(trailer))
    }

    useEffect(()=>{
        getMoviesWithVideo()
    },[])

}

export default useMoviesWithVideo