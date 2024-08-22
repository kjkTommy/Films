import { Genre } from "../types";

const url = "https://api.themoviedb.org/3/genre/movie/list?language=ru";
export const getGenres = async () => {
    const request = await fetch(url);
    const response = await request.json();
    if (!response.ok) {
        throw new Error();
    } else {
        return response.data;
    }
};
const authorizationToken = localStorage.getItem("token");

export const getGenresList = async (): Promise<Genre[]> => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${authorizationToken}`,
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.status_message || "Failed to fetch genres");
        }
        return data.genres;
    } catch (error) {
        throw error;
    }
};
