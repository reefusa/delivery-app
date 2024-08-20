import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { Button } from '../../ui/Button';
import style from './Chat.module.scss';
import { useTranslation } from 'react-i18next';

function Chat(props) {
    const SOCKET_URL = 'http://localhost:3003';
    const token = localStorage.getItem('accessToken');
    const { t } = useTranslation();

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [room, setRoom] = useState(null);
    const [socket, setSocket] = useState();

    useEffect(() => {
        if (token) {
            const newSocket = io(SOCKET_URL, {
                query: {
                    token: token,
                    item_id: props.item_id
                }
            });
            setSocket(newSocket);

            newSocket.on('joinRoom', (room) => {
                setRoom(room);
            });

            newSocket.on('messageData', (data) => {
                if (data && data.message) {
                    console.log(data);
                    setMessages(data.message);
                }
            });

            newSocket.on('message', (message) => {
                console.log(message);
                setMessages((prevMessage) => [...prevMessage, message]);
            });
        }
    }, [token]);

    const sendMessage = () => {
        if (newMessage.trim() !== '') {
            socket.emit('message', ({ room, "message": newMessage.trim() }));
            setNewMessage('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            socket.emit('message', ({ room, "message": newMessage.trim() }));
            setNewMessage('');
        }
    }

    return (
        <div className={style.chat}>
            <div className={style.block_messages}>
                {messages.map((message) => (
                    <div key={message.id}
                        className={`${style.message} ${message.sender_id === props.user_id ? style.sent_message : style.recived_message}`}>
                        <p>{message.content}</p>
                    </div>
                ))}
            </div>
            <div className={style.block_input}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <Button styles={{
                display: 'block', margin: '15px auto 0'
            }} onClick={sendMessage} text={t('button.Chat.send_message')} />
        </div>
    );
}

export default Chat;
