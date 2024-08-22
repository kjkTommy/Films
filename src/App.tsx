import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { searchFilms } from "./api/request-films";
import "./App.css";
import { CardsGallery } from "./Film/CardsGallery/CardsGallery";
import { Sidebar } from "./Sidebar/Sidebar";
import { Title } from "./title/Title";

function App() {
    const [sortSelect, setSortSelect] = useState<string>("Популярности");
    const [page, setPage] = useState<number>(1);
    const [filmsList] = useState<any[]>([]);
    const [foundFilm, setFoundFilm] = useState<any | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchedToken = localStorage.getItem("token");
        if (fetchedToken) {
            setToken(fetchedToken);
        }
    }, []);

    const handleTokenSet = (newToken: string) => {
        setToken(newToken);
    };

    const handleSearch = async (query: string) => {
        try {
            const result = await searchFilms(query, 1);
            if (result && result.results && result.results.length > 0) {
                setFoundFilm(result.results[0]);
            } else {
                setFoundFilm(null);
            }
        } catch (error) {
            console.error("Ошибка поиска фильмов:", error);
        }
    };

    return (
        <Box>
            <Title onTokenSet={handleTokenSet} />
            {token && (
                <Box display='flex' flexDirection='row' gap={3}>
                    <Sidebar sortSelect={sortSelect} setSortSelect={setSortSelect} page={page} setPage={setPage} onSearch={handleSearch} />
                    <CardsGallery sortSelect={sortSelect} page={page} films={filmsList} foundFilm={foundFilm} />
                    <Box flex={1}>
                        <Outlet />
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default App;
