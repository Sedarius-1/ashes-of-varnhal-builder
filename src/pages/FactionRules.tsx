import { useParams } from 'react-router-dom';
import { useState } from 'react';
import type { FactionData } from '../types/factionData';
import factionsData from '../definitions/factions.json';
import type {FactionTrait} from "../types/factionTrait.ts";

const TABS = [
    { key: 'lore', label: 'Lore', icon: '📖' },
    { key: 'themes', label: 'Themes & Playstyle', icon: '⚔️' },
    { key: 'traits', label: 'Trait Table', icon: '🎲' },
    { key: 'summary', label: 'Summary', icon: '⭐' },
];

const FactionRules: React.FC = () => {
    const { factionName } = useParams<{ factionName: string }>();
    const [activeTab, setActiveTab] = useState('lore');
    
    if (!factionName) return <p>No faction specified</p>;
    
    const faction: FactionData | undefined = (factionsData as Record<string, FactionData>)[factionName];
    if (!faction) return <p>Faction data not found for "{factionName}"</p>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            {/* Gothic background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="max-w-4xl mx-auto p-8 relative z-10">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="relative">
                        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-4 tracking-wider">
                            ⚔️ {factionName.toUpperCase()} ⚔️
                        </h1>
                        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-amber-400/20 via-orange-500/20 to-red-600/20 blur-xl rounded-full"></div>
                    </div>
                    <div className="w-32 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 mx-auto rounded-full shadow-lg shadow-orange-500/50"></div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex justify-center mb-10">
                    <div className="inline-flex flex-wrap md:flex-nowrap rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg overflow-x-auto w-full md:w-auto">
                        {TABS.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-4 md:px-8 py-2 md:py-3 font-black text-base md:text-lg tracking-wide flex items-center gap-2 transition-all duration-200 border-r border-slate-700/40 last:border-r-0
                                    ${activeTab === tab.key
                                        ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-xl shadow-amber-900/30'
                                        : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-amber-300'}
                                `}
                            >
                                <span>{tab.icon}</span>
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Panels */}
                <div>
                    {activeTab === 'lore' && (
                        <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-200 mb-6 flex items-center tracking-wide">
                                <span className="text-amber-400 mr-3">📖</span>
                                LORE
                            </h2>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                {faction.lore.map((para, i) => (
                                    <p key={i} className="text-base md:text-lg">{para}</p>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === 'themes' && (
                        <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                                <span className="text-orange-400 mr-3">⚔️</span>
                                THEMES AND PLAYSTYLE
                            </h2>
                            {/* Passive Trait */}
                            <div className="mb-8 p-4 md:p-6 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl border-l-4 border-blue-500">
                                <h3 className="text-xl md:text-2xl font-black text-blue-300 mb-4 tracking-wide">
                                    {faction.themesAndPlaystyle.passiveTrait.title}
                                </h3>
                                <div className="space-y-3">
                                    {faction.themesAndPlaystyle.passiveTrait.description.map((p, i) => (
                                        <p key={i} className="text-slate-300 leading-relaxed text-base md:text-lg">{p}</p>
                                    ))}
                                </div>
                            </div>
                            {/* Leader Trait */}
                            <div className="mb-8 p-4 md:p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl border-l-4 border-purple-500">
                                <h3 className="text-xl md:text-2xl font-black text-purple-300 mb-4 tracking-wide">
                                    {faction.themesAndPlaystyle.leaderTrait.title}
                                </h3>
                                <p className="text-slate-300 leading-relaxed text-base md:text-lg">
                                    {faction.themesAndPlaystyle.leaderTrait.description}
                                </p>
                            </div>
                            {/* Tactical Directives */}
                            <div className="p-4 md:p-6 bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl border-l-4 border-amber-500">
                                <h3 className="text-xl md:text-2xl font-black text-amber-300 mb-4 flex items-center tracking-wide">
                                    <span className="mr-2">🎯</span>
                                    TACTICAL DIRECTIVES
                                </h3>
                                <ul className="space-y-3">
                                    {faction.themesAndPlaystyle.tacticalDirectives.map((directive, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                                            <span className="text-slate-300 leading-relaxed text-base md:text-lg">{directive}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    {activeTab === 'traits' && (
                        <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
                            <h2 className="text-2xl md:text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                                <span className="text-red-400 mr-3">🎲</span>
                                {factionName.toUpperCase()}: FACTION TRAIT TABLE (1D6)
                            </h2>
                            <div className="overflow-x-auto rounded-xl border border-slate-600">
                                <table className="w-full min-w-[400px] text-sm md:text-base">
                                    <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
                                        <tr>
                                            <th className="px-2 md:px-6 py-2 md:py-4 text-left text-white font-black text-base md:text-lg tracking-wide">ROLL</th>
                                            <th className="px-2 md:px-6 py-2 md:py-4 text-left text-white font-black text-base md:text-lg tracking-wide">TRAIT (NAME AND EFFECT)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-600">
                                        {faction.traitTable.map((trait: FactionTrait) => (
                                            <tr key={trait.roll} className="hover:bg-slate-700/50 transition-colors">
                                                <td className="px-2 md:px-6 py-2 md:py-4 text-center">
                                                    <span className="inline-flex items-center justify-center w-8 h-8 md:w-12 md:h-12 bg-gradient-to-r from-red-500 to-red-600 text-white font-black text-base md:text-lg rounded-full shadow-lg shadow-red-500/25">
                                                        {trait.roll}
                                                    </span>
                                                </td>
                                                <td className="px-2 md:px-6 py-2 md:py-4">
                                                    <div className="space-y-2">
                                                        <h4 className="font-black text-slate-200 text-base md:text-lg tracking-wide">{trait.name}</h4>
                                                        <p className="text-slate-300 leading-relaxed text-base md:text-lg">{trait.description}</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </section>
                    )}

                    {activeTab === 'summary' && (
                        <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
                            <div className="space-y-6 text-slate-300 leading-relaxed">
                                {faction.summary.map((para, i) => (
                                    <p key={i} className="text-base md:text-lg">{para}</p>
                                ))}
                            </div>
                            <div className="mt-8 p-4 md:p-6 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl border-l-4 border-emerald-500">
                                <h3 className="text-xl md:text-2xl font-black text-emerald-300 mb-4 flex items-center tracking-wide">
                                    <span className="mr-2">⭐</span>
                                    IDEAL FOR
                                </h3>
                                <ul className="space-y-3">
                                    {faction.playstyleBullets.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-emerald-400 font-black mr-3 mt-1">✓</span>
                                            <span className="text-slate-300 leading-relaxed text-base md:text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-8 p-4 md:p-6 bg-gradient-to-r from-slate-700/50 to-gray-700/50 rounded-xl border-l-4 border-slate-500">
                                <p className="text-slate-300 leading-relaxed italic text-base md:text-lg">{faction.closingNote}</p>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FactionRules;
