import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Database, 
  History, 
  Map as MapIcon, 
  Hammer, 
  BellRing, 
  Heart, 
  Activity, 
  Clock, 
  Navigation, 
  MapPin, 
  User, 
  PawPrint, 
  Mail, 
  Phone, 
  Calendar, 
  Hash,
  TrendingUp,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAnimated, setIsAnimated] = useState(false);
  const prevIsDanger = useRef(false);
  
  // Health Metrics State
  const [metrics, setMetrics] = useState({
    heartbeat: '',
    soundFreq: '',
    lastFeed: ''
  });

  // Profile Information State
  const [profileData, setProfileData] = useState({
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    catName: '',
    catBreed: '',
    catAge: '',
    catChipId: ''
  });

  // Sync animation for logo and text
  useEffect(() => {
    const syncInterval = setInterval(() => {
      setIsAnimated((prev) => !prev);
    }, 800);
    return () => clearInterval(syncInterval);
  }, []);

  // Mood Logic Engine
  const moodState = useMemo(() => {
        const { heartbeat, soundFreq, lastFeed } = metrics;

        // No data entered yet
        if (!heartbeat && !soundFreq && !lastFeed) {
            return { color: 'bg-gray-200', label: 'Waiting for Data', isDanger: false };
        }

        // Normalize raw input strings
        const hbRaw = (heartbeat || '').toString().trim();
        const sfRaw = (soundFreq || '').toString().trim();
        const ltRaw = (lastFeed || '').toString().trim();

        const hb = hbRaw === '' ? null : Number(hbRaw);
        const sf = sfRaw === '' ? null : Number(sfRaw);
        const lt = ltRaw === '' ? null : Number(ltRaw);

        // Validate numeric ranges and types. If any provided value is invalid, show explicit message.
        const hbInvalid = hbRaw !== '' && (isNaN(hb) || hb < 0 || hb > 300);
        const sfInvalid = sfRaw !== '' && (isNaN(sf) || sf < 0 || sf > 20000);
        const ltInvalid = ltRaw !== '' && (isNaN(lt) || lt < 0 || lt > 168);

        if (hbInvalid || sfInvalid || ltInvalid) {
            return { color: 'bg-gray-300', label: '⚠️ Invalid Input', isDanger: false };
        }

        // Fallback numeric values (treat null as 0 for evaluation where appropriate)
        const hbVal = hb === null ? 0 : hb;
        const sfVal = sf === null ? 0 : sf;
        const ltVal = lt === null ? 0 : lt;

        if (hbVal > 160 || sfVal > 1500) {
            return { color: 'bg-red-600 animate-pulse', label: '🚨 Alert Danger', isDanger: true };
        } else if (hbVal > 140 || sfVal > 1200) {
            return { color: 'bg-red-500', label: '🔴 Stressed / Danger', isDanger: true };
        } else if (hbVal < 60 && sfVal < 300 && hbVal > 0) {
            return { color: 'bg-blue-500', label: '🔵 Sick / Low Energy', isDanger: false };
        } else if (ltVal >= 6) {
            return { color: 'bg-yellow-400', label: '🟡 Hungry', isDanger: false };
        } else {
            return { color: 'bg-green-500', label: '🟢 Happy / Calm', isDanger: false };
        }
  }, [metrics]);

  // Automatic redirect to map when in danger
  useEffect(() => {
    if (moodState.isDanger && !prevIsDanger.current) {
      setCurrentPage('map');
    }
    prevIsDanger.current = moodState.isDanger;
  }, [moodState.isDanger]);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Data', id: 'data' },
    { label: 'History', id: 'history' },
    { label: 'Map', id: 'map' },
    { label: 'Profile', id: 'profile' },
  ];

  const CatLogo = ({ className }) => (
    <svg viewBox="0 0 100 100" className={className} fill="currentColor">
      <path d="M20 40 L10 10 L40 25 Q50 20 60 25 L90 10 L80 40 Q90 60 80 80 Q50 95 20 80 Q10 60 20 40 Z" />
      <circle cx="35" cy="50" r="5" fill="white" />
      <circle cx="65" cy="50" r="5" fill="white" />
      <path d="M45 65 Q50 70 55 65" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  );

  return (
    <div className="min-h-screen w-full bg-white font-mono text-black overflow-x-hidden selection:bg-red-100">
      
      {/* --- Top Navbar --- */}
      <nav className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-[60] bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setCurrentPage('home')}
        >
            <div className={`w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center transition-all duration-[800ms] ease-in-out ${isAnimated ? 'rotate-[15deg] text-red-600' : 'rotate-[-5deg] text-black'}`}>
                <CatLogo className="w-full h-full" />
            </div>
            
            <div className="text-2xl md:text-3xl font-black tracking-tight flex">
                <span>Cat</span>
                <span className={`transition-colors duration-[800ms] ease-in-out ${isAnimated ? 'text-red-600' : 'text-black'}`}>T</span>
                <span className={`transition-colors duration-[800ms] ease-in-out ${isAnimated ? 'text-red-600' : 'text-black'}`}>r</span>
                <span className={`transition-colors duration-[800ms] ease-in-out ${isAnimated ? 'text-red-600' : 'text-black'}`}>a</span>
                <span className={`transition-colors duration-[800ms] ease-in-out ${isAnimated ? 'text-red-600' : 'text-black'}`}>c</span>
                <span className={`transition-colors duration-[800ms] ease-in-out ${isAnimated ? 'text-red-600' : 'text-black'}`}>k</span>
            </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
             <div className="hidden lg:flex gap-8 text-lg font-bold">
                {navItems.map((item) => (
                    <button 
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`transition-colors duration-200 ${
                            currentPage === item.id 
                            ? 'text-red-600 underline decoration-4 underline-offset-8' 
                            : 'text-black hover:text-red-500'
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            
            <button className="bg-black text-white px-4 md:px-6 py-2 rounded-lg font-bold hover:bg-gray-800 transition-all active:scale-95 shadow-lg shadow-gray-300/50 text-sm md:text-base">
                Logout
            </button>
        </div>
      </nav>

      {/* --- Sidebar (Live Mood Only) --- */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-gray-100 bg-white z-50 flex flex-col pt-32 p-8 hidden md:flex">
        <div className="flex flex-col items-center p-4 bg-gray-50 rounded-2xl border border-gray-100">
            <span className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Live Mood</span>
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${moodState.color}`}>
                {moodState.isDanger ? (
                    <BellRing className="text-white animate-bounce" size={32} />
                ) : (
                    <div className="w-12 h-12 bg-white/20 rounded-full" />
                )}
            </div>
            <p className="mt-4 text-[10px] text-center font-bold leading-tight">
                {moodState.label}
            </p>
        </div>
      </aside>

      {/* --- Main Content Area --- */}
      <main className="md:ml-64 pt-32 pb-20 px-8 flex flex-col min-h-screen relative z-10">
        {currentPage === 'home' && <HomePage onGetStarted={() => setCurrentPage('data')} isAnimated={isAnimated} />}
        
        {currentPage === 'data' && (
            <DataPage metrics={metrics} setMetrics={setMetrics} />
        )}

        {currentPage === 'map' && <MapPage isDanger={moodState.isDanger} />}

        {currentPage === 'profile' && <ProfilePage data={profileData} setData={setProfileData} />}

        {currentPage === 'history' && <HistoryPage />}
      </main>
    </div>
  );
}

// --- Sub-Components ---

function HistoryPage() {
    // Mock dashboard data
    const stats = [
        { label: 'Avg Heartbeat', value: '124', unit: 'BPM', color: 'text-red-500' },
        { label: 'Active Time', value: '14.5', unit: 'HRS', color: 'text-blue-500' },
        { label: 'Vocalization', value: '82', unit: 'FRQ', color: 'text-purple-500' },
        { label: 'Meals Today', value: '3/4', unit: 'SERV', color: 'text-yellow-600' }
    ];

    const logs = [
        { time: '12:45 PM', event: 'High Stress Alert', status: 'critical' },
        { time: '10:20 AM', event: 'Normal Rest Cycle', status: 'stable' },
        { time: '08:15 AM', event: 'Morning Feeding', status: 'stable' },
        { time: '04:30 AM', event: 'Low Activity Detected', status: 'warning' },
        { time: 'Yesterday', event: 'Veterinary Checkup Sync', status: 'stable' }
    ];

    return (
        <div className="flex-1 w-full max-w-5xl mx-auto py-4 animate-in fade-in duration-700">
             <h2 className="text-3xl font-bold mb-8 border-b-4 border-black pb-4 flex items-center gap-4">
                <History size={32} className="text-red-600" />
                Data History & Trends
            </h2>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s, i) => (
                    <div key={i} className="bg-white border-2 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <p className="text-[10px] font-black uppercase text-gray-400 mb-1">{s.label}</p>
                        <div className="flex items-baseline gap-1">
                            <span className={`text-2xl font-black ${s.color}`}>{s.value}</span>
                            <span className="text-[10px] font-bold">{s.unit}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Visual Chart Area */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border-2 border-black p-6 rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black uppercase flex items-center gap-2">
                                <TrendingUp size={18} /> 24h Activity Trend
                            </h3>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full" />
                                <div className="w-3 h-3 bg-gray-200 rounded-full" />
                            </div>
                        </div>
                        
                        {/* Mock SVG Chart */}
                        <div className="h-48 w-full bg-gray-50 rounded-xl border border-dashed border-gray-300 flex items-end p-4 gap-2">
                            {[40, 70, 45, 90, 65, 30, 85, 50, 60, 95, 40, 55].map((h, i) => (
                                <div 
                                    key={i} 
                                    className="flex-1 bg-black rounded-t-sm transition-all duration-1000 hover:bg-red-600 cursor-pointer" 
                                    style={{ height: `${h}%` }}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400 px-1">
                            <span>00:00</span>
                            <span>06:00</span>
                            <span>12:00</span>
                            <span>18:00</span>
                            <span>23:59</span>
                        </div>
                    </div>

                    <div className="bg-red-50 border-2 border-black p-6 rounded-3xl flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-full border-2 border-black flex items-center justify-center">
                                <AlertTriangle className="text-red-600" />
                            </div>
                            <div>
                                <h4 className="font-black text-sm uppercase">Health Suggestion</h4>
                                <p className="text-xs font-bold text-gray-600">Increased heart rate detected in last 2 hours. Ensure water is available.</p>
                            </div>
                        </div>
                        <button className="bg-black text-white px-4 py-2 rounded-lg text-xs font-black uppercase whitespace-nowrap">Dismiss</button>
                    </div>
                </div>

                {/* Event Log Area */}
                <div className="bg-white border-2 border-black rounded-3xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">
                    <div className="bg-black text-white p-4 font-black uppercase text-xs tracking-widest flex items-center justify-between">
                        <span>Event Log</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]">
                        {logs.map((log, i) => (
                            <div key={i} className="flex gap-3 border-b border-gray-100 pb-3 last:border-0">
                                <div className="mt-1">
                                    {log.status === 'critical' ? <AlertTriangle size={14} className="text-red-500" /> : <CheckCircle2 size={14} className="text-green-500" />}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-gray-400">{log.time}</span>
                                    <span className="text-xs font-bold leading-tight">{log.event}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="p-3 text-center text-[10px] font-black uppercase border-t border-gray-100 hover:bg-gray-50 transition-colors">
                        View Full Report
                    </button>
                </div>
            </div>
        </div>
    );
}

function ProfilePage({ data, setData }) {
    const handleChange = (field, value) => {
        setData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div className="flex-1 w-full max-w-4xl mx-auto py-4 animate-in fade-in duration-700">
            <h2 className="text-3xl font-bold mb-8 border-b-4 border-black pb-4 flex items-center gap-4">
                <User size={32} className="text-red-600" />
                User Profile
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Owner Information Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 px-2">
                        <User size={20} className="text-gray-400" />
                        <h3 className="text-xl font-black uppercase tracking-tight">Owner Information</h3>
                    </div>
                    
                    <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1">
                                <User size={10} /> Full Name
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter full name"
                                value={data.ownerName}
                                onChange={(e) => handleChange('ownerName', e.target.value)}
                                className="w-full bg-gray-50 border-2 border-gray-100 p-2 rounded-lg focus:border-black outline-none font-bold"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1">
                                <Mail size={10} /> Email Address
                            </label>
                            <input 
                                type="email"
                                placeholder="email@example.com"
                                value={data.ownerEmail}
                                onChange={(e) => handleChange('ownerEmail', e.target.value)}
                                className="w-full bg-gray-50 border-2 border-gray-100 p-2 rounded-lg focus:border-black outline-none font-bold"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-400 flex items-center gap-1">
                                <Phone size={10} /> Contact Number
                            </label>
                            <input 
                                type="text"
                                placeholder="+1 (555) 000-0000"
                                value={data.ownerPhone}
                                onChange={(e) => handleChange('ownerPhone', e.target.value)}
                                className="w-full bg-gray-50 border-2 border-gray-100 p-2 rounded-lg focus:border-black outline-none font-bold"
                            />
                        </div>
                    </div>
                </div>

                {/* Cat Information Section */}
                <div className="flex flex-col gap-6">
                    <div className="flex items-center gap-2 px-2">
                        <PawPrint size={20} className="text-red-600" />
                        <h3 className="text-xl font-black uppercase tracking-tight">Cat Information</h3>
                    </div>
                    
                    <div className="bg-[#fff9f9] border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] flex flex-col gap-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-red-400 flex items-center gap-1">
                                <PawPrint size={10} /> Pet Name
                            </label>
                            <input 
                                type="text"
                                placeholder="Enter pet name"
                                value={data.catName}
                                onChange={(e) => handleChange('catName', e.target.value)}
                                className="w-full bg-white border-2 border-red-100 p-2 rounded-lg focus:border-red-600 outline-none font-bold"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-red-400 flex items-center gap-1">
                                    <Hash size={10} /> Breed
                                </label>
                                <input 
                                    type="text"
                                    placeholder="e.g. Persian"
                                    value={data.catBreed}
                                    onChange={(e) => handleChange('catBreed', e.target.value)}
                                    className="w-full bg-white border-2 border-red-100 p-2 rounded-lg focus:border-red-600 outline-none font-bold"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase text-red-400 flex items-center gap-1">
                                    <Calendar size={10} /> Age
                                </label>
                                <input 
                                    type="text"
                                    placeholder="e.g. 2 Years"
                                    value={data.catAge}
                                    onChange={(e) => handleChange('catAge', e.target.value)}
                                    className="w-full bg-white border-2 border-red-100 p-2 rounded-lg focus:border-red-600 outline-none font-bold"
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-red-400 flex items-center gap-1">
                                <Navigation size={10} /> Tracker Chip ID
                            </label>
                            <input 
                                type="text"
                                placeholder="ID Number"
                                value={data.catChipId}
                                onChange={(e) => handleChange('catChipId', e.target.value)}
                                className="w-full bg-white border-2 border-red-100 p-2 rounded-lg focus:border-red-600 outline-none font-bold"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 p-6 bg-black text-white rounded-2xl flex justify-between items-center shadow-2xl">
                <div>
                    <p className="text-xs uppercase font-bold text-gray-400">Status</p>
                    <p className="text-lg font-black tracking-tight">Profile Data Ready</p>
                </div>
                <button className="bg-red-600 hover:bg-red-500 text-white px-8 py-2 rounded-lg font-bold transition-all active:scale-95">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

function MapPage({ isDanger }) {
    return (
        <div className="flex-1 w-full max-w-5xl mx-auto py-4 animate-in fade-in duration-700">
            <div className="flex justify-between items-end mb-8 border-b-4 border-black pb-4">
                <h2 className="text-3xl font-bold flex items-center gap-4">
                    <Navigation size={32} className={isDanger ? "text-red-600 animate-pulse" : "text-black"} />
                    Live Location Map
                </h2>
                {isDanger && (
                    <div className="bg-red-600 text-white px-4 py-1 text-xs font-black animate-pulse rounded">
                        EMERGENCY TRACKING ACTIVE
                    </div>
                )}
            </div>
            
            <div className="relative w-full aspect-video bg-[#f0f9f1] rounded-3xl border-4 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-green-100/50 to-transparent" />
                <div className="absolute inset-0 opacity-10" 
                     style={{ backgroundImage: 'linear-gradient(#059669 1px, transparent 1px), linear-gradient(90deg, #059669 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
                
                <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 800 450">
                    <path d="M0 225 L800 225 M400 0 L400 450" stroke="#059669" strokeWidth="8" fill="none" strokeLinecap="round" />
                    <path d="M100 0 L100 450 M700 0 L700 450" stroke="#10b981" strokeWidth="4" fill="none" />
                    <path d="M0 100 L800 100 M0 350 L800 350" stroke="#10b981" strokeWidth="4" fill="none" />
                    <path d="M0 0 L300 150 L500 300 L800 450" stroke="#34d399" strokeWidth="3" fill="none" strokeDasharray="10 5" />
                    <circle cx="400" cy="225" r="40" stroke="#059669" strokeWidth="2" fill="#d1fae5" />
                    <circle cx="100" cy="100" r="20" stroke="#059669" strokeWidth="2" fill="#d1fae5" />
                    <circle cx="700" cy="350" r="25" stroke="#059669" strokeWidth="2" fill="#d1fae5" />
                </svg>

                <div className="absolute top-[60%] left-[65%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                    <div className="relative">
                        <div className={`absolute inset-0 rounded-full animate-ping bg-red-500 opacity-40`} />
                        <div className="w-10 h-10 rounded-full border-4 border-white shadow-xl flex items-center justify-center bg-red-600 transform transition-transform hover:scale-110">
                            <MapPin size={20} className="text-white" />
                        </div>
                        <div className="w-1 h-3 bg-red-600 mx-auto -mt-1 rounded-full border-x-2 border-white" />
                    </div>
                </div>

                <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-xl border-2 border-black text-[10px] text-gray-800 font-bold shadow-md">
                        LAT: 23.8103° N<br/>
                        LONG: 90.4125° E<br/>
                        SIGNAL: {isDanger ? 'STABLE' : 'LOW'}
                    </div>
                </div>
            </div>
        </div>
    );
}

function DataPage({ metrics, setMetrics }) {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setMetrics(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex-1 w-full max-w-2xl mx-auto py-4 animate-in fade-in duration-500">
            <h2 className="text-3xl font-bold mb-8 border-b-4 border-black pb-4 flex items-center gap-4">
                <Database size={32} className="text-red-600" />
                Health Metrics
            </h2>
            
            <div className="grid gap-6">
                <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2 transition-transform hover:-translate-y-1">
                    <label className="flex items-center gap-2 font-bold text-sm">
                        <Heart size={16} className="text-red-500" /> Heartbeat (BPM)
                    </label>
                    <input 
                        type="number"
                        name="heartbeat"
                        placeholder="e.g. 150"
                        value={metrics.heartbeat}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 p-3 rounded-xl focus:border-black outline-none transition-all"
                    />
                </div>

                <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2 transition-transform hover:-translate-y-1">
                    <label className="flex items-center gap-2 font-bold text-sm">
                        <Activity size={16} className="text-blue-500" /> Sound Frequency (Hz)
                    </label>
                    <input 
                        type="number"
                        name="soundFreq"
                        placeholder="e.g. 1300"
                        value={metrics.soundFreq}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 p-3 rounded-xl focus:border-black outline-none transition-all"
                    />
                </div>

                <div className="bg-white border-2 border-black p-6 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2 transition-transform hover:-translate-y-1">
                    <label className="flex items-center gap-2 font-bold text-sm">
                        <Clock size={16} className="text-yellow-500" /> Last Feed Intake (Hours ago)
                    </label>
                    <input 
                        type="number"
                        name="lastFeed"
                        placeholder="e.g. 7"
                        value={metrics.lastFeed}
                        onChange={handleInputChange}
                        className="w-full bg-gray-50 border-2 border-gray-200 p-3 rounded-xl focus:border-black outline-none transition-all"
                    />
                </div>
            </div>
        </div>
    );
}

function HomePage({ onGetStarted, isAnimated }) {
    const [cursorVisible, setCursorVisible] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setCursorVisible(v => !v);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex-1 flex flex-col items-center justify-center py-20 px-4 animate-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-3xl md:text-6xl font-black mb-16 text-center leading-tight max-w-3xl">
                Monitor your Cat <span className={`transition-colors duration-[800ms] ${isAnimated ? 'text-red-600' : 'text-black'}`}>24/7</span>
                <span className="text-gray-400">...</span>
                <span className={`inline-block w-1.5 h-10 md:h-14 bg-black ml-2 -mb-1 align-bottom transition-opacity duration-100 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}></span>
            </h1>

            <button 
                onClick={onGetStarted}
                className="bg-black text-white px-12 py-4 rounded-2xl text-lg font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-gray-400/20"
            >
                Enter Health Data
            </button>
        </div>
    );
}