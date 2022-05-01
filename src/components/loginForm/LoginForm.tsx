import { FC, ChangeEvent } from 'react';
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { ISubmit } from "../types/types";
import FormBody from "../UI components/FormBody";

const LoginForm: FC<ISubmit> = ({ onSubmit }) => {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");

    const handleChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };
    const handleChangePass = (event: ChangeEvent<HTMLInputElement>) => {
        setPass(event.target.value);
    };

    const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
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
                label="Please type here..."
                variant="outlined" />
            <TextField
                type="password"
                value={pass}
                onChange={handleChangePass}
                label="Please type here..."
                variant="outlined" />
            <Button
                type="submit"
                variant="contained"
            >
                Submit!
            </Button>
        </FormBody>
    );
};

export default LoginForm;