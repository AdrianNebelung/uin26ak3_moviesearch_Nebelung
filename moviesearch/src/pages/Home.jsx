import MovieList from "../components/MovieList";
import "../styles/pages/Home.scss";

function Home({ movies, isLoading, error }) {
    return (
        <article className="home">
            <h1>Movie Search</h1>
            {isLoading && <p className="status-loading">Laster inn filmer...</p>}
            {error && <p className="status-error">Feil: {error}</p>}
            {!isLoading && !error && (
                <MovieList movies={movies}/>
            )}
        </article>
    )
}

export default Home;