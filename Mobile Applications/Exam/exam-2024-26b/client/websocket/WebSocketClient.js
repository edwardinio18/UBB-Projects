import {useState, useEffect} from 'react';

const WebSocketClient = (onMessageReceived) => {
    const [ws, setWs] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        const newWs = new WebSocket('ws://172.30.111.235:2426');

        newWs.onopen = () => {
            setIsConnected(true);
        };

        newWs.onmessage = (e) => {
            if (onMessageReceived) {
                onMessageReceived(e.data);
            }
        };

        newWs.onclose = () => {
            setIsConnected(false);
        };

        newWs.onerror = (error) => {
            console.error('WebSocket error:', error.message);
        };

        setWs(newWs);

        return () => {
            if (newWs) {
                newWs.close();
            }
        };
    }, []);

    return {isConnected};
};

export default WebSocketClient;