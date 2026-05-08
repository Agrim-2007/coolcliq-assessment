import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ChatBubble from '../components/ChatBubble';
import Modal from '../components/Modal';
import Button from '../components/Button';
import mockData from '../data/mock.json';
import { Send, Shield, TriangleAlert, MapPin } from 'lucide-react';

export default function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [showRevealModal, setShowRevealModal] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessages(mockData.messages);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: input,
      sender: 'me',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInput('');
  };

  const handlePanic = () => {
    navigate('/home');
  };

  const handleAcceptReveal = () => {
    setShowRevealModal(false);
    setIsRevealed(true);
    
    // Add system message for reveal
    const systemMsg = {
      id: Date.now(),
      text: "Mutual reveal complete. They are at Table 12. You are at Table 7.",
      sender: 'system',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, systemMsg]);
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      <Navbar 
        title={
          <div className="flex flex-col items-center">
            <span className="text-white text-base">User{id || '123'}</span>
            <span className="text-[10px] text-gray-400 font-normal">
              {isRevealed ? <span className="text-primary font-medium">Table 12</span> : "You're anonymous 👀"}
            </span>
          </div>
        } 
        showBack 
        onBack={() => navigate(-1)}
        rightIcon={
          <div className="flex items-center gap-2">
            {!isRevealed && (
              <button 
                onClick={() => setShowRevealModal(true)}
                className="text-[10px] bg-card border border-gray-700 px-2 py-1 rounded-full text-white font-medium hover:bg-gray-800 transition-colors"
              >
                Reveal Table
              </button>
            )}
            <button onClick={() => setShowSafetyModal(true)} className="p-1">
              <Shield className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        }
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2 pb-24">
        <div className="text-center my-4">
          <span className="text-[10px] font-medium bg-card px-3 py-1 rounded-full text-gray-400">
            Today 10:24 AM
          </span>
        </div>
        
        {messages.map((msg) => {
          if (msg.sender === 'system') {
            return (
              <div key={msg.id} className="text-center my-4 flex justify-center">
                <span className="text-xs font-medium bg-primary/20 border border-primary/30 text-primary px-4 py-2 rounded-xl max-w-[85%] inline-block">
                  {msg.text}
                </span>
              </div>
            );
          }
          return (
            <ChatBubble key={msg.id} message={msg} isOwn={msg.sender === 'me'} />
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-background border-t border-card pb-safe z-30">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <button type="button" className="p-2 text-gray-400 hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message..."
            className="flex-1 bg-card border border-gray-800 rounded-full px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50"
          />
          <button 
            type="submit" 
            className="p-2.5 bg-primary text-white rounded-full disabled:opacity-50"
            disabled={!input.trim()}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      <Modal isOpen={showRevealModal} onClose={() => setShowRevealModal(false)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-card rounded-full mx-auto flex items-center justify-center mb-4 border border-gray-800">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Reveal your table number?</h2>
          <p className="text-sm text-gray-400 mb-8">
            This user is asking to see your physical location in the venue. You are at <strong>Table 7</strong>.
          </p>
          <div className="space-y-3">
            <Button fullWidth onClick={handleAcceptReveal}>Accept & Reveal</Button>
            <Button fullWidth variant="secondary" onClick={() => setShowRevealModal(false)}>Decline</Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={showSafetyModal} onClose={() => setShowSafetyModal(false)} title="Safety Settings">
        <div className="space-y-4">
          <button className="w-full flex items-center gap-3 p-4 bg-card rounded-xl text-white border border-gray-800">
            <Shield className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-medium">Report User</span>
          </button>
          <button className="w-full flex items-center gap-3 p-4 bg-card rounded-xl text-white border border-gray-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="12" cy="12" r="10"/><path d="m4.9 4.9 14.2 14.2"/></svg>
            <span className="text-sm font-medium">Block User</span>
          </button>
          <div className="pt-4 border-t border-gray-800">
            <Button fullWidth variant="danger" onClick={handlePanic} className="gap-2">
              <TriangleAlert className="w-5 h-5" />
              PANIC EXIT
            </Button>
            <p className="text-xs text-center text-gray-500 mt-3">Instantly leaves chat & returns to home</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
