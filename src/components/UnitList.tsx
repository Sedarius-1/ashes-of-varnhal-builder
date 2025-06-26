import type { Unit } from "../types/unit";

interface Props {
    units: Unit[];
    selectedUnit: Unit | null;
    onSelectUnit: (unit: Unit) => void;
    onRemoveUnit: (id: string) => void;
    totalPoints: number;
}

export default function UnitList({ units, selectedUnit, onSelectUnit, onRemoveUnit, totalPoints }: Props) {
    return (
        <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 text-white border-b border-slate-600">
                <h2 className="text-2xl font-black flex items-center gap-3 tracking-wide">
                    <span className="text-2xl">⚔️</span>
                    YOUR WARBAND
                </h2>
                <p className="text-slate-300 mt-1 font-medium">Units: {units.length}</p>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[600px] overflow-y-auto">
                {units.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4 text-slate-600">🛡️</div>
                        <h3 className="text-xl font-black text-slate-300 mb-2 tracking-wide">NO UNITS YET</h3>
                        <p className="text-slate-400">Select a faction and add your first unit to begin building your warband.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {units.map((unit) => (
                            <div
                                key={unit.id}
                                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                                    selectedUnit?.id === unit.id 
                                        ? "border-amber-500 bg-gradient-to-r from-amber-900/50 to-orange-900/50 shadow-lg shadow-amber-500/25" 
                                        : "border-slate-600 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-700/50"
                                }`}
                                onClick={() => onSelectUnit(unit)}
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="flex-1">
                                        <h3 className="font-black text-slate-200 text-lg mb-1 tracking-wide">{unit.name}</h3>
                                        <div className="flex items-center gap-2 text-sm text-slate-400">
                                            <span className="px-2 py-1 bg-slate-700 text-slate-300 rounded-full font-bold tracking-wide">
                                                {unit.type}
                                            </span>
                                            <span className="px-2 py-1 bg-amber-900/50 text-amber-300 rounded-full font-black tracking-wide border border-amber-500/50">
                                                {unit.cost} PTS
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onRemoveUnit(unit.id);
                                        }}
                                        className="text-red-400 hover:text-red-300 hover:bg-red-900/50 p-2 rounded-lg transition-colors duration-200"
                                        title="Remove unit"
                                    >
                                        <span className="text-lg">🗑️</span>
                                    </button>
                                </div>
                                
                                {unit.selectedWeapons && unit.selectedWeapons.length > 0 && (
                                    <div className="mt-3 pt-3 border-t border-slate-600">
                                        <div className="text-sm text-slate-400 mb-2 font-bold tracking-wide">⚔️ WEAPONS:</div>
                                        <div className="flex flex-wrap gap-1">
                                            {unit.selectedWeapons.map((weapon, index) => (
                                                <span 
                                                    key={index}
                                                    className="px-2 py-1 bg-orange-900/50 text-orange-300 rounded-md text-xs font-bold tracking-wide border border-orange-500/50"
                                                >
                                                    {weapon.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer with Points Total */}
            {units.length > 0 && (
                <div className="bg-gradient-to-r from-amber-600/90 to-orange-600/90 p-4 border-t border-amber-500/50">
                    <div className="flex items-center justify-between">
                        <span className="font-black text-white tracking-wide">TOTAL POINTS:</span>
                        <span className="text-2xl font-black text-white tracking-wider">{totalPoints}</span>
                    </div>
                </div>
            )}
        </div>
    );
}
