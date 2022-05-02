import { FC, ChangeEvent } from 'react';
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { ISubmit } from "../types/types";
import FormBody from "../UI components/FormBody";

const LoginForm: FC<ISubmit> = ({ onSubmit }) => {
    //локально сохраняем данные инпутов
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    //обработчики изменения инпутов
    const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>): void => {
        setLogin(event.target.value);
    };
    const handleChangePass = (event: ChangeEvent<HTMLInputElement>): void => {
        setPass(event.target.value);
    };
    //обработчик отправки формы
    const handleSubmit = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        onSubmit({ login, pass });
        setLogin("");
        setPass("");
    };

    return (
        <FormBody onSubmit={handleSubmit}>
            <TextField
                type="email"
                value={login}
                onChange={handleChangeLogin}
                label="Please type email here..."
                variant="outlined" />
            <TextField
                type="password"
                value={pass}
                onChange={handleChangePass}
                label="Please type password here..."
                variant="outlined" />
            <Button
                type="submit"
                sx={{ backgroundColor: "#4dabf5", padding: "15px" }}
                variant='contained'
            >
                Submit!
            </Button>
        </FormBody>
    );
};

export default LoginForm;