import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { useNavigate } from 'react-router-dom';
import { FC, MouseEvent } from 'react';

const NavBar: FC = () => {
    const navigate = useNavigate();
    //обработчики кликов на кнопки навигации
    const handleChange = (event: MouseEvent): void => {
        const element = event.target as HTMLElement;
        if (element.tagName === "BUTTON") {
            element.dataset.name === "Main Page"
                ? navigate(`/`)
                : navigate(`/${element.dataset.name?.toLowerCase()}`)
        }
    };

    return (

        <Box sx={{
            position: "fixed",
            top: 0,
            left: 0,
            padding: "10px 0",
            height: "60px",
            backgroundColor: "#4dabf5",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            width: "100%",
            zIndex: 4
        }} onClick={handleChange} >
            <Tab label="Главная" data-name={"Main Page"} />
            <Tab label="Контакты" data-name={"Contacts"} />
        </Box>
    );
}

export default NavBar;