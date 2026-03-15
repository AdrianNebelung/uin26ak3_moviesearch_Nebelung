import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/components/MovieCard.scss";

function MovieCard({ movie }) {

    const PLACEHOLDER_IMAGE_URL = "https://picsum.photos/seed/mountain/300/450";
    const [imageError, setImageError] = useState( !movie.Poster || movie.Poster === "N/A" || movie.Poster === "");
    
    useEffect(() => {
        setImageError(!movie.Poster || movie.Poster === "N/A" || movie.Poster === "");
    }, [movie.Poster]);

    const handleImageError = () => {
        setImageError(true);
    }

    return (
        <article className="movie-card">
            <Link to={`/movie/${movie.imdbID}`}>
                <figure>
                    {imageError ? (
                        <img src={PLACEHOLDER_IMAGE_URL} alt="Ingen plakat tilgjengelig"/>
                    ) : (
                        <img src={movie.Poster} alt={`Plakat for ${movie.Title}`} onError={handleImageError}/>
                    )}
                    <figcaption>
                        <h3>{movie.Title}</h3>
                        <p className="year">Utgivelsesår: {movie.Year}</p>
                    </figcaption>
                </figure>
            </Link>
        </article>
    )
}

export default MovieCard;