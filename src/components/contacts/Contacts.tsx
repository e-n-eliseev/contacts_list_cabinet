import { Box, List } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import { FC, useEffect, useState } from "react";
import { logOut } from "../services/firebase";
import ContactForm from "./contactForm/ContactForm";
import SearchForm from "./searchForm/SearchForm";
import { shallowEqual, useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { initContactsListTrack, resetFilterContacts, stopContactsListTrack } from "../store/contacts/actions";
import { getContacts, getLoading } from "../store/contacts/contactsSelectors";

const Contacts: FC = () => {
    const dispatch = useDispatch();
    const contactsList = useTypedSelector(getContacts, shallowEqual);
    const loading = useTypedSelector(getLoading);

    useEffect(() => {
        dispatch<any>(initContactsListTrack());
        return () => {
            dispatch<any>(stopContactsListTrack());
        };
    }, []);

    const [addFormVision, setAddFormVision] = useState<boolean>(false);
    const [searchFormVision, setSearchFormVision] = useState<boolean>(false);

    return (
        <section className="contacts wrapper" >
            <h1 className="contacts__heading">
                Welcome to your contacts list!
            </h1>
            {loading
                ? <CircularProgress />
                : <>
                    <p>If you click on the buttons below you can add/search contact or logout.</p>
                    <div className="contacts__actions">
                        <Tooltip title={addFormVision
                            ? "Please click here to close add contact form"
                            : "Please click here to open add contact form"} >
                            <IconButton onClick={() => setAddFormVision(!addFormVision)}>
                                <PersonAddIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={searchFormVision
                            ? "Please click here to reset search and close search form"
                            : "Please click here to open search form"}>
                            <IconButton onClick={() => {
                                dispatch(resetFilterContacts())
                                setSearchFormVision(!searchFormVision)
                            }}>
                                <PersonSearchIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Please click here to logOut">
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
                                        You don't have availiable contacts.
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