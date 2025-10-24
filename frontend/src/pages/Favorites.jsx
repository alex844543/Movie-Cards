import '../css/Favorites.css'
import { useMovieContext } from '../contexts/MovieContext'
import MovieCard from '../components/MovieCard'

function Favorite(){
    const {favorites} = useMovieContext();
    
    if(favorites.length > 0){
        return (
            <div className='favorites'>
                <h2>Your Favorites</h2>
                <div className="movies-grid">
                    {favorites.map((movie) => (
                        <MovieCard movie={movie} key={movie.id}/>
                    ))}
                </div>
            </div>
        )
    }

    return(
        <div className="favorites-empty">
            <h2>No Favorites Movie Yet</h2>
            <p>Start adding movies and they will eventually appear here</p>
        </div>
    )
}

export default Favorite