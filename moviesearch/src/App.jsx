import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchBar from "./components/SearchBar";
import { searchMovies } from "./api/Api";
import "./styles/App.scss";
import { useEffect, useState} from "react";


function App() {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const removeDuplicates = (movieList) => {
        const imdbIDS = new Set();
        return movieList.filter(movie => {
            if (imdbIDS.has(movie.imdbID)) {
                return false;
            }

            imdbIDS.add(movie.imdbID);
            return true;
        });
    };

    useEffect(() => {
        const fetchMovies = async () => {
            setIsLoading(true);
            setError(null);

            const { movies: movieSearch, error: movieError } = await searchMovies("James Bond");

            if (movieError) {
                setError(movieError);
                setMovies([]);
            } else {
                setMovies(removeDuplicates(movieSearch || []));
                setError(null);
            }
            setIsLoading(false);
        };
        
        fetchMovies();
    }, []);

    const handleSearch = async (term) => {
        setSearchTerm(term);
        if (term.length >= 3) {
            setIsLoading(true);
            setError(null);

            const { movies: searchResults, error: searchError } = await searchMovies(term);

            if (searchError) {
                setError(searchError);
                setMovies([]);
            } else {
                setMovies(removeDuplicates(searchResults || []));
                setError(null);
            }

            setIsLoading(false);
        } else if (term.length === 0) {
            setMovies([]);
            setError(null);
        }
    }


    return (
        <>
            <header>
                <nav>
                    <SearchBar onSearch={handleSearch} searchTerm={searchTerm}/>
                </nav>
            </header>
            <main>
                <Routes>
                    <Route path="/" element={<Home movies={movies} isLoading={isLoading} error={error}/>}/>
                    <Route path="/movie/:imdbID" element={<MovieDetails/>}/>
                </Routes>
            </main>
        </>
    )
}

export default App;