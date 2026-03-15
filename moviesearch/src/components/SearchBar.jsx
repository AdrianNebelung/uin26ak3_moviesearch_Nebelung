import { useState, useEffect } from "react";
import "../styles/components/SearchBar.scss";

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.length >= 3) {
            onSearch(inputValue);
        } else {
            alert("Søket må inneholde minst 3 tegn.");
        }
    };

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