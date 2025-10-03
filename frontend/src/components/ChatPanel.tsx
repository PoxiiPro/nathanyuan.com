import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/ChatPanel.css';
import axios from 'axios';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const { translations } = useLanguage();
  const [messages, setMessages] = useState([
    { sender: 'bot', text: translations.chat.welcomeMessage }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Append user message to the chat history
    setMessages([...messages, { sender: 'user', text: input }]);
    setIsTyping(true); // Set typing state to true

    try {
      // Make a POST request to the serverless function
      const response = await axios.post('/api/sendMessage', {
        message: input,
      });

      // Append bot response to the chat if it responds
      if (response?.status === 200) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: response?.data?.response },
        ]);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'bot', text: `${translations.common.errorMessage} ${translations.bugReport.bugReportPrompt}` },
        ]);
      }
    } catch (error) {
      console.error('Error communicating with serverless function:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: `${translations.common.errorMessage} ${translations.bugReport.bugReportPrompt}` },
      ]);
    } finally {
      setInput('');
      setIsTyping(false); // Set typing state to false
    }
  };

  return (
    <>
      {/* Overlay - allows background scroll but clickable for closing */}
      {isOpen && (
        <div 
          className="chat-overlay pointer-events-auto"
          onClick={onClose}
        />
      )}
      
      {/* Chat Panel */}
      <div className={`chat-panel ${isOpen ? 'chat-panel-open' : ''}`}>
        <div className="chat-header">
          <div className="chat-header-title-group">
            <h3 className="chat-header-title">{translations.chat.title}</h3>
            <span className="chat-header-subtitle">
              {translations.chat.poweredBy}
            </span>
          </div>
          <button className="chat-close-btn" onClick={onClose} aria-label={translations.common.close}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="chat-content">
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.sender}-message`}>
                <div className="message-avatar">
                  <i className={msg.sender === 'bot' ? 'fas fa-robot' : 'fas fa-user'}></i>
                </div>
                <div className="message-content">
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message bot-message">
                <div className="message-avatar">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="message-content">
                  <p>...</p>
                </div>
              </div>
            )}
          </div>
          
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input 
                type="text" 
                placeholder={translations.chat.inputPlaceholder}
                className="chat-input"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                disabled={!isOpen}
              />
              <button className="chat-send-btn" onClick={handleSend} aria-label={translations.common.send} disabled={!input.trim()}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            {/* Status or info can go here if needed */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPanel;
