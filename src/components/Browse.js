import Header from "./Header";
import useNowPlayingMoviesList from "../hooks/useNowPlayingMoviesList";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";


const Browse = ()=> {

    useNowPlayingMoviesList();


    return(
        <div>
            <Header/>
            <MainContainer/>
            <SecondaryContainer/>
            {/* 
              MainContainer
                -VideoBackground
                -Videotitle
              SecondaryContainer
                -MovieList
                  -cards
             */}
        </div>
    )
}

export default Browse;