import { Film } from "../types";

const apiKey = localStorage.getItem("token");

export const URL = {
    TOP_RATED: "https://api.themoviedb.org/3/movie/top_rated?language=ru-RU",
    POPULAR: "https://api.themoviedb.org/3/movie/popular?language=ru-RU",
    SEARCH: "https://api.themoviedb.org/3/search/movie",
};

export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

export const getFilmsList = async (url: string) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.status_message || "Failed to fetch films");
        }
        return data;
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
};

export const getFilmDetails = async (filmId: string): Promise<Film> => {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${filmId}?language=ru-RU`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.status_message || "Failed to fetch film details");
        }

        return {
            id: data.id,
            title: data.title,
            overview: data.overview,
            release_date: data.release_date,
            poster_path: data.poster_path,
            backdrop_path: data.backdrop_path || "",
            vote_average: data.vote_average,
            vote_count: data.vote_count || 0,
            favorite: false,
        };
    } catch (error) {
        console.error("API request failed:", error);
        throw error;
    }
};

export const searchFilms = async (query: string, page: number) => {
    const response = await fetch(`${URL.SEARCH}?query=${encodeURIComponent(query)}&page=${page}`);
    if (!response.ok) {
        throw new Error("Ошибка при поиске фильмов");
    }
    return await response.json();
};
