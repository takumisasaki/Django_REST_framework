import React, { useState } from 'react';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await fetch(`http://localhost:8000/mistake/post-search?query=${query}`);
        const data = await response.json();
        const jsonData = JSON.parse(data);  
        console.log(jsonData);
        if (Array.isArray(jsonData)) {
            setResults(jsonData.map(item => item.fields)); // Extract 'fields' from each item
        } else {
            console.error("Unexpected data format:", jsonData);
        }
    };

    return (
        <div>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            {results.map(result => (
                <p key={result.id}>{result.text}</p> // Assume that result object has 'id' and 'name'
            ))}
        </div>
    );
};

export default Search;
