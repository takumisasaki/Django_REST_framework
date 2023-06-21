import React, { useState } from 'react';
import { Card, CardContent, Typography } from "@mui/material";

const Search = () => {
    const [query, setQuery] = useState('');
    const [item, setItem] = useState([]);

    const handleSearch = async () => {
        const response = await fetch(`http://localhost:8000/mistake/post-search?query=${query}`);
        const data = await response.json();
        // const jsonData = JSON.parse(data);  
        console.log(data);
        if (Array.isArray(data)) {
            setItem(data); // Extract 'fields' from each item
        } else {
            console.error("Unexpected data format:", data);
        }
    };

    return (
        <div>
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} />
            <button onClick={handleSearch}>Search</button>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '0 30%' }}>
            {item.map(item => (
                <Card key={item.id} style={{ marginBottom: "15px", width: '100%', borderRadius: 15, boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)" }}>
                <CardContent>
                    <Typography variant="h6" component="h2" style={{fontWeight: "bold"}}>
                        {item.user.username}
                    </Typography>
                    <Typography color="textSecondary" style={{ marginBottom: "10px" }}>
                        Categories: {Array.isArray(item.categories) ? item.categories.join(', ') : item.categories}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {item.text}
                    </Typography>
                </CardContent>
            </Card> // Assume that result object has 'id' and 'name'
            ))}
        </div>
        </div>
    );
};

export default Search;
