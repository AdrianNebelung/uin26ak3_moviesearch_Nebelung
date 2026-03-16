import MovieCard from "./MovieCard";
import "../styles/components/MovieList.scss";

{/* Denne koden er det første MovieList-komponentet gjør når den mottar en
    list med filmer. Den sjekker umiddelbar om det er noen filmer i listen. Hvis
    det ikke er det, returnerer den en melding som informerer brukeren om dette, i stedet for å
    prøve å rendre en tom filmliste. */}
function MovieList({ movies }) {
    if (!movies || movies.length === 0) {
        return <p className="no-resultat">Ingen filmer vises</p>;
    }
{/*---------------------------------------------------------*/}

{/* Denne koden rendrer en liste med filmkort ved å ta en array av filmer og forvandle
    hvert filmobjekt til en MovieCard-komponent. Dette skjer bare dersom movies-arrayen
    faktisk inneholder filmer. */}
    return (
        <section className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie}/>
            ))}
        </section>
    )
}

export default MovieList;