import React, { useEffect, useState } from 'react'
import { user } from '../Login/Login';
import './Chat.css';
import Logo from '../../img/logo3.png';
import socketIO from 'socket.io-client';
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom';
const ENDPOINT = 'https://chat-server-167e.onrender.com/';
let socket;

const Chat = () => {
    const [id, setId] = useState("");
    const [message, setMessage] = useState([]);
    const sendMessage = () => {
        const message = document.getElementById('chatInput').value; 
        socket.emit('message', { message, id });
        document.getElementById('chatInput').value = '';
    }

    useEffect(() => {
        socket = socketIO(ENDPOINT, { transports: ['websocket'] });
        socket.on('connect', () => {
            setId(socket.id);
            alert('connect');
        })
        socket.emit('join', { user });

        socket.on('welcome', (data) => {
            setMessage([...message, data]);
        });
        socket.on('newuser', (data) => {
            setMessage([...message, data]);         
        });
        socket.on('leave', (data) => {
            setMessage([...message, data]);
        });

        return () => {
            socket.emit('disconnected');
            socket.off();
        }
    }, [])

    useEffect(() => {
        socket.on('sendMsg', (data) => {
            setMessage([...message, data]);
        });

        return () => {
            socket.off();
        }
    }, [message])
    console.log(message);
    return (
        <div className='chat'>
            <div className='chatContainer'>
                <div className='chatHeader'>
                    <div id='chatTitle'>
                        <img id='chatLogo' src={Logo} alt='Log' />
                        <p>CHAT</p>
                    </div>
                    <div>
                        <a className='closeBtn' href='/'>X</a>
                    </div>
                </div>

                <ReactScrollToBottom className='chatBody'>
                    {message.map((item, i) => <Message key={i}  user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}

                </ReactScrollToBottom>
                <div className='chatFooter'>
                    <input  onKeyUp={(e) => e.key === 'Enter' ? sendMessage() : null} id="chatInput" placeholder='ENTER YOUR MESSAGE' />
                    <button className='chatBtn' onClick={sendMessage}> Send</button>

                </div>
            </div>

        </div>
    )
}

export default Chat
