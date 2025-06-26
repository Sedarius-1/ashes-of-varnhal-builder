import { Link, useLocation } from 'react-router-dom';
import type { Faction } from '../types/faction';

const factions: Faction[] = [
    'House Kaevaryn',
    'Fangs of the Pale Hunger',
    'House Duresse',
    'Outclan Reclaimers',
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="w-64 bg-gradient-to-b from-slate-900 via-gray-900 to-black border-r border-slate-700/70 p-0 overflow-y-auto h-full shadow-2xl relative z-20">
            {/* Gothic sidebar pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>
            <nav className="space-y-6 relative z-10 p-6">
                <Link
                    to={`/`}
                    className="block px-4 py-3 rounded-xl font-black text-lg tracking-wide bg-gradient-to-r from-amber-700/80 to-orange-800/80 text-amber-200 shadow-lg shadow-amber-900/30 border border-amber-700/40 mb-6 hover:from-amber-600 hover:to-orange-700 hover:text-white transition-all duration-200"
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
                                >
                                    {faction.toUpperCase()}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                <h2 className="text-md font-black text-slate-400 uppercase tracking-widest mb-4 mt-8">Scenarios</h2>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/scenarios"
                            className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                                location.pathname.startsWith('/scenarios')
                                    ? 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-lg shadow-emerald-900/30 border-emerald-700/60'
                                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-emerald-300'
                            }`}
                        >
                            📜 Scenarios & Missions
                        </Link>
                    </li>
                </ul>
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
                        >
                            🏰 Campaign Rules
                        </Link>
                    </li>
                </ul>
                <h2 className="text-md font-black text-slate-400 uppercase tracking-widest mb-4 mt-8">Combat</h2>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/combat"
                            className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                                location.pathname.startsWith('/combat')
                                    ? 'bg-gradient-to-r from-red-700 to-pink-700 text-white shadow-lg shadow-red-900/30 border-red-700/60'
                                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-red-300'
                            }`}
                        >
                            ⚔️ Actions & Combat
                        </Link>
                    </li>
                </ul>
                <h2 className="text-md font-black text-slate-400 uppercase tracking-widest mb-4 mt-8">Special Rules</h2>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/special-rules"
                            className={`block px-4 py-2 rounded-xl font-black tracking-wide border border-slate-700/40 transition-all duration-200 ${
                                location.pathname.startsWith('/special-rules')
                                    ? 'bg-gradient-to-r from-cyan-700 to-blue-700 text-white shadow-lg shadow-cyan-900/30 border-cyan-700/60'
                                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-cyan-300'
                            }`}
                        >
                            🔮 Special Rules & Traits
                        </Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
