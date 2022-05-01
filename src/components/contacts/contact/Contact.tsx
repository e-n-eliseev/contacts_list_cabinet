import Divider from '@mui/material/Divider';
import { FC, memo, useState, ChangeEvent } from 'react';
import { Button, TextField } from "@mui/material";
import { IContactItem } from '../../types/types';


const Contact: FC<IContactItem> = memo(({ isAddForm, item }) => {
    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };
    const handleChangeSurname = (event: ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
    };
    const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
        setPhone(event.target.value);
    };
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <>
            <TextField
                type="text"
                value={name}
                onChange={handleChangeName}
                label="Please type name here..."
                variant="outlined" />
            <TextField
                type="text"
                value={surname}
                onChange={handleChangeSurname}
                label="Please type surname here..."
                variant="outlined" />
            <TextField
                type="phone"
                value={phone}
                onChange={handleChangePhone}
                label="Please type phone here..."
                variant="outlined" />
            <TextField
                type="email"
                value={email}
                onChange={handleChangeEmail}
                label="Please type email here..."
                variant="outlined" />
            <Button
                type="submit"
                sx={{ backgroundColor: "#4dabf5", padding: "15px" }}
                variant='contained'
            >
                Save It!
            </Button>
            <Divider />
        </>
    );
}
)

export default Contact;