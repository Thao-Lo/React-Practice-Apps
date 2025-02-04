import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useWebSocket } from "../../hooks/WebSocketContext";
import { Link } from "react-router-dom";

function NotificationComponent() {
    const { messages, sendMessage } = useWebSocket();

    console.log(messages);

    return (
        <>
            {messages.length > 0 ? (
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

                    {
                        messages.map((item, index) => {
                            return (
                                <ListItem alignItems="flex-start" key={index}>
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src="" />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary="Notification"
                                        secondary={
                                            <>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    sx={{ color: 'text.primary', display: 'inline' }}
                                                >
                                                    {"ADMIN: "}
                                                </Typography>
                                                {item}
                                            </>
                                        }
                                    />
                                </ListItem>
                            )
                        })
                    }
                    <Divider variant="inset" component="li" />
                </List>
            )
                :
                (<div>No Notification</div>)
            }
            <Link to="/send-notification">Send Notification</Link>
        </>
    )
}

export default NotificationComponent;