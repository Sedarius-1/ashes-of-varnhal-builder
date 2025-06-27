import React, { useState, useEffect } from 'react';
import { downloadFateCardsPDF } from '../utils/pdfGenerator';
import fateCardsData from '../definitions/fateCards.json';

interface FateCard {
    name: string;
    effect: string;
}

const FateCardsListPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [fateCards, setFateCards] = useState<FateCard[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Convert the JSON object to array format
        const cardsArray: FateCard[] = Object.entries(fateCardsData).map(([name, effect]) => ({
            name,
            effect: effect as string
        }));
        
        setFateCards(cardsArray);
        setLoading(false);
    }, []);

    const filteredCards = fateCards.filter(card =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.effect.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDownloadPDF = () => {
        downloadFateCardsPDF(fateCards);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                    }}></div>
                </div>

                <div className="max-w-6xl mx-auto p-8 relative z-10">
                    <div className="text-center py-20">
                        <div className="text-6xl mb-6 text-rose-400 animate-pulse">🎴</div>
                        <h3 className="text-2xl font-bold text-slate-300 mb-2">Loading Fate Cards...</h3>
                        <p className="text-slate-400">Shuffling the deck of destiny</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            {/* Gothic background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="max-w-6xl mx-auto p-8 relative z-10">
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="relative">
                        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 mb-4 tracking-wider">
                            🎴 FATE CARDS 🎴
                        </h1>
                        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-rose-400/20 via-pink-500/20 to-purple-600/20 blur-xl rounded-full"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-300 mb-4 tracking-wide">
                        COMPLETE CARD LIST
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Unpredictable pulses of ash-born memory and machine echoes that warp the battlefield.
                    </p>
                    <div className="w-48 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 mx-auto rounded-full mt-8 shadow-lg shadow-rose-500/50"></div>
                </div>

                {/* Search and Download Controls */}
                <div className="mb-8 bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        {/* Search Input */}
                        <div className="flex-1 w-full md:w-auto">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-rose-400 text-xl">🔍</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search fate cards..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-700/60 border border-slate-600/40 rounded-xl text-slate-200 placeholder-slate-400 font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/60 transition-all duration-200 text-base md:text-lg"
                                />
                            </div>
                        </div>
                        
                        {/* Download Button */}
                        <button
                            onClick={handleDownloadPDF}
                            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white font-black text-lg tracking-wide rounded-xl shadow-lg shadow-rose-500/25 border border-rose-500/40 transition-all duration-200 hover:shadow-xl hover:shadow-rose-500/40 flex items-center gap-3 justify-center"
                        >
                            <span className="text-2xl">📄</span>
                            Download PDF
                        </button>
                    </div>
                    
                    {/* Results Count */}
                    <div className="mt-4 text-center">
                        <p className="text-slate-400 font-semibold text-sm md:text-base">
                            Showing {filteredCards.length} of {fateCards.length} cards
                        </p>
                    </div>
                </div>

                {/* Fate Cards List */}
                <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm">
                    {filteredCards.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4 text-slate-600">🔍</div>
                            <h3 className="text-2xl font-bold text-slate-300 mb-2">No Results Found</h3>
                            <p className="text-slate-400">Try adjusting your search terms to find fate cards.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
                            {filteredCards.map((card, index) => (
                                <div key={index} className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-xl p-4 md:p-6 border border-slate-600/40 hover:border-rose-500/60 transition-all duration-200 hover:shadow-lg hover:shadow-rose-500/20">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-rose-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/25">
                                            <span className="text-white font-black text-lg">🎴</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-2xl font-black text-rose-300 mb-3 tracking-wide border-b border-rose-500/30 pb-2 break-words whitespace-normal">
                                                {card.name}
                                            </h3>
                                            <p className="text-slate-300 leading-relaxed text-base md:text-lg break-words whitespace-normal">
                                                {card.effect}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer Note */}
                <div className="mt-8 text-center">
                    <div className="inline-block bg-gradient-to-r from-slate-700/50 to-gray-700/50 rounded-xl p-4 border border-slate-600/40">
                        <p className="text-slate-400 italic text-lg">
                            "The cards of fate are ever-shifting, their power fleeting but their impact eternal."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FateCardsListPage; 