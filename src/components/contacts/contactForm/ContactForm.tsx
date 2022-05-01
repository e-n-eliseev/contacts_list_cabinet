import Tooltip from '@mui/material/Tooltip';
import { FC, memo, useState, ChangeEvent } from 'react';
import { TextField } from "@mui/material";
import { IContactItem } from '../../types/types';
import FormBody from '../../UI components/FormBody';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

const ContactForm: FC<IContactItem> = memo(({ isAddForm, item }) => {
    const [name, setName] = useState<string>(item?.name || "");
    const [surname, setSurname] = useState<string>(item?.surname || "");
    const [phone, setPhone] = useState<string>(item?.phone || "");
    const [email, setEmail] = useState<string>(item?.email || "");
    const [isChanged, setIsChanged] = useState<boolean>(false);

    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const item = event.target.value;
        if (item.trim()) {
            setName(item);
            if (!isChanged) setIsChanged(true)
        }
    };
    const handleChangeSurname = (event: ChangeEvent<HTMLInputElement>) => {
        setSurname(event.target.value);
        if (!isChanged) setIsChanged(true)
    };
    const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
        const item = event.target.value.trim();
        if (item && !Number.isNaN(+item)) {
            if (!isChanged) setIsChanged(true);
            setPhone(item)
        } else setPhone("")

    };
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        if (!isChanged) setIsChanged(true)
    };

    const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        //onSubmit({ login, pass });
        setName("");
        setSurname("");
        setPhone("");
        setEmail("");
        setIsChanged(false);
    };

    return (
        <>
            <FormBody onSubmit={handleSubmit}>
                {isAddForm ? <h2 className='form__heading'>Please type info here and push submit button</h2> : null}
                <div className='form__inputs'>
                    <TextField
                        value={name}
                        onChange={handleChangeName}
                        label="Please type name here..."
                        variant="outlined"
                        required />
                    <TextField
                        value={surname}
                        onChange={handleChangeSurname}
                        label="Please type surname here..."
                        variant="outlined" />
                    <TextField
                        value={phone}
                        onChange={handleChangePhone}
                        label="Please type phone here..."
                        variant="outlined"
                        required />
                    <TextField
                        type="email"
                        value={email}
                        onChange={handleChangeEmail}
                        label="Please type email here..."
                        variant="outlined" />
                </div>
                <div className="form__buttons">
                    {isChanged
                        ? <Tooltip title="Please click here to add contact info">
                            <IconButton type='submit'>
                                <AddIcon />
                            </IconButton>
                        </Tooltip>
                        : null}
                    {isAddForm
                        ? null
                        :
                        <Tooltip title="Please click here to delete contact">
                            <IconButton >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>}
                </div>
            </FormBody>
        </>
    );
}
)

export default ContactForm;