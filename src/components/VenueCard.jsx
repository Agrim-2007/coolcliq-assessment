import { motion } from 'framer-motion';
import { MapPin, Users } from 'lucide-react';

export default function VenueCard({ venue, onClick }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="bg-card rounded-2xl p-4 flex items-center justify-between cursor-pointer border border-gray-800/50 shadow-lg"
      onClick={() => onClick(venue)}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-white font-medium">{venue.name}</h3>
          <p className="text-sm text-gray-400">{venue.type} • {venue.distance}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
        <Users className="w-3 h-3" />
        <span>{venue.activeUsers}</span>
      </div>
    </motion.div>
  );
}
