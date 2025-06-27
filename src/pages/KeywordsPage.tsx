import React, { useState, useEffect } from 'react';
import { downloadKeywordsPDF } from '../utils/pdfGenerator';
import critEffectsData from '../definitions/critEffects.json';

interface WeaponAbility {
    name: string;
    description: string;
}

const KeywordsPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [weaponAbilities, setWeaponAbilities] = useState<WeaponAbility[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Convert the JSON object to array format
        const abilitiesArray: WeaponAbility[] = Object.entries(critEffectsData).map(([name, description]) => ({
            name,
            description: description as string
        }));
        
        setWeaponAbilities(abilitiesArray);
        setLoading(false);
    }, []);

    const filteredAbilities = weaponAbilities.filter(ability =>
        ability.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ability.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleDownloadPDF = () => {
        downloadKeywordsPDF(weaponAbilities);
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
                        <div className="text-6xl mb-6 text-purple-400 animate-pulse">⚔️</div>
                        <h3 className="text-2xl font-bold text-slate-300 mb-2">Loading Weapon Abilities...</h3>
                        <p className="text-slate-400">Preparing the arsenal of knowledge</p>
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
                        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-rose-600 mb-4 tracking-wider">
                            📚 GLOSSARY 📚
                        </h1>
                        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-purple-400/20 via-pink-500/20 to-rose-600/20 blur-xl rounded-full"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-300 mb-4 tracking-wide">
                        WEAPON ABILITIES
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Master the arcane properties and devastating effects of weapons in the Ashes of Varnhal universe.
                    </p>
                    <div className="w-48 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-rose-600 mx-auto rounded-full mt-8 shadow-lg shadow-purple-500/50"></div>
                </div>

                {/* Search and Download Controls */}
                <div className="mb-8 bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                        {/* Search Input */}
                        <div className="flex-1 w-full md:w-auto">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="text-purple-400 text-xl">🔍</span>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search weapon abilities..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-700/60 border border-slate-600/40 rounded-xl text-slate-200 placeholder-slate-400 font-semibold tracking-wide focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/60 transition-all duration-200 text-base md:text-lg"
                                />
                            </div>
                        </div>
                        
                        {/* Download Button */}
                        <button
                            onClick={handleDownloadPDF}
                            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-black text-lg tracking-wide rounded-xl shadow-lg shadow-purple-500/25 border border-purple-500/40 transition-all duration-200 hover:shadow-xl hover:shadow-purple-500/40 flex items-center gap-3 justify-center"
                        >
                            <span className="text-2xl">📄</span>
                            Download PDF
                        </button>
                    </div>
                    
                    {/* Results Count */}
                    <div className="mt-4 text-center">
                        <p className="text-slate-400 font-semibold text-sm md:text-base">
                            Showing {filteredAbilities.length} of {weaponAbilities.length} abilities
                        </p>
                    </div>
                </div>

                {/* Weapon Abilities Glossary */}
                <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm">
                    {filteredAbilities.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4 text-slate-600">🔍</div>
                            <h3 className="text-2xl font-bold text-slate-300 mb-2">No Results Found</h3>
                            <p className="text-slate-400">Try adjusting your search terms to find weapon abilities.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2">
                            {filteredAbilities.map((ability, index) => (
                                <div key={index} className="bg-gradient-to-r from-slate-700/50 to-slate-800/50 rounded-xl p-4 md:p-6 border border-slate-600/40 hover:border-purple-500/60 transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/20">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/25">
                                            <span className="text-white font-black text-lg">⚔️</span>
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-lg md:text-2xl font-black text-purple-300 mb-3 tracking-wide border-b border-purple-500/30 pb-2 break-words whitespace-normal">
                                                {ability.name}
                                            </h3>
                                            <p className="text-slate-300 leading-relaxed text-base md:text-lg break-words whitespace-normal">
                                                {ability.description}
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
                            "In the hands of a skilled warrior, even the simplest weapon becomes a tool of legend."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KeywordsPage; 