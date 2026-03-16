const API_KEY = "f27b490e";
const BASE_URL = "https://www.omdbapi.com/";

{/* Disse funksjonene er ansvarlig for å sende søkeforespørsler til OMDB API
    basert på en gitt searchTerm og returnerer en liste med filmer som matcher søket.
    Den er bygget for å håndtere både suksessfulle resultater og ulike typer feil. */}
export async function searchMovies(searchTerm) {
    if (!searchTerm || searchTerm.length < 3) {
        return {
            movies: [],
            error: null
        };
    }

    try {
        const response = await fetch(`${BASE_URL}?s=${searchTerm}&apikey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`Feil: ${response.status}`);
        }

        const data = await response.json();
        if (data.Response === "True") {
            return {
                movies: data.Search,
                error: null
            };
        } else {
            return {
                movies: [],
                error: data.Error
            };
        } 
    } catch (err) {
        console.error("Feil med OMDB API:", err);
        return {
            movies: [],
            error: "Klarte ikke å hente filmer."
        }
    }
}

export async function getMovieDetails(imdbID) {
    if (!imdbID) {
        return {
            movieDetails: null,
            error: "Ingen film-ID."
        };
    }
    
    try {
        const response = await fetch(`${BASE_URL}?i=${imdbID}&plot=full&apikey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`Feil: ${response.status}`);
        }

        const data = await response.json();
        if (data.Response === "True") {
            return {
                movieDetails: data,
                error: null
            };
        } else {
            return {
                movieDetails: null,
                error: data.Error
            };
        }
    } catch (err) {
        console.error("Feil ved henting av filmdetaljer.", err);
        return {
            movieDetails: null,
            error: "Klarte ikke å hente filmdetaljer."
        };
    }
}