export interface Genre {
    id: number;
    name: string;
    checked?: boolean;
}
export interface CardsGalleryProps {
    sortSelect: string;
    page: number;
    films: Film[];
    foundFilm: Film | null;
}

export interface RouterError {
    statusText?: string;
    message?: string;
}
export interface SidebarProps {
    sortSelect: string;
    setSortSelect: React.Dispatch<React.SetStateAction<string>>;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    onSearch: (query: string) => void;
}
export interface FilmSearchComponentProps {
    setFilms: React.Dispatch<React.SetStateAction<any[]>>;
}
export interface TitleProps {
    onTokenSet: (token: string) => void;
}

export interface FormState {
    email: string;
    token: string;
}
export interface FiltersProps {
    sortSelect: string;
    setSortSelect: (value: string) => void;
    value: number[];
    setValue: (value: number[]) => void;
    selectedGenres: Genre[];
    setSelectedGenres: (genres: Genre[]) => void;
    handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
    handleClickReset: () => void;
}
export interface Film {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    poster_path: string;
    backdrop_path: string;
    vote_average: number;
    vote_count: number;
    favorite: boolean;
}
