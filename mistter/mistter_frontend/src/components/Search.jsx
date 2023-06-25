import React, { useState, useContext } from 'react';
import { SearchContext } from './SearchContext';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const [query, setQuery] = useState('');
    const { setSearchResults } = useContext(SearchContext);
    const navigate = useNavigate();

    const handleSearch = async () => {
        const response = await fetch(`http://localhost:8000/mistterapp/post-search?query=${query}`);
        const data = await response.json();
        if (Array.isArray(data)) {
            setSearchResults(data);
            navigate("/search");
        } else {
            console.error("Unexpected data format:", data);
        }
    };

    return (
        <div>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default Search;
