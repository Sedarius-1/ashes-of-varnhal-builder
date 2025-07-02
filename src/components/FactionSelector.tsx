import type { Faction } from "../types/faction";

interface Props {
    factions: Faction[];
    selectedFaction: Faction | null;
    setSelectedFaction: (f: Faction | null) => void;
    onAddUnit: () => void;
    isLocked?: boolean;
    lockedFaction?: Faction | null;
}

export default function FactionSelector({ factions, selectedFaction, setSelectedFaction, onAddUnit, isLocked = false, lockedFaction }: Props) {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
            <div className="flex flex-col">
                <label className="block font-black text-amber-400 mb-2 text-sm uppercase tracking-widest">
                    {isLocked ? "🔒 LOCKED FACTION" : "🏰 SELECT FACTION"}
                </label>
                <select
                    className={`border-2 p-3 rounded-xl shadow-lg transition-all duration-200 min-w-[220px] font-medium ${
                        isLocked 
                            ? "border-slate-500 bg-slate-700 text-slate-400 cursor-not-allowed" 
                            : "border-slate-600 bg-slate-800 text-slate-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
                    }`}
                    value={selectedFaction || ""}
                    onChange={(e) => !isLocked && setSelectedFaction(e.target.value as Faction)}
                    disabled={isLocked}
                >
                    <option value="">{isLocked ? `-- ${lockedFaction} (LOCKED) --` : "-- CHOOSE YOUR FACTION --"}</option>
                    {factions.map((f) => (
                        <option key={f} value={f}>{f}</option>
                    ))}
                </select>
                {isLocked && (
                    <p className="text-xs text-slate-400 mt-1 italic">
                        Faction locked. Clear warband to change faction.
                    </p>
                )}
            </div>
            <button
                disabled={!selectedFaction}
                onClick={onAddUnit}
                className={`w-full md:w-auto mt-4 md:mt-0 px-6 py-3 rounded-xl font-black transition-all duration-200 flex items-center gap-2 tracking-wide ${
                    selectedFaction 
                        ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white hover:from-amber-700 hover:to-orange-700 shadow-lg hover:shadow-xl shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-0.5 border border-amber-500/50" 
                        : "bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600"
                }`}
            >
                <span className="text-lg">⚔️</span>
                {isLocked ? "ADD UNIT TO WARBAND" : "ADD UNIT"}
            </button>
        </div>
    );
}
