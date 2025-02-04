import { Box, Button, TextField } from "@mui/material";
import { useWebSocket } from "../../hooks/WebSocketContext";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";

function SendMessageComponent() {
    const {messages, sendMessage} = useWebSocket();
    const [inputMessage, setInputMessage] = useState('');
    const inputElement = useRef(null);

    const focusInput = (e) => {
        if(inputElement.current){
            inputElement.current.focus();
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputMessage.trim() !== ""){
            sendMessage(inputMessage);  
            setInputMessage('');
            focusInput();
        }
           

    }

    return (
        <>
            <Box
                component="form"                
                sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <TextField
                    id="outlined-multiline-static"
                    label="Multiline"
                    multiline
                    rows={4}      
                    value={inputMessage}   
                    onChange={(e) => setInputMessage(e.target.value)}       
                    inputRef={inputElement}   
                />
                 <Button variant="outlined" type="submit">Send</Button>
            </Box>
            <Link to="/">View Notification</Link>
        </>
    )
}

export default SendMessageComponent;