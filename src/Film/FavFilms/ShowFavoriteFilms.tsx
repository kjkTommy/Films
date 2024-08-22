import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { fetchFavoriteFilms } from "../../api/request-account";
import { Film } from "../../types";
import "./ShowFavoriteFilms.css";

export const ShowFavoriteFilms = () => {
    const [data, setData] = useState<Film[]>([]);
    const accountId = localStorage.getItem("account_id");
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchFilms = async () => {
            if (accountId && token) {
                const films = await fetchFavoriteFilms(accountId, token);
                setData(films);
            }
        };

        fetchFilms();
    }, [accountId, token]);

    return (
        <Box p={4} display='flex' flexDirection='column' gap={2}>
            {data.length > 0 ? (
                data.map((film) => (
                    <Box key={film.id} display='flex' alignItems='center' justifyContent='space-between'>
                        <p className='title-film'>{film.title}</p>
                    </Box>
                ))
            ) : (
                <p>Нет избранных фильмов.</p>
            )}
        </Box>
    );
};
