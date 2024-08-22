import axios from "axios";
import { Film } from "../types";

const URL = {
    account: "https://api.themoviedb.org/3/account",
    favoriteFilms: (account_id: string) => `https://api.themoviedb.org/3/account/${account_id}/favorite/movies`,
    favorite: (account_id: string) => `https://api.themoviedb.org/3/account/${account_id}/favorite`,
};

export const getAccountId = async (token: string): Promise<string | null> => {
    try {
        const response = await axios.get(URL.account, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const data = response.data;
        localStorage.setItem("account_id", data.id);
        return data.id;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const fetchFavoriteFilms = async (accountId: string, token: string): Promise<Film[]> => {
    try {
        const response = await axios.get(URL.favoriteFilms(accountId), {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const films: Film[] = response.data.results.map((film: any) => ({
            ...film,
            favorite: true,
        }));
        return films;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const updateFavoriteFilm = async (accountId: string, token: string, movieId: number, favorite: boolean): Promise<void> => {
    try {
        await axios.post(
            URL.favorite(accountId),
            {
                media_type: "movie",
                media_id: movieId,
                favorite: favorite,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json;charset=utf-8",
                },
            },
        );
    } catch (error) {
        console.error(error);
    }
};
