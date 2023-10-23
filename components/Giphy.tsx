// components/GifSearch.tsx
"use client";
import React, { useState } from "react";

const Giphy: React.FC = () => {
    const [query, setQuery] = useState("");
    const [gifs, setGifs] = useState<any[]>([]);

    const searchGifs = async () => {
        const response = await fetch(
            `api.giphy.com/v1/gifs/search?api_key=tnr0r5NfiJaDjnaXxLs3Erd3HoSPfav6&q="smart"&limit=2`
        );
        if (!response.ok) {
            console.error("Failed to fetch gifs:", response.statusText);
            return;
        }
        const data = await response.json();
        setGifs(data.data);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="text-black"
            />
            <button onClick={searchGifs}>Search</button>
            <div>
                {gifs.map((gif) => (
                    <img
                        key={gif.id}
                        src={gif.images.fixed_height.url}
                        alt={gif.title}
                        onClick={() => console.log(gif.images.fixed_height.url)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Giphy;
