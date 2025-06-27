import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import type { Faction } from '../types/faction';

const factions: Faction[] = [
    'House Kaevaryn',
    'Fangs of the Pale Hunger',
    'House Duresse',
    'Outclan Reclaimers',
];

const Sidebar = () => {
    const location = useLocation();
    const [coreRulesExpanded, setCoreRulesExpanded] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    // Sidebar content as a function for reuse
    const sidebarContent = (
        <nav className="space-y-6 relative z-10 p-6">
            <Link
                to={`/`}
                className="block px-4 py-3 rounded-xl font-black text-lg tracking-wide bg-gradient-to-r from-amber-700/80 to-orange-800/80 text-amber-200 shadow-lg shadow-amber-900/30 border border-amber-700/40 mb-6 hover:from-amber-600 hover:to-orange-700 hover:text-white transition-all duration-200"
                onClick={() => setMobileOpen(false)}
            >
                ⚔️ Warband Builder
            </Link>
            <h2 className="text-md font-black text-slate-400 uppercase tracking-widest mb-4">Factions</h2>
            <ul className="space-y-2 mb-8">
                {factions.map((faction) => {
                    const isActive = location.pathname === `/factions/${encodeURIComponent(faction)}`;
                    return (
                        <li key={faction}>
                            <Link
                                to={`/factions/${encodeURIComponent(faction)}`}
                                className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                                    isActive
                                        ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-lg shadow-amber-900/30 border-amber-700/60'
                                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-amber-300'
                                }`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {faction.toUpperCase()}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            
            {/* Core Rules Collapsible Section */}
            <div className="mt-8">
                <button
                    onClick={() => setCoreRulesExpanded(!coreRulesExpanded)}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-black text-lg tracking-wide bg-gradient-to-r from-slate-700/80 to-slate-800/80 text-slate-200 shadow-lg border border-slate-600/40 hover:from-slate-600 hover:to-slate-700 hover:text-white transition-all duration-200"
                >
                    <span className="flex items-center gap-2">
                        <span>📚</span>
                        Core Rules
                    </span>
                    <span className={`transition-transform duration-200 ${coreRulesExpanded ? 'rotate-180' : ''}`}>
                        ▼
                    </span>
                </button>
                
                {coreRulesExpanded && (
                    <ul className="space-y-2 mt-4 pl-4">
                        <li>
                            <Link
                                to="/game-setup"
                                className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                                    location.pathname.startsWith('/game-setup')
                                        ? 'bg-gradient-to-r from-green-700 to-emerald-700 text-white shadow-lg shadow-green-900/30 border-green-700/60'
                                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-green-300'
                                }`}
                                onClick={() => setMobileOpen(false)}
                            >
                                🎯 Game Setup
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/turn-structure"
                                className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                                    location.pathname.startsWith('/turn-structure')
                                        ? 'bg-gradient-to-r from-indigo-700 to-blue-700 text-white shadow-lg shadow-indigo-900/30 border-indigo-700/60'
                                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-indigo-300'
                                }`}
                                onClick={() => setMobileOpen(false)}
                            >
                                ⏱️ Turn Structure & Phases
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/combat"
                                className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                                    location.pathname.startsWith('/combat')
                                        ? 'bg-gradient-to-r from-red-700 to-pink-700 text-white shadow-lg shadow-red-900/30 border-red-700/60'
                                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-red-300'
                                }`}
                                onClick={() => setMobileOpen(false)}
                            >
                                ⚔️ Actions & Combat
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/special-rules"
                                className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                                    location.pathname.startsWith('/special-rules')
                                        ? 'bg-gradient-to-r from-cyan-700 to-blue-700 text-white shadow-lg shadow-cyan-900/30 border-cyan-700/60'
                                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-cyan-300'
                                }`}
                                onClick={() => setMobileOpen(false)}
                            >
                                🔮 Special Rules & Traits
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/scenarios"
                                className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                                    location.pathname.startsWith('/scenarios')
                                        ? 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-lg shadow-emerald-900/30 border-emerald-700/60'
                                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-emerald-300'
                                }`}
                                onClick={() => setMobileOpen(false)}
                            >
                                📜 Scenarios & Missions
                            </Link>
                        </li>
                     
                    </ul>
                )}
            </div>
            <h2 className="text-md font-black text-slate-400 uppercase tracking-widest mb-4 mt-8">Campaigns</h2>
            <ul className="space-y-2">
                <li>
                    <Link
                        to="/campaigns"
                        className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                            location.pathname.startsWith('/campaigns')
                                ? 'bg-gradient-to-r from-violet-700 to-purple-700 text-white shadow-lg shadow-violet-900/30 border-violet-700/60'
                                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-violet-300'
                        }`}
                        onClick={() => setMobileOpen(false)}
                    >
                        🏰 Campaign Rules
                    </Link>
                </li>
            </ul>
            <h2 className="text-md font-black text-slate-400 uppercase tracking-widest mb-4 mt-8">Fate Cards</h2>
            <ul className="space-y-2">
                <li>
                    <Link
                        to="/fate-cards"
                        className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                            location.pathname.startsWith('/fate-cards')
                                ? 'bg-gradient-to-r from-rose-700 to-pink-700 text-white shadow-lg shadow-rose-900/30 border-rose-700/60'
                                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-rose-300'
                        }`}
                        onClick={() => setMobileOpen(false)}
                    >
                        🎴 Fate Cards
                    </Link>
                </li>
            </ul>
            <h2 className="text-md font-black text-slate-400 uppercase tracking-widest mb-4 mt-8">Download</h2>
            <ul className="space-y-2">
                <li>
                    <Link
                        to="/keywords"
                        className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                            location.pathname.startsWith('/keywords')
                                ? 'bg-gradient-to-r from-purple-700 to-violet-700 text-white shadow-lg shadow-purple-900/30 border-purple-700/60'
                                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-purple-300'
                        }`}
                        onClick={() => setMobileOpen(false)}
                    >
                        📚 Keywords
                    </Link>
                </li>
                <li>
                    <Link
                        to="/fate-cards-list"
                        className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                            location.pathname.startsWith('/fate-cards-list')
                                ? 'bg-gradient-to-r from-rose-700 to-pink-700 text-white shadow-lg shadow-rose-900/30 border-rose-700/60'
                                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-rose-300'
                        }`}
                        onClick={() => setMobileOpen(false)}
                    >
                        🎴 Fate Cards List
                    </Link>
                </li>
            </ul>
        </nav>
    );

    return (
        <>
            {/* Hamburger for mobile */}
            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-slate-900/90 border border-slate-700 rounded-full p-3 shadow-lg text-2xl text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                onClick={() => setMobileOpen(true)}
                aria-label="Open sidebar"
            >
                <span>☰</span>
            </button>
            {/* Sidebar for desktop and mobile */}
            <aside
                className={
                    `w-64 bg-gradient-to-b from-slate-900 via-gray-900 to-black border-r border-slate-700/70 p-0 overflow-y-auto h-full shadow-2xl fixed md:static top-0 left-0 z-50 transition-transform duration-300
                    ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`
                }
                style={mobileOpen ? { boxShadow: '0 0 0 9999px rgba(0,0,0,0.7)' } : {}}
            >
                {/* Gothic sidebar pattern */}
                <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>
                {sidebarContent}
                {/* Close button for mobile */}
                {mobileOpen && (
                    <button
                        className="absolute top-4 right-4 z-50 bg-slate-900/90 border border-slate-700 rounded-full p-2 shadow-lg text-xl text-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 md:hidden"
                        onClick={() => setMobileOpen(false)}
                        aria-label="Close sidebar"
                    >
                        ✕
                    </button>
                )}
            </aside>
            {/* Backdrop for mobile */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 z-30 md:hidden"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close sidebar backdrop"
                />
            )}
        </>
    );
};

export default Sidebar;
