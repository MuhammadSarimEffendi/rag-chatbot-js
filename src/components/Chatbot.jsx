import React, { useState } from 'react';
import './Chatbot.css';

const Chatbot = () => {
    const [input, setInput] = useState('');
    const [responses, setResponses] = useState([]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input) return;

        try {
            const response = await fetch('http://localhost:3000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query: input }),
            });

            const data = await response.text(); 

            // Assuming the response is plain text
            setResponses((prev) => [...prev, { user: input, bot: data }]);
            setInput('');
        } catch (error) {
            console.error('Error:', error);
        }
    };


    return (
        <div className="chatbot-container">
            <h1 className="chatbot-title">Chatbot</h1>
            <div className="chat-window">
                {responses.map((response, index) => (
                    <div key={index} className="chat-message">
                        <p className="user-message"><strong>You:</strong> {response.user}</p>
                        <p className="bot-message"><strong>Bot:</strong> {response.bot}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="chat-form">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    className="chat-input"
                    placeholder="Ask me anything..."
                />
                <button type="submit" className="chat-submit">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;
