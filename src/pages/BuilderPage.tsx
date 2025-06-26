import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import UnitModal from "../components/UnitModal";
import type { Weapon } from '../types/weapon';
import weaponsJson from '../definitions/weapons.json';
import unitsJson from '../definitions/units.json';
import type { Unit } from "../types/unit";
import type { Faction } from "../types/faction";

import FactionSelector from "../components/FactionSelector";
import UnitList from "../components/UnitList";
import UnitDetails from "../components/UnitDetails";
import SaveWarbandButton from "../components/SaveWarbandButton";
import LoadWarbandButton from "../components/LoadWarbandButton.tsx";

const weaponsData = weaponsJson as Record<Faction, Weapon[]>;
const unitDefs = unitsJson as Record<Faction, Omit<Unit, 'id' | 'cost' | 'selectedWeapons'>[]>;

const factions: Faction[] = [
    "House Kaevaryn",
    "Fangs of the Pale Hunger",
    "House Duresse",
    "Outclan Reclaimers",
];

// Type guard
function isFaction(value: string | null): value is Faction {
    return value !== null && factions.includes(value as Faction);
}

const initialUnits: Unit[] = [];

export default function BuilderPage() {
    const [units, setUnits] = useState<Unit[]>(initialUnits);
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [selectedFaction, setSelectedFaction] = useState<Faction | null>(null);
    const [unitModalOpen, setUnitModalOpen] = useState(false);

    const handleAddUnit = (unitTemplate: Omit<Unit, 'id' | 'cost' | 'selectedWeapons'>) => {
        const newUnit: Unit = {
            ...unitTemplate,
            id: uuidv4(),
            selectedWeapons: [],
            cost: unitTemplate.baseCost,
        };
        setUnits((prev) => [...prev, newUnit]);
    };

    const handleRemoveUnit = (id: string) => {
        setUnits((prev) => prev.filter((u) => u.id !== id));
        if (selectedUnit?.id === id) setSelectedUnit(null);
    };

    const handleSelectUnit = (unit: Unit) => {
        setSelectedUnit(unit);
        if (isFaction(unit.faction)) {
            setSelectedFaction(unit.faction);
        } else {
            setSelectedFaction(null);
        }
    };

    const totalPoints = units.reduce((sum, u) => sum + u.cost, 0);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            {/* Gothic background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="max-w-7xl mx-auto p-8 relative z-10">
                {/* Header Section */}
                <div className="mb-12 text-center">
                    <div className="relative">
                        <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-4 tracking-wider">
                            ⚔️ ASHES OF VARNHAL ⚔️
                        </h1>
                        <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-amber-400/20 via-orange-500/20 to-red-600/20 blur-xl rounded-full"></div>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-300 mb-4 tracking-wide">
                        WARBAND BUILDER
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                        Forge your warband from the ashes of a fallen world. Choose your faction, assemble your units, and prepare for battle in the ruins of civilization.
                    </p>
                    <div className="w-48 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 mx-auto rounded-full mt-8 shadow-lg shadow-orange-500/50"></div>
                </div>

                {/* Control Panel */}
                <div className="mb-8 bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
                    <div className="flex flex-wrap items-center gap-6 justify-between">
                        <div className="flex items-center gap-6">
                            <FactionSelector
                                factions={factions}
                                selectedFaction={selectedFaction}
                                setSelectedFaction={setSelectedFaction}
                                onAddUnit={() => setUnitModalOpen(true)}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <SaveWarbandButton units={units} />
                            <LoadWarbandButton onLoad={(loadedUnits) => setUnits(loadedUnits)} />
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Unit List Panel */}
                    <div className="lg:col-span-1">
                        <UnitList
                            units={units}
                            selectedUnit={selectedUnit}
                            onSelectUnit={handleSelectUnit}
                            onRemoveUnit={handleRemoveUnit}
                            totalPoints={totalPoints}
                        />
                    </div>

                    {/* Unit Details Panel */}
                    <div className="lg:col-span-2">
                        {selectedUnit && isFaction(selectedUnit.faction) ? (
                            <UnitDetails
                                unit={selectedUnit}
                                weapons={weaponsData[selectedUnit.faction]}
                                onUpdateUnit={(updatedUnit) => {
                                    setSelectedUnit(updatedUnit);
                                    setUnits((prev) => prev.map(u => u.id === updatedUnit.id ? updatedUnit : u));
                                }}
                            />
                        ) : (
                            <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-12 border border-slate-700/50 backdrop-blur-sm text-center">
                                <div className="text-8xl mb-6 text-slate-600">⚔️</div>
                                <h3 className="text-3xl font-bold text-slate-300 mb-4 tracking-wide">SELECT A UNIT</h3>
                                <p className="text-slate-400 max-w-md mx-auto leading-relaxed">
                                    Choose a unit from your warband to view and edit its details, weapons, and abilities. Forge your fighting force with precision.
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Points Summary */}
                {units.length > 0 && (
                    <div className="mt-8 bg-gradient-to-r from-amber-600/90 via-orange-600/90 to-red-600/90 rounded-2xl shadow-2xl p-6 border border-amber-500/50 backdrop-blur-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="text-4xl">⚡</div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-wide">WARBAND SUMMARY</h3>
                                    <p className="text-amber-100">Your assembled fighting force</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-5xl font-black text-white tracking-wider">{totalPoints}</div>
                                <div className="text-amber-100 font-semibold tracking-wide">TOTAL POINTS</div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Unit Modal */}
            {unitModalOpen && selectedFaction && (
                <UnitModal
                    faction={selectedFaction}
                    units={unitDefs[selectedFaction]}
                    onClose={() => setUnitModalOpen(false)}
                    onAddUnit={handleAddUnit}
                />
            )}
        </div>
    );
}
