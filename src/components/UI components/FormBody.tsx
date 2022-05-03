import Box from '@mui/material/Box';
import { IForm } from '../types/types';
import { FC } from 'react';


const FormBody: FC<IForm> = ({ children, onSubmit }) => {
    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "colomn",
                alignItems: "center",
                gap: "10px",
                padding: "20px",
                margin: "20px 0",
                flexWrap: "wrap",
                borderRadius: "10px",
                boxShadow: "0 0 10px #4dabf5,0 0 10px #4dabf5,0 0 10px #4dabf5",
                boxSizing: "border-box",
                minHeight: "120px",
                bgcolor: '#e0f7fa',
                position: "sticky",
                top: "100px",
                zIndex: "2"
            }}
            onSubmit={onSubmit}
            autoComplete="off"
        >
            {children}
        </Box >
    )
}

export default FormBody;