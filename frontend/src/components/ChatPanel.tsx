import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/ChatPanel.css';

interface ChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ isOpen, onClose }) => {
  const { translations } = useLanguage();
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="chat-overlay" onClick={onClose} />}
      
      {/* Chat Panel */}
      <div className={`chat-panel ${isOpen ? 'chat-panel-open' : ''}`}>
        <div className="chat-header">
          <h3>{translations.chat.title}</h3>
          <button className="chat-close-btn" onClick={onClose} aria-label={translations.common.close}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="chat-content">
          <div className="chat-messages">
            <div className="welcome-message">
              <div className="message bot-message">
                <div className="message-avatar">
                  <i className="fas fa-robot"></i>
                </div>
                <div className="message-content">
                  <p>{translations.chat.welcomeMessage}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="chat-input-container">
            <div className="chat-input-wrapper">
              <input 
                type="text" 
                placeholder={translations.chat.inputPlaceholder}
                className="chat-input"
                disabled
              />
              <button className="chat-send-btn" disabled aria-label={translations.common.send}>
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <p className="chat-status">{translations.chat.comingSoon}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPanel;
