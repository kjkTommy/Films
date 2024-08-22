import { TextField } from "@mui/material";
import { useState } from "react";

interface FilmSearchComponentProps {
    onSearch: (query: string) => void;
}

const FilmSearchComponent: React.FC<FilmSearchComponentProps> = ({ onSearch }) => {
    const [query, setQuery] = useState<string>("");

    const handleSearch = () => {
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <TextField
            label='Поиск фильмов'
            variant='outlined'
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    handleSearch();
                }
            }}
            onBlur={handleSearch}
        />
    );
};

export default FilmSearchComponent;
