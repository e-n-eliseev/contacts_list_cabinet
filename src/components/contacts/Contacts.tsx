import { Box, List } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import { FC, useEffect, useState } from "react";
import { logOut } from "../../services/firebase";
import ContactForm from "./contactForm/ContactForm";
import SearchForm from "./searchForm/SearchForm";
import { shallowEqual } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import {
    initContactsListTrack,
    resetFilterContacts,
    stopContactsListTrack
} from "../../store/contacts/actions";
import { getContacts, getError, getLoading } from "../../store/contacts/contactsSelectors";
import { useTypedDispatch } from "../hooks/useTypedDispatch";

const Contacts: FC = () => {
    const dispatch = useTypedDispatch();
    //получение данных из стора
    const contactsList = useTypedSelector(getContacts, shallowEqual);
    const loading = useTypedSelector(getLoading);
    const error = useTypedSelector(getError);
    //подписка/отписка на состояние данных в базе при монтировании/размонтировании компонета 
    useEffect(() => {
        dispatch(initContactsListTrack());
        return () => {
            dispatch(stopContactsListTrack());
        };
    }, []);
    //состояние видимости форм поиска и добавления контакта
    const [addFormVision, setAddFormVision] = useState<boolean>(false);
    const [searchFormVision, setSearchFormVision] = useState<boolean>(false);

    const openAddForm = () => {
        setAddFormVision(!addFormVision);
        if (searchFormVision) setSearchFormVision(false);
    }
    const openSearchForm = () => {
        dispatch(resetFilterContacts());
        setSearchFormVision(!searchFormVision);
        if (addFormVision) setAddFormVision(false);
    }

    return (
        <section className="contacts wrapper" >
            <h1 className="contacts__heading">
                Добро пожаловать в кабинет вашего списка контактов!
            </h1>
            {error ? <h2 className="error">Ошибка при подключении к базе данных, пожалуйста, перезагрузите страницу</h2> : null}
            {loading
                ? <CircularProgress />
                : <>
                    <p>Нажав на книпки ниже вы откроете форму добавления или поиска контакта или выйдите из системы.</p>
                    <div className="contacts__actions">
                        <Tooltip title={addFormVision
                            ? "Закрыть форму добавления контакта"
                            : "Открыть форму добавления контакта"} >
                            <IconButton onClick={openAddForm}>
                                <PersonAddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={searchFormVision
                            ? "Нажмите для сброса параметров поиска и закрытия формы"
                            : "Открыть форму поиска"}>
                            <IconButton onClick={openSearchForm}>
                                <PersonSearchIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Выйти из системы">
                            <IconButton onClick={logOut}>
                                <LogoutIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                    {
                        addFormVision
                            ? <ContactForm isAddForm />
                            : null
                    }
                    {searchFormVision
                        ? <SearchForm />
                        : null}
                    <Box sx={{
                        maxWidth: "1200px",
                        borderRadius: "10px",
                        boxSizing: "border-box",
                        bgcolor: '#e0f7fa',
                    }}>
                        <List>
                            {
                                contactsList.length
                                    ? contactsList.map(item =>
                                        <ContactForm
                                            key={Date.now() * Math.random()}
                                            item={item}
                                        />)
                                    :
                                    <p className="wrapper">
                                        Ваш список контактов пуст.
                                    </p>
                            }
                        </List>
                    </Box >
                </>
            }

        </section >
    )
}

export default Contacts;