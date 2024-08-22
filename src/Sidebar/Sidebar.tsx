import { HighlightOffRounded } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { URL } from "../api/request-films";
import { ShowFavoriteFilms } from "../Film/FavFilms/ShowFavoriteFilms";
import FilmSearchComponent from "../Film/SearchFilm/FilmSearchComponent";
import { Genre, SidebarProps } from "../types";
import { Filters } from "./SidebarComponents/Filters";

export const Sidebar: React.FC<SidebarProps> = ({ sortSelect, setSortSelect, page, setPage, onSearch }) => {
    const [value, setValue] = useState<number[]>([1999, 2024]);
    const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
    const [showFavorites, setShowFavorites] = useState<boolean>(false);

    useEffect(() => {
        fetchFilms(page);
    }, [page, sortSelect]);

    const fetchFilms = async (page: number) => {
        try {
            const endpoint = sortSelect === "Популярности" ? URL.POPULAR : URL.TOP_RATED;
            const fetchUrl = `${endpoint}&page=${page}`;

            const response = await fetch(fetchUrl);
            const data = await response.json();

            console.log("Fetched films data:", data);
        } catch (error) {
            console.error("Error fetching films list:", error);
        }
    };

    const handleClickReset = () => {
        setSortSelect("");
        setValue([1999, 2024]);
        setSelectedGenres([]);
    };

    const handlePageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Box className='sb-container' display='flex' flexDirection='column'>
            <Box className='sb-title' display='flex' flexDirection='row' justifyContent='space-between' pl={2} pt={4} pr={2}>
                <h3 className='sb-h3-title'>Фильтры</h3>
                <IconButton onClick={handleClickReset}>
                    <HighlightOffRounded />
                </IconButton>
            </Box>
            <FilmSearchComponent onSearch={onSearch} />
            <Filters
                sortSelect={sortSelect}
                setSortSelect={setSortSelect}
                value={value}
                setValue={setValue}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                handleClickReset={handleClickReset}
                handlePageChange={handlePageChange}
            />
            <Button variant='contained' color='primary' onClick={() => setShowFavorites((prev) => !prev)} style={{ marginTop: "16px" }}>
                {showFavorites ? "Скрыть избранное" : "Показать избранное"}
            </Button>
            {showFavorites && <ShowFavoriteFilms />}
        </Box>
    );
};
