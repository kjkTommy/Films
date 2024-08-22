import { Autocomplete, Box, FormControl, InputLabel, MenuItem, Pagination, Select, SelectChangeEvent, Slider, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getGenresList } from "../../api/request-genres";
import { FiltersProps, Genre } from "../../types";
import "../Sidebar.css";
import { dataSelect } from "../data/data";

export function Filters({ sortSelect, setSortSelect, value, setValue, selectedGenres, setSelectedGenres, handlePageChange }: FiltersProps) {
    const [genres, setGenres] = useState<Genre[]>([]);
    const currentYear = new Date().getFullYear();

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genresList = await getGenresList();
                setGenres(genresList.map((genre) => ({ ...genre, checked: false })));
            } catch (error) {
                console.error("Error fetching genres:", error);
            }
        };
        fetchGenres();
    }, []);

    const handleSortChange = (event: SelectChangeEvent<string>) => {
        setSortSelect(event.target.value);
    };

    const handleScrollYear = (_event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const yearValueText = (value: number) => `${value}`;

    const handleGenresChange = (_event: React.SyntheticEvent, newValue: Genre[]) => {
        setSelectedGenres(newValue);
    };

    return (
        <Box className='filters-container' p={4} marginTop='-30px' display='flex' flexDirection='column' gap={4}>
            <Box className='select-container' display='flex' flexDirection='column' gap={2}>
                <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label-sort'>Сортировать по:</InputLabel>
                    <Select labelId='demo-simple-select-label-sort' id='demo-simple-select-sort' value={sortSelect} label='Сортировать по:' onChange={handleSortChange}>
                        {dataSelect.sort.map((select, index) => (
                            <MenuItem key={index} value={select}>
                                {select}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <h3 className='h3-year-value'>Год релиза:</h3>
                <Slider getAriaLabel={() => "year range"} value={value} onChange={handleScrollYear} valueLabelDisplay='auto' getAriaValueText={yearValueText} min={1900} max={currentYear} />
            </Box>
            <Box className='checkbox-container' display='flex' flexDirection='column' marginTop='-16px'>
                <Stack spacing={3} sx={{ width: 350 }}>
                    <Autocomplete
                        multiple
                        id='tags-standard'
                        options={genres}
                        getOptionLabel={(genre) => genre.name}
                        value={selectedGenres}
                        onChange={handleGenresChange}
                        renderInput={(params) => <TextField {...params} variant='standard' label='Жанры' placeholder='Выберите жанры' />}
                    />
                </Stack>
            </Box>
            <Box className='pagination-container'>
                <Stack sx={{ marginTop: "-18px" }}>
                    <Pagination count={10} color='standard' onChange={handlePageChange} />
                </Stack>
            </Box>
        </Box>
    );
}
