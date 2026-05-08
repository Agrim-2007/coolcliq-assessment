import clsx from 'clsx';
import { motion } from 'framer-motion';

export default function ChatBubble({ message, isOwn }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        "flex w-full mb-4",
        isOwn ? "justify-end" : "justify-start"
      )}
    >
      <div className={clsx(
        "max-w-[75%] rounded-2xl px-4 py-3 text-sm",
        isOwn 
          ? "bg-gradient-accent text-white rounded-tr-none" 
          : "bg-card text-gray-200 rounded-tl-none border border-gray-800"
      )}>
        <p>{message.text}</p>
        <span className="text-[10px] text-gray-400 mt-1 block opacity-70">
          {message.timestamp}
        </span>
      </div>
    </motion.div>
  );
}
