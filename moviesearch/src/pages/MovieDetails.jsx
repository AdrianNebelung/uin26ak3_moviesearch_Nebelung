import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router-dom"; 
import { getMovieDetails } from "../api/Api";
import "../styles/pages/MovieDetails.scss";

{/* Her har jeg lagt inn en egen placeholder bilde for bilder som ikke lastes opp av API-et */}
const PLACEHOLDER_IMAGE_URL = "https://picsum.photos/seed/mountain/300/450";

function MovieDetails() {
    const { imdbID } = useParams();
    const navigate = useNavigate();
    const [movieDetails, setMovieDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };
{/*---------------------------------------------------------*/}

{/* Denne useEffect-hooken er ansvarlig for å hente alle detalijene for en spesifikk film
    fra OMDB API-et. Den aktiveres når MovieDetails først rendres, og
    deretter hver gang imdbID-variablen endrer verdi. Dette sikrer at filmdetalijene alltid 
    er oppdatert basert på den filmen brukren har valgt å se. */}
    useEffect(() => {
        const fetchMovieDetails = async () => {
            if (!imdbID) {
                setError("Kunne ikke finne film-ID.");
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            setImageError(false);
            const { movieDetails: fetchDetails, error: fetchError } = await getMovieDetails(imdbID);
            if (fetchError) {
                setError(fetchError);
                setMovieDetails(null);
            } else {
                setMovieDetails(fetchDetails);
                setError(null);

                if (!fetchDetails.Poster || fetchDetails.Poster === "N/A" || fetchDetails.Poster === "") {
                    setImageError(true);
                }
            }
            setIsLoading(false);
        };
        fetchMovieDetails();
    }, [imdbID]);
{/*---------------------------------------------------------*/}

{/* Denne sekvensen av if-koder kontrollerer hvilken del av brukergrensesnittet som
    skal vises til brukeren. React sjekker om disse stemmer overens i situasjonen kodene er i,
    og så snart betingelsen er sann og en return-setning utføres, stopper rendering
    av denne komponenten, og returnerte elementet vises. */}
    if (isLoading) {
        return <article className="status-loading">Laster inn detaljer</article>
    }

    if (error) {
        return <article className="status-error">Feil: {error}</article>
    }

    if (!movieDetails) {
        return <article className="status-info">Fant ingen detaljer</article>
    }
{/*---------------------------------------------------------*/}

{/* Denne delen av koden definerer hvordan en enkelt filmdetaljeside skal se ut
    når movieDetails inneholder gyldig data.*/}
    return (
        <article className="movie-details">
            <button onClick={() => navigate(-1)} className="back">Tilbake</button>
            <section className="details">
                <h1>{movieDetails.Title} ({movieDetails.Year})</h1>
                {imageError? (
                    <img src={PLACEHOLDER_IMAGE_URL} alt="Ingen plakat tilgjengelig"/>
                ) : (
                    <img src={movieDetails.Poster} alt={`Plakat for ${movieDetails.Title}`} onError={handleImageError}/>
                )}
            </section>
            <section className="info">
                <p><strong>Utgitt: </strong> {movieDetails.Released}</p>
                <p><strong>Sjanger:</strong> {movieDetails.Genre}</p>
                <p><strong>Regissør:</strong> {movieDetails.Director}</p>
                <p><strong>Skuespillere:</strong> {movieDetails.Actors}</p>
                <p><strong>Handling:</strong> {movieDetails.Plot}</p>
                <p><strong>IMDb Rating:</strong> {movieDetails.imdbRating}</p>
            </section>
        </article>
    )
}

export default MovieDetails;