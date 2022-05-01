import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { memo } from 'react';

const Message = memo(({ info }) => {
    const { message, author } = info;
    return (
        <>
            <List>
                <ListItem>
                    <ListItemText
                        primary={`${author} : "${message}"`}
                    />
                </ListItem>
            </List>
            <Divider />
        </>
    );
})

export default Message;