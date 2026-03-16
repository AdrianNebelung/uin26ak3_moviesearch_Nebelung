import { useState, useEffect } from "react";
import "../styles/components/SearchBar.scss";

{/* Denne koden definerer logikken i SearchBar-komponentet.
    Den håndterer den interne tilstanden til søkefeltet, og trigger
    søkefunksjonalitetet basert på brukerinput og spesifikke krav. */}
function SearchBar({ onSearch, searchTerm }) {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        setInputValue(searchTerm || "");
    }, [searchTerm]);

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        if (value.length === 0 || value.length >= 3) {
            onSearch(value);
        }
    };
{/*---------------------------------------------------------*/}

{/* handleSearch er en håndteringsfunksjon som aktiveres når skjemaet (form)
    i SearchBar-komponentet sendes inn. Dens hovedoppgave er å validere brukerens
    input og deretter enten utføre søket eller gi brukeren
    en feilmelding. */}
    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.length >= 3) {
            onSearch(inputValue);
        } else {
            alert("Søket må inneholde minst 3 tegn.");
        }
    };
{/*---------------------------------------------------------*/}

{/* Denne koden generer HTML-strukturen for søkefeltet. Den inneholder et input-felt
    og en søkeknapp i et HTML-skjema (form), og knytter disse til React-tilstand og funskjoner
    for å håndtere brukerinteraksjon.*/}

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <label htmlFor="movie-search" className="movie-search">
                <input id="movie-search" type="search" placeholder="Søk etter filmer" value={inputValue} onChange={handleChange}/>
                <button type="submit">Søk</button>
            </label>
        </form>
    )
}

export default SearchBar;