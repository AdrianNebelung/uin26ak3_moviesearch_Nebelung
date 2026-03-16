import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import SearchBar from "./components/SearchBar";
import { searchMovies } from "./api/Api";
import "./styles/App.scss";
import { useEffect, useState} from "react";


function App() {
{/*---------------------------------------------------------*/}
{/* Her har jeg kjernen av dymaiske tilstander (state) som er data et komponent trenger å huske for å funger
    og endre over tid. Jeg har brukt useState for at man skal oppnå dette. Når tilstanden endres
    vil React automatisk oppdatere brukergrensesnittet for å reflektere disse endringene. */}
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
{/*---------------------------------------------------------*/}


{/* removeDuplicates er en hjelpefunksjon som tar inn listen med filmer (movieList)
    og returnerer en ny lust som kun inneholder unike filmer. Dette defineres her basert på imdbID,
    som er en unik identifikasjon for hver film fra OMDB API-et. Kilde Developer Mozilla Set, ChatGPT, Rendering List. */}
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
{/*---------------------------------------------------------*/}

{/* Denne useEffect-hooken er ansvarlig for datahenting av "James Bond"-filmer
    fra OMDB API-et når App-komponentet blir rendret for første gang i nettleseren.
    Dette er slik at den viser en startlist med filmer før brukeren har gjort et søk.*/}
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
{/*---------------------------------------------------------*/}

{/* handleSearch er en async funksjon som aktiveres hver gang søketermet i SearchBar endres.
    Dens hovedoppgave er å hente filmer fra OMDB API-et basert på brukrens søk, og deretter
    oppdatere nettstedets tilstand etter resultatene, eller hvis ting skulle gå dårlig
    vise en feilmelding. */}
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
{/*---------------------------------------------------------*/}

{/* Denne delen av koden beskriver det grunnleggende layouten og funksjonaliteten til
    brukergrensesnittet for hele nettstedet. */}

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