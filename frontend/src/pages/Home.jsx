import { useState, useEffect } from "react"
import '../css/Home.css'
import MovieCard from "../components/MovieCard"
import { searchMovies,getPopularMovies } from "../services/api"
function Home(){

    const[searchQuery , setSearchQuery] = useState('')

     const [movies, setMovies] = useState([]) ;

     const [loading, setLoading] = useState(true);
     
     useEffect(() => {
        const loadPopularMovies = async () => {
          try{
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
          }catch(err){
            console.error("Failed to fetch popular movies:", err);
          }finally{
            setLoading(false);
          }

        }
        loadPopularMovies();
      
     },[])

    const handleSearch = async (e) =>{
        e.preventDefault()
       if(!searchQuery.trim()) return;
       if (loading) return

       setLoading(true);
       try{
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);


       }catch(err){
        alert("Failed to fetch search results",err)

       }finally{
         setLoading(false)
      }
    }



    return(
       <div className="home">
  <form onSubmit={handleSearch} className="search-form">
        <input type="text" placeholder="Search movies..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
        <button type="submit" className="search-button">Search</button>
  </form>
  {loading ? <div className="loading">Loading...</div> :   <div className="movies-grid">
            {movies.map((movie) =>(
             <MovieCard movie={movie} key={movie.id}/>))}</div>}
      
       </div>
    )
}

export default Home