import MovieCard from "./MovieCard";
import "../styles/components/MovieList.scss";


function MovieList({ movies }) {
    if (!movies || movies.length === 0) {
        return <p className="no-resultat">Ingen filmer vises</p>;
    }

    return (
        <section className="movie-list">
            {movies.map((movie) => (
                <MovieCard key={movie.imdbID} movie={movie}/>
            ))}
        </section>
    )
}

export default MovieList;