import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, MapPin, QrCode, AlertTriangle, 
  BarChart3, Settings, LogOut, CheckCircle, Ban, Download
} from 'lucide-react';

function AdminSidebar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
    { id: 'venues', icon: MapPin, label: 'Venues' },
    { id: 'qr', icon: QrCode, label: 'QR Generator' },
    { id: 'moderation', icon: AlertTriangle, label: 'Moderation' },
    { id: 'users', icon: Users, label: 'Users' },
    { id: 'analytics', icon: Settings, label: 'Analytics' },
  ];

  return (
    <div className="w-64 bg-card border-r border-gray-800 flex flex-col h-screen shrink-0 hidden md:flex">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
          Aura Admin
        </h1>
        <p className="text-xs text-gray-500 mt-1">System Management</p>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive 
                  ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={() => window.location.href = '/login'}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtext }) {
  return (
    <div className="bg-card p-6 rounded-2xl border border-gray-800 shadow-lg">
      <h3 className="text-gray-400 text-sm font-medium mb-2">{title}</h3>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      {subtext && <p className="text-xs text-gray-500">{subtext}</p>}
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('auto') === 'true') {
      setUsername('admin');
      setPassword('admin');
      setIsAuthenticated(true);
      // clean up URL
      navigate('/admin', { replace: true });
    }
  }, [location, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-card p-8 rounded-3xl border border-gray-800 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Aura Admin Panel</h1>
            <p className="text-gray-400 text-sm mt-2">Sign in to continue</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full mt-1 bg-background border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-400 uppercase">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-1 bg-background border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50"
              />
            </div>
            <button type="submit" className="w-full mt-6 bg-primary hover:bg-primary/90 text-white rounded-xl py-3 font-medium transition-colors">
              Login
            </button>
            <button 
              type="button" 
              onClick={() => {
                setUsername('admin');
                setPassword('admin');
                setIsAuthenticated(true);
              }}
              className="w-full mt-3 bg-card border border-gray-700 hover:bg-gray-800 text-gray-300 rounded-xl py-3 font-medium transition-colors"
            >
              Demo Auto-Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-y-auto p-8">
        {/* Mobile Header (fallback) */}
        <div className="md:hidden flex items-center justify-between mb-8">
          <h1 className="text-xl font-bold text-white">Aura Admin</h1>
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value)}
            className="bg-card text-white border border-gray-800 rounded-lg px-3 py-1 text-sm"
          >
            <option value="dashboard">Dashboard</option>
            <option value="venues">Venues</option>
            <option value="qr">QR Generator</option>
            <option value="moderation">Moderation</option>
            <option value="users">Users</option>
            <option value="analytics">Analytics</option>
          </select>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white mb-6">Platform Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard title="Daily Active Users" value="1,248" subtext="+12% from yesterday" />
                  <StatCard title="Active Venues" value="34" subtext="4 added this week" />
                  <StatCard title="Chat Initiation Rate" value="68%" subtext="Average per user session" />
                  <StatCard title="Reveal Rate" value="42%" subtext="Users who reveal table info" />
                </div>
                
                <div className="mt-8 bg-card border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Active Users per Venue</h3>
                  <div className="space-y-4">
                    {[
                      { name: 'The Obsidian Room', count: 120, max: 200 },
                      { name: 'Velvet Underground', count: 45, max: 100 },
                      { name: 'Blue Lounge', count: 86, max: 150 },
                    ].map(v => (
                      <div key={v.name}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-300">{v.name}</span>
                          <span className="text-white font-medium">{v.count} / {v.max}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary" 
                            style={{ width: `${(v.count / v.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'venues' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-white">Venue Management</h2>
                  <button className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90">
                    + Add Venue
                  </button>
                </div>
                <div className="bg-card border border-gray-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-[#1a1a24] text-xs uppercase text-gray-400">
                      <tr>
                        <th className="px-6 py-4 font-medium">Venue Name</th>
                        <th className="px-6 py-4 font-medium">Type</th>
                        <th className="px-6 py-4 font-medium">Geo-Radius</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
                      {[
                        { name: 'Blue Lounge', type: 'Lounge', radius: '100m', status: 'Active' },
                        { name: 'Syntax Error', type: 'Barcade', radius: '150m', status: 'Active' },
                        { name: 'The Void', type: 'Club', radius: '200m', status: 'Inactive' },
                      ].map(v => (
                        <tr key={v.name} className="hover:bg-gray-800/30">
                          <td className="px-6 py-4 text-white font-medium">{v.name}</td>
                          <td className="px-6 py-4">{v.type}</td>
                          <td className="px-6 py-4">{v.radius}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${v.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                              {v.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-3">
                            <button className="text-blue-400 hover:text-blue-300">Edit</button>
                            <button className="text-red-400 hover:text-red-300">Deactivate</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'qr' && (
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold text-white mb-6">QR Code Generator</h2>
                <div className="bg-card border border-gray-800 rounded-2xl p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">Select Venue</label>
                      <select className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none">
                        <option>Blue Lounge</option>
                        <option>Velvet Underground</option>
                        <option>The Obsidian Room</option>
                      </select>
                    </div>
                    
                    <div className="flex justify-center py-8">
                      <div className="w-48 h-48 bg-white rounded-xl p-2 flex items-center justify-center border-4 border-primary">
                        <QrCode className="w-32 h-32 text-black" />
                      </div>
                    </div>

                    <button className="w-full flex items-center justify-center gap-2 bg-secondary text-white py-3 rounded-xl font-medium hover:bg-secondary/90 transition-colors">
                      <Download className="w-5 h-5" />
                      Download PDF for Printing
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'moderation' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">Moderation Queue</h2>
                <div className="space-y-4">
                  {[
                    { target: 'User456', reporter: 'Ghostly', reason: 'Inappropriate language', time: '10 mins ago' },
                    { target: 'Anon_X', reporter: 'Shadow99', reason: 'Harassment', time: '1 hour ago' }
                  ].map((report, i) => (
                    <div key={i} className="bg-card border border-gray-800 p-5 rounded-2xl flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="bg-red-500/20 text-red-500 text-xs px-2 py-0.5 rounded font-bold uppercase">Report</span>
                          <span className="text-gray-400 text-xs">{report.time}</span>
                        </div>
                        <p className="text-white text-sm">
                          <span className="font-bold text-primary">{report.reporter}</span> reported <span className="font-bold text-white">{report.target}</span>
                        </p>
                        <p className="text-gray-400 text-sm mt-1">Reason: {report.reason}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm transition-colors">
                          <CheckCircle className="w-4 h-4 text-green-400" /> Ignore
                        </button>
                        <button className="flex items-center gap-1 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 px-3 py-1.5 rounded-lg text-sm transition-colors">
                          <Ban className="w-4 h-4" /> Ban User
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
                <div className="bg-card border border-gray-800 rounded-2xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-[#1a1a24] text-xs uppercase text-gray-400">
                      <tr>
                        <th className="px-6 py-4 font-medium">Handle</th>
                        <th className="px-6 py-4 font-medium">Joined</th>
                        <th className="px-6 py-4 font-medium">Status</th>
                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
                      {[
                        { handle: '@shadow_walker', joined: 'Oct 12, 2023', status: 'Active' },
                        { handle: '@neon_rider', joined: 'Nov 04, 2023', status: 'Active' },
                        { handle: '@bad_actor', joined: 'Jan 15, 2024', status: 'Banned' },
                      ].map(u => (
                        <tr key={u.handle} className="hover:bg-gray-800/30">
                          <td className="px-6 py-4 text-white font-medium">{u.handle}</td>
                          <td className="px-6 py-4">{u.joined}</td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${u.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right space-x-3">
                            {u.status === 'Active' ? (
                              <>
                                <button className="text-yellow-400 hover:text-yellow-300">Suspend</button>
                                <button className="text-red-400 hover:text-red-300">Ban</button>
                              </>
                            ) : (
                              <button className="text-green-400 hover:text-green-300">Restore</button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="max-w-xl">
                <h2 className="text-2xl font-bold text-white mb-6">Data & Analytics</h2>
                <div className="bg-card border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Export Platform Data</h3>
                  <p className="text-sm text-gray-400 mb-6">
                    Download a comprehensive CSV report of platform metrics, user engagement, and venue statistics.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400 block mb-2">Date Range</label>
                      <select className="w-full bg-background border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none mb-4">
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>All Time</option>
                      </select>
                    </div>
                    
                    <button className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors">
                      <Download className="w-5 h-5" />
                      Export CSV
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
