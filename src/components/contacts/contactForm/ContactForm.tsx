import Tooltip from '@mui/material/Tooltip';
import { FC, memo, useState, ChangeEvent, useEffect } from 'react';
import { TextField } from "@mui/material";
import { IContactItem } from '../../types/types';
import FormBody from '../../UI components/FormBody';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { addContactFB, changeContactFB, deleteContactFB } from '../../../store/contacts/actions';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';


const ContactForm: FC<IContactItem> = memo(({ isAddForm, item }) => {

    //устанавливаем данные полей 
    const [name, setName] = useState<string>(item?.name || "");
    const [surname, setSurname] = useState<string>(item?.surname || "");
    const [phone, setPhone] = useState<string>(item?.phone || "");
    const [email, setEmail] = useState<string>(item?.email || "");
    //установки состояния видимости кнопки сохраниения данных
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const dispatch = useTypedDispatch();
    //обработчик полей ввода
    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
        const item = event.target.value;
        if (item.trim()) {
            setName(item);
            if (!isChanged) setIsChanged(true)
        }
    };
    const onHandleDelete = () => {
        dispatch(deleteContactFB(item?.idFb!))
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
    //обработчик отправки формы
    const handleSubmit = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        isAddForm
            ? dispatch(addContactFB({
                id: Date.now().toString(),
                name,
                surname,
                phone,
                email
            }))
            : dispatch(changeContactFB({
                id: item?.id,
                idFb: item?.idFb,
                name,
                surname,
                phone,
                email
            }))
        setName("");
        setSurname("");
        setPhone("");
        setEmail("");
        setIsChanged(false);
    };

    return (

        <FormBody onSubmit={handleSubmit} >
            {isAddForm ? <p className='form__heading'>Пожалуйста, введите данные контакта и нажмите  кнопку "+"</p> : null}
            <div className='form__inputs'>
                <TextField
                    value={name}
                    onChange={handleChangeName}
                    label="Имя"
                    variant="outlined"
                    required />
                <TextField
                    value={surname}
                    onChange={handleChangeSurname}
                    label="Фамилия"
                    variant="outlined" />
                <TextField
                    value={phone}
                    onChange={handleChangePhone}
                    label="Телефон"
                    variant="outlined"
                    required />
                <TextField
                    type="email"
                    value={email}
                    onChange={handleChangeEmail}
                    label="Электронная почта"
                    variant="outlined" />
            </div>
            <div className="form__buttons">
                {isChanged
                    ? <Tooltip title="Добавить контакт">
                        <IconButton type='submit'>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    : null}
                {isAddForm
                    ? null
                    : <Tooltip title="Удалить контакт">
                        <IconButton onClick={onHandleDelete}>
                            <DeleteIcon />
                        </IconButton >
                    </Tooltip>}
            </div>
        </FormBody>

    );
}
)

export default ContactForm;