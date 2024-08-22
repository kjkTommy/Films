import { Star } from "@mui/icons-material";
import { Box, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { updateFavoriteFilm } from "../../api/request-account";
import { getFilmsList, URL } from "../../api/request-films";
import { CardsGalleryProps, Film } from "../../types";
import "./CardsGallery.css";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export function CardsGallery({ sortSelect, page }: CardsGalleryProps) {
    const [films, setFilms] = useState<Film[]>([]);
    const [activeFilms, setActiveFilms] = useState<{ [key: number]: boolean }>({});
    useEffect(() => {
        const savedFavorites = localStorage.getItem("favorites");
        if (savedFavorites) {
            setActiveFilms(JSON.parse(savedFavorites));
        }
    }, []);

    const toggleToFavorite = async (filmId: number) => {
        const token = localStorage.getItem("token");
        const accountId = localStorage.getItem("account_id");

        if (!token || !accountId) {
            console.error("Токен или ID аккаунта не найден");
            return;
        }

        try {
            const isFavorite = !activeFilms[filmId];
            await updateFavoriteFilm(accountId, token, filmId, isFavorite);

            const updatedActiveFilms = {
                ...activeFilms,
                [filmId]: isFavorite,
            };

            setActiveFilms(updatedActiveFilms);
            localStorage.setItem("favorites", JSON.stringify(updatedActiveFilms));
        } catch (error) {
            console.error("Ошибка при обновлении избранного:", error);
        }
    };

    useEffect(() => {
        const fetchFilms = async () => {
            const url = sortSelect === "Популярности" ? `${URL.POPULAR}&page=${page}` : `${URL.TOP_RATED}&page=${page}`;
            try {
                const filmsList = await getFilmsList(url);
                setFilms(filmsList.results);
            } catch (error) {
                console.error("Не удалось загрузить фильмы:", error);
            }
        };
        fetchFilms();
    }, [sortSelect, page]);

    return (
        <Box className='cards-container' display='flex' flexDirection='row' gap={3}>
            {films.map((film) => (
                <Card key={film.id} sx={{ width: 300, maxHeight: 420, paddingBottom: "10px" }} elevation={3}>
                    <CardActionArea>
                        <CardMedia component='img' height='280' image={`${BASE_IMAGE_URL}${film.poster_path}`} alt={film.title} />
                        <CardContent>
                            <Typography gutterBottom variant='h5' component='div'>
                                <h5>{film.title}</h5>
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <Box display='flex' flexDirection='row' gap={3} justifyContent='space-around' alignItems='center' className='bot-card-content'>
                        <Typography variant='body2' color='text.secondary'>
                            {`Рейтинг ${Math.round(film.vote_average)}`}
                        </Typography>
                        <IconButton onClick={() => toggleToFavorite(film.id)}>{activeFilms[film.id] ? <Star sx={{ color: "rgb(255, 234, 45)" }} /> : <Star />}</IconButton>
                    </Box>
                </Card>
            ))}
        </Box>
    );
}
