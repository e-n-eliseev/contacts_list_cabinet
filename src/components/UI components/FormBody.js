import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

const FormBody = ({ children, onSubmit }) => {
    const theme = useTheme();

    return (
        <Box
            component="form"
            sx={{
                ...theme.baseObj,
                ...theme.formObj,
                bgcolor: theme.palette.secondary.main,
                position: "sticky",
                top: "100px",
                zIndex: 3
            }}
            noValidate
            onSubmit={onSubmit}
            autoComplete="off"
        >
            {children}
        </Box >
    )
}

export default FormBody;