import Tooltip from '@mui/material/Tooltip';
import { FC, memo, useState, ChangeEvent } from 'react';
import { TextField } from "@mui/material";
import { IContact, IContactItem } from '../../types/types';
import FormBody from '../../UI components/FormBody';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { filterContacts } from '../../../store/contacts/actions';
import { useDispatch } from 'react-redux';

const SearchForm: FC<IContactItem> = memo(({ isAddForm, item }) => {
    //парметры фильтрации
    const [param, setParam] = useState<keyof IContact>("name");
    const [data, setData] = useState<string>("");
    //состояние видимости кнопки добавления
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const dispatch = useDispatch();
    //обработчик устаноки параметра фильтрации
    const handleChange = (event: SelectChangeEvent): void => {
        setParam(event.target.value as keyof IContact);
        if (data) setIsChanged(true);
    };
    //обработчик установки строки запроса
    const handleChangeData = (event: ChangeEvent<HTMLInputElement>): void => {
        const item = event.target.value.trim()
        if (item) {
            setData(item);
            if (param) setIsChanged(true);
        }
    };
    //обработчик отправки формы
    const handleSubmit = (event: ChangeEvent<HTMLInputElement>): void => {
        event.preventDefault();
        dispatch(filterContacts(param, data));
        setIsChanged(false);
        setData("");
    };

    return (
        <>
            <FormBody onSubmit={handleSubmit}>
                <p className='form__heading'>Пожалуйста, выберите параметр и введите данные для поиска </p>
                <div className='form__inputs'>
                    <FormControl >
                        <InputLabel id="select-label">Параметр</InputLabel>
                        <Select
                            sx={{ width: "295px" }}
                            labelId="select-label"
                            id="select"
                            value={param}
                            label={"Please choose filter parametr"}
                            onChange={handleChange}
                        >
                            <MenuItem value={"name"}>Имя</MenuItem>
                            <MenuItem value={"surname"}>Фамилия</MenuItem>
                            <MenuItem value={"phone"}>Телефон</MenuItem>
                            <MenuItem value={"email"}>Почта</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        sx={{ width: "295px" }}
                        value={data}
                        onChange={handleChangeData}
                        label="Введите данные для поиска..."
                        variant="outlined" />
                </div>
                <div className="form__buttons">
                    {isChanged
                        ? <Tooltip title="Поиск!">
                            <IconButton type='submit'>
                                <SearchIcon />
                            </IconButton>
                        </Tooltip>
                        : null}
                </div>
            </FormBody>
        </>
    );
}
)

export default SearchForm;