import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import type { FactionData } from '../types/factionData';
import factionsData from '../definitions/factions.json';
import type {FactionTrait} from "../types/factionTrait.ts";

function renderWithLinks(textOrArray: string | string[]) {
    // Accepts either a string or an array of strings (paragraphs)
    const renderParagraph = (text: string, key?: number) => {
        // Regex to match [label](url)
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts = [];
        let lastIndex = 0;
        let match;
        let linkKey = 0;
        while ((match = regex.exec(text)) !== null) {
            if (match.index > lastIndex) {
                parts.push(text.slice(lastIndex, match.index));
            }
            parts.push(
                <Link key={linkKey++} to={match[2]} className="text-amber-400 underline hover:text-amber-300">
                    {match[1]}
                </Link>
            );
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < text.length) {
            parts.push(text.slice(lastIndex));
        }
        return <>{parts}</>;
    };

    // If it's a single string, just render as before
    if (typeof textOrArray === 'string') {
        // If it's a single list item, render as <li>
        if (textOrArray.trim().startsWith('- ')) {
            return <ul className="list-disc pl-6"><li>{renderParagraph(textOrArray.trim().slice(2))}</li></ul>;
        }
        return renderParagraph(textOrArray);
    }

    // If it's an array, check for lists
    const result: React.ReactNode[] = [];
    let i = 0;
    while (i < textOrArray.length) {
        // If this line is a list item
        if (textOrArray[i].trim().startsWith('- ')) {
            // Start a list
            const items = [];
            while (i < textOrArray.length && textOrArray[i].trim().startsWith('- ')) {
                items.push(
                    <li key={i}>{renderParagraph(textOrArray[i].trim().slice(2))}</li>
                );
                i++;
            }
            result.push(
                <ul className="list-disc pl-6 mb-2" key={i}>{items}</ul>
            );
        } else {
            // Regular paragraph
            result.push(
                <p key={i}>{renderParagraph(textOrArray[i])}</p>
            );
            i++;
        }
    }
    return result;
}

const FactionRules: React.FC = () => {
    const { factionName } = useParams<{ factionName: string }>();
    const [activeTab, setActiveTab] = useState('lore');
    const navigate = useNavigate();
    
    if (!factionName) return <p>No faction specified</p>;
    
    const faction: FactionData | undefined = (factionsData as Record<string, FactionData>)[factionName];
    if (!faction) return <p>Faction data not found for "{factionName}"</p>;

    // Clean layout for all factions with wiki content
    if (faction.wiki && faction.wiki.length > 0) {
        const [showRecent, setShowRecent] = useState(false);
        // Sort wiki articles by lastEdited (desc), fallback to order
        const sortedWiki = [...faction.wiki].sort((a, b) => {
            if (a.lastEdited && b.lastEdited) {
                return new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
            }
            if (a.lastEdited) return -1;
            if (b.lastEdited) return 1;
            return 0;
        });
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
                <div className="max-w-5xl mx-auto p-4 md:p-8 relative z-10">
                    <button
                        onClick={() => navigate(-1)}
                        className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
                    >
                        ← Back
                    </button>
                    <div className="mb-8 md:mb-12 text-center">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-2 tracking-wider">
                            ⚔️ {factionName.toUpperCase()} ⚔️
                        </h1>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start mb-8 md:mb-12">
                        {/* Overview block with clickable title */}
                        <div className="flex-1 bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide">Overview</h2>
                            <div className="space-y-3 md:space-y-4 text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                                {faction.wiki && faction.wiki.find(a => a.title === 'Overview')?.content.map((para, i) => (
                                    <p key={i}>{renderWithLinks(para)}</p>
                                ))}
                            </div>
                        </div>
                        {/* Right-aligned info box */}
                        <div className="w-full lg:w-80 bg-gradient-to-br from-slate-700/80 to-slate-900/80 rounded-2xl shadow-xl p-4 md:p-6 border border-slate-600/60 text-right flex-shrink-0">
                            <h3 className="text-base md:text-lg font-bold text-amber-300 mb-3 md:mb-4 tracking-wide">House Profile</h3>
                            <div className="mb-3 md:mb-4">
                                <div className="text-slate-400 font-semibold text-sm md:text-base">Seat of Power</div>
                                <div className="text-slate-200 text-sm md:text-base">
                                    {renderWithLinks(faction.wiki.find(a => a.title === 'Seat of Power')?.content[0] || '')}
                                </div>
                            </div>
                            <div className="mb-3 md:mb-4">
                                <div className="text-slate-400 font-semibold text-sm md:text-base">Date Established</div>
                                <div className="text-slate-200 text-sm md:text-base">{renderWithLinks(faction.wiki.find(a => a.title === 'Date Established')?.content[0] || '')}</div>
                            </div>
                            <div className="mb-3 md:mb-4">
                                <div className="text-slate-400 font-semibold text-sm md:text-base">Emblem & Colors</div>
                                <div className="text-slate-200 text-sm md:text-base">{renderWithLinks(faction.wiki.find(a => a.title === 'Emblem & Colors')?.content[0] || '')}</div>
                            </div>
                        </div>
                    </div>
                    {/* Leadership */}
                    <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide">Leadership</h2>
                        <div className="space-y-4 md:space-y-6 text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-2">Influential People</h3>
                                {faction.wiki.find(a => a.title === 'Influential People')?.content.map((para, i) => <p key={i}>{renderWithLinks(para)}</p>) || 
                                 <p className="text-slate-400 italic">Information about influential people to be added...</p>}
                            </div>
                            {/* Succession visually enhanced */}
                            {faction.wiki.find(a => a.title === 'Succession') && (
                                <div className="mt-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-2xl md:text-3xl text-rose-400">🩸</span>
                                        <h3 className="text-lg md:text-xl font-black text-rose-300 tracking-wide">Succession: The Crimson Accord</h3>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Ritual Steps */}
                                        <div className="bg-slate-900/70 rounded-xl border border-rose-700/40 shadow p-4 md:p-6 flex flex-col gap-3">
                                            <h4 className="text-base md:text-lg font-bold text-rose-200 mb-2 flex items-center gap-2"><span>🗡️</span> The Ritual</h4>
                                            {(() => {
                                                const content = faction.wiki.find(a => a.title === 'Succession')?.content || [];
                                                // Show all paragraphs up to the inheritance list
                                                const ritualParas = [];
                                                for (let para of content) {
                                                    if (para.startsWith('If the bonding succeeds')) break;
                                                    ritualParas.push(para);
                                                }
                                                return ritualParas.map((para, i) => <p key={i} className="text-slate-300 text-sm md:text-base">{renderWithLinks(para)}</p>);
                                            })()}
                                            {/* Callout for risk */}
                                            <div className="bg-gradient-to-r from-rose-900/70 to-slate-900/70 border-l-4 border-rose-500 rounded-lg p-3 mt-2 flex items-center gap-2">
                                                <span className="text-rose-400 text-xl">⚠️</span>
                                                <span className="text-rose-200 font-semibold">Most fail. Their minds burn out. Their blood rejects the link. Their names are never spoken again.</span>
                                            </div>
                                        </div>
                                        {/* Inheritance List */}
                                        <div className="bg-slate-900/70 rounded-xl border border-amber-700/40 shadow p-4 md:p-6 flex flex-col gap-3">
                                            <h4 className="text-base md:text-lg font-bold text-amber-200 mb-2 flex items-center gap-2"><span>👑</span> The Ruler Inherits</h4>
                                            {(() => {
                                                const content = faction.wiki.find(a => a.title === 'Succession')?.content || [];
                                                // Find the inheritance list and after
                                                const start = content.findIndex(para => para.startsWith('If the bonding succeeds'));
                                                if (start === -1) return null;
                                                // Find the next non-list or end
                                                let end = start + 1;
                                                while (end < content.length && content[end].trim().startsWith('- ')) end++;
                                                // List items
                                                const listItems = content.slice(start + 1, end);
                                                // Final note (if any)
                                                const afterList = content.slice(end);
                                                return <>
                                                    <div className="mb-2">
                                                        <p className="text-slate-300 text-sm md:text-base mb-2">{renderWithLinks(content[start])}</p>
                                                        <ul className="list-disc pl-6 space-y-2">
                                                            {listItems.map((item, i) => (
                                                                <li key={i} className="text-amber-200 text-sm md:text-base">{renderWithLinks(item.slice(2))}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    {afterList.map((para, i) => (
                                                        <p key={i} className="text-slate-400 italic text-xs md:text-sm mt-2">{renderWithLinks(para)}</p>
                                                    ))}
                                                </>;
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Territory and Resources */}
                    <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide">Territory and Resources</h2>
                        <div className="space-y-4 md:space-y-6 text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🗺️</span>
                                    Geography
                                </h3>
                                {(() => {
                                    const geo = faction.wiki.find(a => a.title === 'Geography');
                                    if ((geo as any)?.regions) {
                                        return (
                                            <div className="space-y-6">
                                                {(geo as any).regions.map((region: any, idx: number) => (
                                                    <div key={idx} className="bg-gradient-to-r from-slate-900/70 to-slate-800/70 rounded-xl border border-emerald-700/40 p-4 md:p-6 relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                                                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-400/10 rounded-full translate-y-8 -translate-x-8"></div>
                                                        <div className="relative z-10">
                                                            <h4 className="text-lg md:text-xl font-black text-emerald-300 mb-3 flex items-center gap-2">
                                                                <span className="text-xl">{region.icon}</span>
                                                                {region.title}
                                                            </h4>
                                                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                                                {renderWithLinks(region.text)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    } else if (geo?.content) {
                                        // fallback for old format
                                        return geo.content.map((para, i) => <p key={i}>{renderWithLinks(para)}</p>);
                                    } else {
                                        return <p className="text-slate-400 italic">Geographic information to be added...</p>;
                                    }
                                })()}
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">💰</span>
                                    Economy
                                </h3>
                                {(() => {
                                    const economy = faction.wiki.find(a => a.title === 'Economy');
                                    if ((economy as any)?.regions) {
                                        return (
                                            <div className="space-y-6">
                                                {(economy as any).regions.map((region: any, idx: number) => (
                                                    <div key={idx} className="bg-gradient-to-r from-slate-900/70 to-slate-800/70 rounded-xl border border-emerald-700/40 p-4 md:p-6 relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                                                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-400/10 rounded-full translate-y-8 -translate-x-8"></div>
                                                        <div className="relative z-10">
                                                            <h4 className="text-lg md:text-xl font-black text-emerald-300 mb-3 flex items-center gap-2">
                                                                <span className="text-xl">{region.icon}</span>
                                                                {region.title}
                                                            </h4>
                                                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                                                {renderWithLinks(region.text)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    } else if (economy?.content) {
                                        // fallback for old format
                                        return economy.content.map((para, i) => <p key={i}>{renderWithLinks(para)}</p>);
                                    } else {
                                        return <p className="text-slate-400 italic">Economic information to be added...</p>;
                                    }
                                })()}
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🏭</span>
                                    Industry
                                </h3>
                                {(() => {
                                    const industry = faction.wiki.find(a => a.title === 'Industry');
                                    if ((industry as any)?.regions) {
                                        return (
                                            <div className="space-y-6">
                                                {(industry as any).regions.map((region: any, idx: number) => (
                                                    <div key={idx} className="bg-gradient-to-r from-slate-900/70 to-slate-800/70 rounded-xl border border-emerald-700/40 p-4 md:p-6 relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                                                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-400/10 rounded-full translate-y-8 -translate-x-8"></div>
                                                        <div className="relative z-10">
                                                            <h4 className="text-lg md:text-xl font-black text-emerald-300 mb-3 flex items-center gap-2">
                                                                <span className="text-xl">{region.icon}</span>
                                                                {region.title}
                                                            </h4>
                                                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                                                {renderWithLinks(region.text)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    } else if (industry?.content) {
                                        // fallback for old format
                                        return industry.content.map((para, i) => <p key={i}>{renderWithLinks(para)}</p>);
                                    } else {
                                        return <p className="text-slate-400 italic">Industrial information to be added...</p>;
                                    }
                                })()}
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🤝</span>
                                    Trade
                                </h3>
                                {(() => {
                                    const trade = faction.wiki.find(a => a.title === 'Trade');
                                    if ((trade as any)?.regions) {
                                        return (
                                            <div className="space-y-6">
                                                {(trade as any).regions.map((region: any, idx: number) => (
                                                    <div key={idx} className="bg-gradient-to-r from-slate-900/70 to-slate-800/70 rounded-xl border border-emerald-700/40 p-4 md:p-6 relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                                                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-emerald-400/10 rounded-full translate-y-8 -translate-x-8"></div>
                                                        <div className="relative z-10">
                                                            <h4 className="text-lg md:text-xl font-black text-emerald-300 mb-3 flex items-center gap-2">
                                                                <span className="text-xl">{region.icon}</span>
                                                                {region.title}
                                                            </h4>
                                                            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-3">
                                                                {renderWithLinks(region.text)}
                                                            </p>
                                                            {region.list && (
                                                                <ul className="list-disc pl-6 space-y-2">
                                                                    {region.list.map((item: string, itemIdx: number) => (
                                                                        <li key={itemIdx} className="text-slate-300 text-sm md:text-base">
                                                                            {renderWithLinks(item)}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    } else if (trade?.content) {
                                        // fallback for old format
                                        return trade.content.map((para, i) => <p key={i}>{renderWithLinks(para)}</p>);
                                    } else {
                                        return <p className="text-slate-400 italic">Trade information to be added...</p>;
                                    }
                                })()}
                            </div>
                        </div>
                    </div>

                    {/* Culture */}
                    <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide">Culture</h2>
                        <div className="space-y-4 md:space-y-6 text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🎭</span>
                                    Ideology
                                </h3>
                                {(() => {
                                    const ideology = faction.wiki.find(a => a.title === 'Ideology');
                                    if ((ideology as any)?.regions) {
                                        return (
                                            <div className="space-y-6">
                                                {(ideology as any).regions.map((region: any, idx: number) => (
                                                    <div key={idx} className={`bg-gradient-to-r from-slate-900/70 to-slate-800/70 rounded-xl border p-4 md:p-6 relative overflow-hidden ${
                                                        region.highlight 
                                                            ? 'border-amber-700/40 bg-gradient-to-r from-amber-900/20 to-orange-900/20' 
                                                            : 'border-purple-700/40'
                                                    }`}>
                                                        <div className={`absolute top-0 right-0 w-20 h-20 rounded-full -translate-y-10 translate-x-10 ${
                                                            region.highlight 
                                                                ? 'bg-amber-500/20' 
                                                                : 'bg-purple-500/10'
                                                        }`}></div>
                                                        <div className={`absolute bottom-0 left-0 w-16 h-16 rounded-full translate-y-8 -translate-x-8 ${
                                                            region.highlight 
                                                                ? 'bg-amber-400/20' 
                                                                : 'bg-purple-400/10'
                                                        }`}></div>
                                                        <div className="relative z-10">
                                                            <h4 className={`text-lg md:text-xl font-black mb-3 flex items-center gap-2 ${
                                                                region.highlight 
                                                                    ? 'text-amber-300' 
                                                                    : 'text-purple-300'
                                                            }`}>
                                                                <span className="text-xl">{region.icon}</span>
                                                                {region.title}
                                                            </h4>
                                                            <div className={`text-sm md:text-base leading-relaxed ${
                                                                region.highlight 
                                                                    ? 'text-amber-200 text-center italic text-lg md:text-xl font-semibold' 
                                                                    : 'text-slate-300'
                                                            }`}>
                                                                {renderWithLinks(region.text)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    } else if (ideology?.content) {
                                        // fallback for old format
                                        return ideology.content.map((para, i) => <p key={i}>{renderWithLinks(para)}</p>);
                                    } else {
                                        return <p className="text-slate-400 italic">Ideological information to be added...</p>;
                                    }
                                })()}
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-2">Rites</h3>
                                {faction.wiki.find(a => a.title === 'Rites')?.content.map((para, i) => <p key={i}>{renderWithLinks(para)}</p>) || 
                                 <p className="text-slate-400 italic">Information about rites and rituals to be added...</p>}
                            </div>
                        </div>
                    </div>

                    {/* Military */}
                    <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide">Military</h2>
                        <div className="space-y-4 md:space-y-6 text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-red-300 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">⚔️</span>
                                    Military
                                </h3>
                                {(() => {
                                    const military = faction.wiki.find(a => a.title === 'Military');
                                    if ((military as any)?.regions) {
                                        return (
                                            <div className="space-y-8">
                                                {(military as any).regions.map((region: any, idx: number) => (
                                                    <div key={idx} className="bg-gradient-to-r from-slate-900/70 to-slate-800/70 rounded-2xl border border-red-700/40 p-4 md:p-6 relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -translate-y-10 translate-x-10"></div>
                                                        <div className="absolute bottom-0 left-0 w-16 h-16 bg-red-400/10 rounded-full translate-y-8 -translate-x-8"></div>
                                                        <div className="relative z-10">
                                                            <h4 className="text-lg md:text-xl font-black text-red-300 mb-3 flex items-center gap-2">
                                                                <span className="text-xl">{region.icon}</span>
                                                                {region.title}
                                                            </h4>
                                                            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                                                                {renderWithLinks(region.text)}
                                                            </p>
                                                            
                                                            {region.subsections && (
                                                                <div className="space-y-4">
                                                                    {region.subsections.map((subsection: any, subIdx: number) => (
                                                                        <div key={subIdx} className="bg-slate-800/50 rounded-lg border border-red-600/30 p-3 md:p-4">
                                                                            <h5 className="text-base md:text-lg font-bold text-red-200 mb-2 flex items-center gap-2">
                                                                                <span className="text-lg">{subsection.icon}</span>
                                                                                {subsection.title}
                                                                            </h5>
                                                                            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                                                                                {renderWithLinks(subsection.text)}
                                                                            </p>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        );
                                    } else if (military?.content) {
                                        // fallback for old format
                                        return military.content.map((para, i) => <p key={i}>{renderWithLinks(para)}</p>);
                                    } else {
                                        return <p className="text-slate-400 italic">Military information to be added...</p>;
                                    }
                                })()}
                            </div>
                        </div>
                    </div>

                    {/* Political Situation */}
                    <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide">Political Situation</h2>
                        <div className="space-y-6">
                            {(() => {
                                const politics = faction.wiki.find(a => a.title === 'Political Situation');
                                if ((politics as any)?.regions) {
                                    return (
                                        <div className="space-y-8">
                                            {(politics as any).regions.map((region: any, idx: number) => {
                                                const getBorderColor = () => {
                                                    if (region.title === 'Allies') return 'border-emerald-700/40';
                                                    if (region.title === 'Enemies') return 'border-red-700/40';
                                                    return 'border-slate-600/40';
                                                };
                                                const getBgColor = () => {
                                                    if (region.title === 'Allies') return 'bg-emerald-500/10';
                                                    if (region.title === 'Enemies') return 'bg-red-500/10';
                                                    return 'bg-slate-500/10';
                                                };
                                                const getTextColor = () => {
                                                    if (region.title === 'Allies') return 'text-emerald-300';
                                                    if (region.title === 'Enemies') return 'text-red-300';
                                                    return 'text-slate-300';
                                                };
                                                
                                                return (
                                                    <div key={idx} className={`bg-gradient-to-r from-slate-900/70 to-slate-800/70 rounded-xl border ${getBorderColor()} p-4 md:p-6 relative overflow-hidden`}>
                                                        <div className={`absolute top-0 right-0 w-20 h-20 ${getBgColor()} rounded-full -translate-y-10 translate-x-10`}></div>
                                                        <div className={`absolute bottom-0 left-0 w-16 h-16 ${getBgColor()} rounded-full translate-y-8 -translate-x-8`}></div>
                                                        <div className="relative z-10">
                                                            <h3 className={`text-lg md:text-xl font-black mb-3 flex items-center gap-2 ${getTextColor()}`}>
                                                                <span className="text-xl">{region.icon}</span>
                                                                {region.title}
                                                            </h3>
                                                            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                                                                {renderWithLinks(region.text)}
                                                            </p>
                                                            
                                                            {region.relationships && (
                                                                <div className="space-y-4">
                                                                    {region.relationships.map((rel: any, relIdx: number) => (
                                                                        <div key={relIdx} className="bg-slate-800/50 rounded-lg border border-slate-600/30 p-3 md:p-4">
                                                                            <h4 className="text-base md:text-lg font-bold text-slate-200 mb-2">
                                                                                <Link 
                                                                                    to={`/lore/factions/${encodeURIComponent(rel.faction)}`}
                                                                                    className="text-amber-400 hover:text-amber-300 transition-colors"
                                                                                >
                                                                                    {rel.faction}
                                                                                </Link>
                                                                            </h4>
                                                                            <div className="space-y-2 text-sm md:text-base">
                                                                                <div className="flex items-start gap-2">
                                                                                    <span className="text-slate-400 font-semibold min-w-20">Nature:</span>
                                                                                    <span className="text-slate-300">{renderWithLinks(rel.nature)}</span>
                                                                                </div>
                                                                                {(rel.pact || rel.clash || rel.description) && (
                                                                                    <div className="flex items-start gap-2">
                                                                                        <span className="text-slate-400 font-semibold min-w-20">
                                                                                            {rel.pact ? 'Pact:' : rel.clash ? 'Clash:' : 'Details:'}
                                                                                        </span>
                                                                                        <span className="text-slate-300">
                                                                                            {renderWithLinks(rel.pact || rel.clash || rel.description)}
                                                                                        </span>
                                                                                    </div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    );
                                } else {
                                    return <p className="text-slate-400 italic">Political information to be added...</p>;
                                }
                            })()}
                        </div>
                    </div>

                    {/* Current Status */}
                    <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide">Current Status</h2>
                        <div className="space-y-4 md:space-y-6 text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-2">Territorial Control</h3>
                                {faction.wiki.find(a => a.title === 'Territorial Control')?.content.map((para, i) => <p key={i}>{renderWithLinks(para)}</p>) || null}
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-2">Political Influence</h3>
                                {faction.wiki.find(a => a.title === 'Political Influence')?.content.map((para, i) => <p key={i}>{renderWithLinks(para)}</p>) || null}
                            </div>
                        </div>
                    </div>

                    {/* Challenges & Pressures */}
                    <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide">Challenges & Pressures</h2>
                        <div className="space-y-4 md:space-y-6 text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-rose-300 mb-2">Resource Scarcity</h3>
                                {faction.wiki.find(a => a.title === 'Challenges & Pressures')?.content.filter(p => p.startsWith('Resource Scarcity')).map((para, i) => <p key={i}>{renderWithLinks(para)}</p>) || null}
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-rose-300 mb-2">Internal Friction</h3>
                                {faction.wiki.find(a => a.title === 'Challenges & Pressures')?.content.filter(p => p.startsWith('Internal Friction')).map((para, i) => <p key={i}>{renderWithLinks(para)}</p>) || null}
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-bold text-rose-300 mb-2">External Threats</h3>
                                {faction.wiki.find(a => a.title === 'Challenges & Pressures')?.content.filter(p => p.startsWith('External Threats')).map((para, i) => <p key={i}>{renderWithLinks(para)}</p>) || null}
                            </div>
                            <div>
                                {faction.wiki.find(a => a.title === 'Resilience')?.content.map((para, i) => <p key={i}>{renderWithLinks(para)}</p>) || null}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default: old tabbed layout for factions without wiki content
    const TABS = [
        { key: 'lore', label: 'Lore', icon: '📖' },
        { key: 'themes', label: 'Themes & Playstyle', icon: '⚔️' },
        { key: 'traits', label: 'Trait Table', icon: '🎲' },
        { key: 'summary', label: 'Summary', icon: '⭐' }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            {/* Gothic background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="max-w-4xl mx-auto p-4 md:p-8 relative z-10">
                {/* Header */}
                <div className="mb-8 md:mb-12 text-center">
                    <div className="relative">
                        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-3 md:mb-4 tracking-wider">
                            ⚔️ {factionName.toUpperCase()} ⚔️
                        </h1>
                        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-amber-400/20 via-orange-500/20 to-red-600/20 blur-xl rounded-full"></div>
                    </div>
                    <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 mx-auto rounded-full shadow-lg shadow-orange-500/50"></div>
                </div>

                {/* Tabs Navigation */}
                <div className="flex justify-center mb-6 md:mb-10">
                    <div className="inline-flex flex-wrap md:flex-nowrap rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg overflow-x-auto w-full md:w-auto">
                        {TABS.map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTab(tab.key)}
                                className={`px-3 md:px-4 lg:px-8 py-2 md:py-3 font-black text-sm md:text-base lg:text-lg tracking-wide flex items-center gap-1 md:gap-2 transition-all duration-200 border-r border-slate-700/40 last:border-r-0
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
                        <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 flex items-center tracking-wide">
                                <span className="text-amber-400 mr-2 md:mr-3">📖</span>
                                LORE
                            </h2>
                            <div className="space-y-3 md:space-y-4 text-slate-300 leading-relaxed">
                                {faction.lore.map((para, i) => (
                                    <p key={i} className="text-sm md:text-base lg:text-lg">{para}</p>
                                ))}
                            </div>
                        </section>
                    )}

                    {activeTab === 'themes' && (
                        <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-6 md:mb-8 flex items-center tracking-wide">
                                <span className="text-orange-400 mr-2 md:mr-3">⚔️</span>
                                THEMES AND PLAYSTYLE
                            </h2>
                            {/* Passive Trait */}
                            <div className="mb-6 md:mb-8 p-3 md:p-4 lg:p-6 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl border-l-4 border-blue-500">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-black text-blue-300 mb-3 md:mb-4 tracking-wide">
                                    {faction.themesAndPlaystyle.passiveTrait.title}
                                </h3>
                                <div className="space-y-2 md:space-y-3">
                                    {faction.themesAndPlaystyle.passiveTrait.description.map((p, i) => (
                                        <p key={i} className="text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">{p}</p>
                                    ))}
                                </div>
                            </div>
                            {/* Leader Trait */}
                            <div className="mb-6 md:mb-8 p-3 md:p-4 lg:p-6 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl border-l-4 border-purple-500">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-black text-purple-300 mb-3 md:mb-4 tracking-wide">
                                    {faction.themesAndPlaystyle.leaderTrait.title}
                                </h3>
                                <p className="text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                                    {faction.themesAndPlaystyle.leaderTrait.description}
                                </p>
                            </div>
                            {/* Tactical Directives */}
                            <div className="p-3 md:p-4 lg:p-6 bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl border-l-4 border-amber-500">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-black text-amber-300 mb-3 md:mb-4 flex items-center tracking-wide">
                                    <span className="mr-2">🎯</span>
                                    TACTICAL DIRECTIVES
                                </h3>
                                <ul className="space-y-2 md:space-y-3">
                                    {faction.themesAndPlaystyle.tacticalDirectives.map((directive, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-amber-400 font-black mr-2 md:mr-3 mt-1">•</span>
                                            <span className="text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">{directive}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </section>
                    )}

                    {activeTab === 'traits' && (
                        <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-6 md:mb-8 flex items-center tracking-wide">
                                <span className="text-red-400 mr-2 md:mr-3">🎲</span>
                                {factionName.toUpperCase()}: FACTION TRAIT TABLE (1D6)
                            </h2>
                            <div className="overflow-x-auto rounded-xl border border-slate-600">
                                <table className="w-full min-w-[300px] md:min-w-[400px] text-xs md:text-sm lg:text-base">
                                    <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
                                        <tr>
                                            <th className="px-2 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 text-left text-white font-black text-sm md:text-base lg:text-lg tracking-wide">ROLL</th>
                                            <th className="px-2 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 text-left text-white font-black text-sm md:text-base lg:text-lg tracking-wide">TRAIT (NAME AND EFFECT)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-600">
                                        {faction.traitTable.map((trait: FactionTrait) => (
                                            <tr key={trait.roll} className="hover:bg-slate-700/50 transition-colors">
                                                <td className="px-2 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4 text-center">
                                                    <span className="inline-flex items-center justify-center w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 bg-gradient-to-r from-red-500 to-red-600 text-white font-black text-xs md:text-sm lg:text-base lg:text-lg rounded-full shadow-lg shadow-red-500/25">
                                                        {trait.roll}
                                                    </span>
                                                </td>
                                                <td className="px-2 md:px-4 lg:px-6 py-2 md:py-3 lg:py-4">
                                                    <div className="space-y-1 md:space-y-2">
                                                        <h4 className="font-black text-slate-200 text-sm md:text-base lg:text-lg tracking-wide">{trait.name}</h4>
                                                        <p className="text-slate-300 leading-relaxed text-xs md:text-sm lg:text-base lg:text-lg">{trait.description}</p>
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
                        <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                            <div className="space-y-4 md:space-y-6 text-slate-300 leading-relaxed">
                                {faction.summary.map((para, i) => (
                                    <p key={i} className="text-sm md:text-base lg:text-lg">{para}</p>
                                ))}
                            </div>
                            <div className="mt-6 md:mt-8 p-3 md:p-4 lg:p-6 bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl border-l-4 border-emerald-500">
                                <h3 className="text-lg md:text-xl lg:text-2xl font-black text-emerald-300 mb-3 md:mb-4 flex items-center tracking-wide">
                                    <span className="mr-2">⭐</span>
                                    IDEAL FOR
                                </h3>
                                <ul className="space-y-2 md:space-y-3">
                                    {faction.playstyleBullets.map((item, i) => (
                                        <li key={i} className="flex items-start">
                                            <span className="text-emerald-400 font-black mr-2 md:mr-3 mt-1">✓</span>
                                            <span className="text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="mt-6 md:mt-8 p-3 md:p-4 lg:p-6 bg-gradient-to-r from-slate-700/50 to-gray-700/50 rounded-xl border-l-4 border-slate-500">
                                <p className="text-slate-300 leading-relaxed italic text-sm md:text-base lg:text-lg">{faction.closingNote}</p>
                            </div>
                        </section>
                    )}

                    {activeTab === 'wiki' && faction.wiki && (
                        <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm mb-8 md:mb-10">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-6 md:mb-8 flex items-center tracking-wide">
                                <span className="text-pink-400 mr-2 md:mr-3">📝</span>
                                {factionName.toUpperCase()}: WIKIPEDIA ARTICLES
                            </h2>
                            <div className="divide-y divide-slate-700">
                                {faction.wiki.map((article, idx) => (
                                    <article key={idx} className="py-6 md:py-8 first:pt-0 last:pb-0">
                                        <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-amber-300 mb-2 md:mb-3 tracking-wide">
                                            {article.title}
                                        </h3>
                                        <div className="space-y-2 md:space-y-3 text-slate-200 text-sm md:text-base lg:text-lg leading-relaxed">
                                            {article.content.map((para, i) => (
                                                <p key={i}>{renderWithLinks(para)}</p>
                                            ))}
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FactionRules;
