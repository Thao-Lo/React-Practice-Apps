import { Client } from "@stomp/stompjs";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import SockJS from "sockjs-client";

const SOCKET_URL = "http://localhost:8080/ws"; // WebSocket server URL

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const clientRef = useRef(null);
    console.log(messages);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS(SOCKET_URL), //use SockJS for WebSocket
            reconnectDelay: 5000, //reconnect delay 5s if disconnect
            onConnect: () => {
                console.log("Connected from WebSocket")
                //subscribe to notification topic - receive message from server
                client.subscribe(                   
                    '/topic/notifications',
                    (message) => {
                        // "body": "{\"content\":\"New notification received\"}"
                        setMessages((prev) => [...prev, JSON.parse(message.body)])
                    }
                )
            },
            onDisconnect: () => console.log("Disconnected from WebSocket"),
            onStompError: (frame) => console.error(`STOMP Error: ${frame} `)
        });

        client.activate(); // start WS connection
        clientRef.current = client; //store WS client to reference

        return () => {
            if (clientRef.current) {
                client.deactivate();
            }
        }
    }, [])

    const sendMessage = (message) => {
        if (clientRef.current && clientRef.current.connected) {
            clientRef.current.publish({
                destination: "/app/message", //server received message here 
                body: JSON.stringify(message),
            })
        } else {
            console.log("WebSocket is not connected");
        }
    }
    return (
        <WebSocketContext.Provider value={{ messages, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    )
}

export const useWebSocket = () => useContext(WebSocketContext);