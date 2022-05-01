import { Box, List } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import { FC, useState } from "react";
import { logOut } from "../services/firebase";
import ContactForm from "./contactForm/ContactForm";
import { IContact } from "../types/types";
import SearchForm from "./searchForm/SearchForm";

const contactsList: IContact[] = [{
    id: 1,
    name: "Dfcz",
    surname: "Gthz",
    email: "1@1.1",
    phone: "1234566789"
}, {
    id: 2,
    name: "Dfcz",
    surname: "Gthz",
    email: "1@1.1",
    phone: "1234566789"
}, {
    id: 3,
    name: "Dfcz",
    surname: "Gthz",
    email: "1@1.1",
    phone: "1234566789"
}, {
    id: 4,
    name: "Dfcz",
    surname: "Gthz",
    email: "1@1.1",
    phone: "1234566789"
}]

const Contacts: FC = () => {
    const [addFormVision, setAddFormVision] = useState<boolean>(false);
    const [searchFormVision, setSearchFormVision] = useState<boolean>(false);

    return (
        <section className="contacts wrapper" >
            <h1 className="contacts__heading">
                Welcome to your contacts list!
            </h1>
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
                    <IconButton onClick={() => setSearchFormVision(!searchFormVision)}>
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
                //padding: "10px",
                //margin: "20px 0",
                maxWidth: "1200px",
                borderRadius: "10px",
                // boxShadow: "0 0 10px #4dabf5,0 0 10px #4dabf5,0 0 10px #4dabf5",
                boxSizing: "border-box",
                bgcolor: '#e0f7fa',
            }}>
                <List>
                    {
                        contactsList.length
                            ? contactsList.map(item =>
                                <ContactForm
                                    key={item.id}
                                    item={item}
                                />)
                            :
                            <p className="wrapper">
                                You don't have availiable contacts.
                            </p>
                    }
                </List>
            </Box >
        </section >
    )
}

export default Contacts;