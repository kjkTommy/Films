import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_IMAGE_URL, getFilmDetails } from "../api/request-films";
import { Film } from "../types";

export default function FilmDetail() {
    const { cardId } = useParams<{ cardId: string }>();
    const [film, setFilm] = useState<Film | null>(null);

    useEffect(() => {
        const fetchFilmDetails = async () => {
            if (cardId) {
                try {
                    const filmDetails = await getFilmDetails(cardId);
                    setFilm(filmDetails);
                } catch (error) {
                    console.error("Failed to fetch film details:", error);
                }
            }
        };
        fetchFilmDetails();
    }, [cardId]);

    if (!film) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Card sx={{ maxWidth: 800 }}>
                <CardMedia component='img' height='500' image={`${BASE_IMAGE_URL}${film.poster_path}`} alt={film.title} />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {film.title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Release Date: {film.release}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Rating: {film.vote_average}
                    </Typography>
                </CardContent>
            </Card>
        </Box>
    );
}
