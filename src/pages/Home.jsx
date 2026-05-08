import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { renderToString } from 'react-dom/server';
import { MapPin, ScanLine, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import VenueCard from '../components/VenueCard';
import BottomNav from '../components/BottomNav';
import mockData from '../data/mock.json';
import Button from '../components/Button';

// Custom Map Marker using Lucide Icon
const customMarkerIcon = L.divIcon({
  html: renderToString(<div className="text-primary drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]"><MapPin size={32} fill="#12121A" /></div>),
  className: 'custom-leaflet-icon',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

export default function Home() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);

  useEffect(() => {
    setVenues(mockData.venues);
  }, []);

  const handleVenueClick = (venue) => {
    setSelectedVenue(venue);
  };

  const handleClosePreview = () => {
    setSelectedVenue(null);
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      <Navbar title="Aura Discovery" />
      
      <div className="relative h-[40%] bg-[#12121A] overflow-hidden shrink-0">
        <MapContainer 
          center={[40.7128, -74.0060]} // New York mock center
          zoom={13} 
          scrollWheelZoom={true} 
          className="w-full h-full z-0"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">Carto</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          {venues.map((venue, index) => {
            // Give them some fake coordinates around center
            const lat = 40.7128 + (index * 0.01 - 0.005);
            const lng = -74.0060 + (index * 0.01 - 0.005);
            return (
              <Marker 
                key={venue.id} 
                position={[lat, lng]} 
                icon={customMarkerIcon}
                eventHandlers={{
                  click: () => handleVenueClick(venue)
                }}
              />
            );
          })}
        </MapContainer>

        {/* Floating Scan Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/scan')}
          className="absolute bottom-4 right-4 z-10 bg-primary text-white p-4 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] flex items-center justify-center"
        >
          <ScanLine className="w-6 h-6" />
        </motion.button>
      </div>

      <div className="flex-1 p-4 bg-background z-10 relative shadow-[0_-10px_20px_rgba(11,11,15,0.8)] overflow-y-auto pb-24">
        <div className="w-12 h-1.5 bg-gray-800 rounded-full mx-auto mb-6 shrink-0"></div>
        <h2 className="text-lg font-semibold text-white mb-4">Nearby Venues</h2>
        
        <div className="space-y-3">
          {venues.map((venue, i) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <VenueCard venue={venue} onClick={() => handleVenueClick(venue)} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Venue Preview Bottom Sheet */}
      <AnimatePresence>
        {selectedVenue && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute bottom-16 left-0 right-0 bg-card border-t border-gray-800 p-6 z-40 rounded-t-3xl shadow-[0_-20px_40px_rgba(0,0,0,0.8)]"
          >
            <button 
              onClick={handleClosePreview}
              className="absolute top-4 right-4 text-gray-400 p-1 bg-gray-800/50 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-white mb-1">{selectedVenue.name}</h3>
            <p className="text-sm text-gray-400 mb-4">{selectedVenue.distance} • {selectedVenue.activeUsers} Active Users</p>
            
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
              <p className="text-primary text-sm text-center font-medium">Scan QR at venue to join the conversation</p>
            </div>
            
            <Button fullWidth onClick={() => navigate('/scan')} className="gap-2">
              <ScanLine className="w-5 h-5" />
              Scan QR to Join
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <BottomNav />
    </div>
  );
}
