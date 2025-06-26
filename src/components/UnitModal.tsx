import { v4 as uuidv4 } from "uuid";
import type { Faction } from "../types/faction";
import type { Unit } from "../types/unit";

export default function UnitModal({
                                      faction,
                                      units,
                                      onClose,
                                      onAddUnit,
                                  }: {
    faction: Faction | null;
    units: Omit<Unit, "id" | "selectedWeapons" | "cost">[];
    onClose: () => void;
    onAddUnit: (unit: Unit) => void;
}) {
    if (!faction) return null;

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="unit-modal-title"
        >
            <div
                className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 rounded-t-2xl text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">⚔️</span>
                            <div>
                                <h2 id="unit-modal-title" className="text-2xl font-bold">
                                    Add Unit to Your Warband
                                </h2>
                                <p className="text-slate-300 mt-1">Faction: {faction}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-slate-300 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
                            aria-label="Close modal"
                        >
                            <span className="text-2xl">×</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {units.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4">🤔</div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">No Units Available</h3>
                            <p className="text-slate-500">This faction doesn't have any units defined yet.</p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {units.map((unitTemplate) => (
                                <div
                                    key={`${unitTemplate.name}-${unitTemplate.type}`}
                                    className="p-4 border-2 border-slate-200 rounded-xl hover:border-blue-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 cursor-pointer transition-all duration-200 group"
                                    onClick={() => {
                                        const unit: Unit = {
                                            ...unitTemplate,
                                            id: uuidv4(),
                                            faction,
                                            selectedWeapons: [],
                                            cost: unitTemplate.baseCost,
                                        };
                                        onAddUnit(unit);
                                        onClose();
                                    }}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-blue-700 transition-colors">
                                                {unitTemplate.name}
                                            </h3>
                                            <div className="flex items-center gap-3 mb-3">
                                                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full font-medium text-sm">
                                                    {unitTemplate.type}
                                                </span>
                                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-bold text-sm">
                                                    {unitTemplate.baseCost} pts
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            ➕
                                        </div>
                                    </div>

                                    {/* Unit Stats */}
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Move:</span>
                                                <span className="font-semibold text-slate-800">{unitTemplate.stats.move}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Defense:</span>
                                                <span className="font-semibold text-slate-800">{unitTemplate.stats.defense}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Morale:</span>
                                                <span className="font-semibold text-slate-800">{unitTemplate.stats.morale}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Vigor:</span>
                                                <span className="font-semibold text-slate-800">{unitTemplate.stats.vigor}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Actions:</span>
                                                <span className="font-semibold text-slate-800">{unitTemplate.stats.actions}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-slate-600">Power:</span>
                                                <span className="font-semibold text-slate-800">{unitTemplate.stats.power}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Abilities */}
                                    {unitTemplate.abilities && unitTemplate.abilities.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-slate-200">
                                            <div className="text-sm text-slate-600 mb-2 font-medium">✨ Abilities:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {unitTemplate.abilities.map((ability, index) => (
                                                    <div key={index} className="relative">
                                                        <span 
                                                            className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-medium cursor-help hover:bg-purple-200 transition-colors duration-200"
                                                            onMouseEnter={(e) => {
                                                                if (ability.description) {
                                                                    const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                                                                    if (tooltip) tooltip.style.opacity = '1';
                                                                }
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (ability.description) {
                                                                    const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                                                                    if (tooltip) tooltip.style.opacity = '0';
                                                                }
                                                            }}
                                                        >
                                                            {ability.name}
                                                        </span>
                                                        {ability.description && (
                                                            <div className="absolute bottom-full mb-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-lg opacity-0 transition-opacity duration-200 pointer-events-none z-10 max-w-xs">
                                                                {ability.description}
                                                                <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Powers */}
                                    {unitTemplate.powers && unitTemplate.powers.length > 0 && (
                                        <div className="mt-4 pt-4 border-t border-slate-200">
                                            <div className="text-sm text-slate-600 mb-2 font-medium">🔮 Powers:</div>
                                            <div className="flex flex-wrap gap-2">
                                                {unitTemplate.powers.map((power, index) => (
                                                    <div key={index} className="relative">
                                                        <span 
                                                            className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs font-medium cursor-help hover:bg-indigo-200 transition-colors duration-200"
                                                            onMouseEnter={(e) => {
                                                                if (power.baseEffect) {
                                                                    const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                                                                    if (tooltip) tooltip.style.opacity = '1';
                                                                }
                                                            }}
                                                            onMouseLeave={(e) => {
                                                                if (power.baseEffect) {
                                                                    const tooltip = e.currentTarget.nextElementSibling as HTMLElement;
                                                                    if (tooltip) tooltip.style.opacity = '0';
                                                                }
                                                            }}
                                                        >
                                                            {power.name}
                                                        </span>
                                                        {power.baseEffect && (
                                                            <div className="absolute bottom-full mb-2 px-3 py-2 bg-slate-800 text-white text-sm rounded-lg shadow-lg opacity-0 transition-opacity duration-200 pointer-events-none z-10 max-w-xs">
                                                                {power.baseEffect}
                                                                <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
                    <div className="flex items-center justify-between">
                        <p className="text-slate-600 text-sm">
                            {units.length} unit{units.length !== 1 ? 's' : ''} available
                        </p>
                        <button
                            onClick={onClose}
                            className="px-6 py-2 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors duration-200 font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
