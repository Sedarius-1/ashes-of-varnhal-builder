import { useState, useEffect, useRef } from 'react';
import {useNavigate } from 'react-router-dom';
import factionsData from '../definitions/factions.json';
import type { FactionData } from '../types/factionData';

interface SearchResult {
    type: 'faction' | 'wiki';
    title: string;
    url: string;
    faction?: string;
}

const Topbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Search through all factions and their wiki articles
    const performSearch = (query: string): SearchResult[] => {
        if (!query.trim()) return [];

        const results: SearchResult[] = [];
        const factions = factionsData as Record<string, FactionData>;
        const lowerQuery = query.toLowerCase();

        Object.entries(factions).forEach(([factionName, faction]) => {
            // Search faction names
            if (factionName.toLowerCase().includes(lowerQuery)) {
                results.push({
                    type: 'faction',
                    title: factionName,
                    url: `/lore/factions/${encodeURIComponent(factionName)}`,
                    faction: factionName
                });
            }

            // Search wiki articles
            if (faction.wiki) {
                faction.wiki.forEach(article => {
                    if (article.title.toLowerCase().includes(lowerQuery)) {
                        results.push({
                            type: 'wiki',
                            title: `${article.title} (${factionName})`,
                            url: `/lore/factions/${encodeURIComponent(factionName)}`,
                            faction: factionName
                        });
                    }
                });
            }
        });

        return results.slice(0, 12); // Limit to 12 results for modal
    };

    useEffect(() => {
        const results = performSearch(searchQuery);
        setSearchResults(results);
    }, [searchQuery]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsSearchModalOpen(false);
                setSearchQuery('');
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    const handleSearchClick = () => {
        setIsSearchModalOpen(true);
        setTimeout(() => {
            searchInputRef.current?.focus();
        }, 100);
    };

    const handleResultClick = (result: SearchResult) => {
        navigate(result.url);
        setSearchQuery('');
        setIsSearchModalOpen(false);
    };

    const closeModal = () => {
        setIsSearchModalOpen(false);
        setSearchQuery('');
    };

    return (
        <>
            <header className="bg-gradient-to-r from-slate-900 via-gray-900 to-black text-amber-200 px-4 md:px-8 py-3 md:py-5 shadow-2xl border-b-2 border-amber-700/40 flex items-center justify-between z-10 relative">
                <div className="flex items-center gap-2 md:gap-4">
                    <span className="text-2xl md:text-3xl drop-shadow-lg">⚔️</span>
                    <h1 className="text-lg md:text-2xl lg:text-3xl font-black uppercase tracking-widest drop-shadow-lg">
                Ashes of Varnhal <span className="text-amber-400">Warband Builder</span>
            </h1>
        </div>
                
                {/* Search Button */}
                <button
                    onClick={handleSearchClick}
                    className="flex items-center gap-2 px-3 md:px-4 py-2 bg-slate-800/80 border border-slate-600 rounded-lg text-slate-200 hover:bg-slate-700/80 transition-colors"
                >
                    <span className="text-slate-400">🔍</span>
                    <span className="hidden md:inline text-sm">Search</span>
                </button>
    </header>

            {/* Search Modal */}
            {isSearchModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center p-4">
                    <div className="bg-slate-900 border border-slate-600 rounded-2xl shadow-2xl w-full max-w-2xl mt-20 md:mt-32 max-h-[80vh] flex flex-col">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-700">
                            <h2 className="text-xl md:text-2xl font-bold text-slate-200">Search Articles</h2>
                            <button
                                onClick={closeModal}
                                className="text-slate-400 hover:text-slate-200 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        {/* Search Input */}
                        <div className="p-4 md:p-6 border-b border-slate-700">
                            <div className="relative">
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Type to search factions and articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-base md:text-lg"
                                />
                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">🔍</span>
                            </div>
                        </div>

                        {/* Search Results */}
                        <div className="flex-1 overflow-y-auto">
                            {searchQuery.trim() === '' ? (
                                <div className="p-4 md:p-6 text-center text-slate-400">
                                    <div className="text-4xl mb-4">🔍</div>
                                    <p className="text-lg">Start typing to search factions and articles</p>
                                </div>
                            ) : searchResults.length === 0 ? (
                                <div className="p-4 md:p-6 text-center text-slate-400">
                                    <div className="text-4xl mb-4">❌</div>
                                    <p className="text-lg">No results found for "{searchQuery}"</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-slate-700">
                                    {searchResults.map((result, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleResultClick(result)}
                                            className="w-full p-4 md:p-6 text-left hover:bg-slate-800 transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="text-slate-200 font-medium text-base md:text-lg mb-1">
                                                        {result.title}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                                            result.type === 'faction' 
                                                                ? 'bg-amber-900/50 text-amber-300 border border-amber-700/50' 
                                                                : 'bg-blue-900/50 text-blue-300 border border-blue-700/50'
                                                        }`}>
                                                            {result.type === 'faction' ? 'Faction' : 'Wiki Article'}
                                                        </span>
                                                        {result.faction && result.type === 'wiki' && (
                                                            <span className="text-slate-400 text-sm">
                                                                from {result.faction}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="text-slate-400 text-2xl">→</span>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 md:p-6 border-t border-slate-700 text-center text-slate-400 text-sm">
                            Press ESC to close
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Topbar;
