import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { ChangeEvent, useEffect, useState } from "react";
import { getAccountId } from "../api/request-account";
import { FormState, TitleProps } from "../types";
import "./Title.css";

export function Title({ onTokenSet }: TitleProps) {
    const [value, setValue] = useState<FormState>({
        email: "",
        token: "",
    });
    const [open, setOpen] = useState<boolean>(true);

    useEffect(() => {
        const existingToken = localStorage.getItem("token");
        if (existingToken) {
            setOpen(false);
            onTokenSet(existingToken);
        }
    }, [onTokenSet]);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setValue((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    };
    const handleTokenSubmit = () => {
        if (value.token) {
            localStorage.setItem("token", value.token);
            onTokenSet(value.token);
            getAccountId(value.token);
            setOpen(false);
        }
    };
    return (
        <Box display='flex' p={2} justifyContent='space-between' className='Container-title'>
            <h1>STRADAPOISK</h1>
            <IconButton color='primary' onClick={() => setOpen(true)}>
                <AccountCircleRoundedIcon sx={{ color: "white" }} fontSize='large' />
            </IconButton>
            <Dialog open={open}>
                <DialogTitle>Введите токен</DialogTitle>
                <DialogContent>
                    <TextField onChange={handleChange} autoFocus required margin='dense' name='token' label='Токен' type='text' fullWidth value={value.token} variant='standard' />
                    <Button variant='text' onClick={() => setOpen(false)}>
                        Отмена
                    </Button>
                    <Button variant='text' onClick={handleTokenSubmit}>
                        Ок
                    </Button>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
