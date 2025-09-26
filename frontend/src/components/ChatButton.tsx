import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import '../assets/styles/ChatButton.css';

interface ChatButtonProps {
  onClick: () => void;
}

const ChatButton: React.FC<ChatButtonProps> = ({ onClick }) => {
  const { translations } = useLanguage();
  
  return (
    <button 
      className="chat-button" 
      onClick={onClick} 
      aria-label={`Open ${translations.chat.title}`}
    >
      <i className="fas fa-comment-dots"></i>
    </button>
  );
};

export default ChatButton;
