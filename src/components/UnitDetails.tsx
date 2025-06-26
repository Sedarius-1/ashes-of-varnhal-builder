import type {Unit} from "../types/unit";
import type {Weapon} from "../types/weapon";
import critEffectsJson from '../definitions/critEffects.json';
import {useEffect} from "react";

const critEffectDescriptions: Record<string, string> = critEffectsJson;

interface Props {
    unit: Unit;
    weapons: Weapon[];
    onUpdateUnit: (updatedUnit: Unit) => void;
}

// Helper function to find the best matching crit effect
function findCritEffectDescription(abilityName: string): string {
    // Remove numbers, brackets, plus signs, and extra spaces from the ability name
    const cleanName = abilityName
        .replace(/\d+/g, '') // Remove all numbers
        .replace(/\+/g, '') // Remove plus signs
        .replace(/\[.*?\]/g, '') // Remove anything in brackets
        .replace(/\s+/g, ' ') // Normalize spaces
        .trim();
    
    // Try exact match first
    if (critEffectDescriptions[cleanName]) {
        return critEffectDescriptions[cleanName];
    }
    
    // Try matching with "X" suffix (for effects like "Pinning X")
    const withX = cleanName + ' X';
    if (critEffectDescriptions[withX]) {
        return critEffectDescriptions[withX];
    }
    
    // Try matching without "X" suffix
    const withoutX = cleanName.replace(/\s+X$/, '');
    if (critEffectDescriptions[withoutX]) {
        return critEffectDescriptions[withoutX];
    }
    
    // Try partial matching (for cases like "Crackling Heat X" vs "Crackling Heat")
    const partialMatch = Object.keys(critEffectDescriptions).find(key => 
        key.toLowerCase().includes(cleanName.toLowerCase()) || 
        cleanName.toLowerCase().includes(key.toLowerCase())
    );
    
    if (partialMatch) {
        return critEffectDescriptions[partialMatch];
    }
    
    return "No description available.";
}

export default function UnitDetails({unit, weapons, onUpdateUnit}: Props) {
    useEffect(() => {
        const hasMelee = unit.selectedWeapons.some(w => w.name === "Melee Weapon");
        if (!hasMelee) {
            const meleeWeapon = weapons.find(w => w.name === "Melee Weapon");
            if (meleeWeapon) {
                onUpdateUnit({
                    ...unit,
                    selectedWeapons: [...unit.selectedWeapons, meleeWeapon],
                    cost: unit.baseCost + unit.selectedWeapons.reduce((sum, w) => sum + w.cost, 0) + meleeWeapon.cost,
                });
            }
        }
    }, [unit, weapons, onUpdateUnit]); // Run once on mount
    
    const handleWeaponToggle = (weapon: Weapon) => {
        if (weapon.name === "Melee Weapon") {
            // Prevent toggling off the default Melee Weapon
            return;
        }
        const isSelected = unit.selectedWeapons.some(w => w.name === weapon.name);
        let newSelectedWeapons;

        if (isSelected) {
            newSelectedWeapons = unit.selectedWeapons.filter(w => w.name !== weapon.name);
        } else {
            newSelectedWeapons = [...unit.selectedWeapons, weapon];
        }

        const newCost = unit.baseCost + newSelectedWeapons.reduce((sum, w) => sum + w.cost, 0);

        onUpdateUnit({
            ...unit,
            selectedWeapons: newSelectedWeapons,
            cost: newCost,
        });
    };

    return (
        <div className="bg-gradient-to-b from-slate-800/90 to-slate-900/90 rounded-2xl shadow-2xl border border-slate-700/50 overflow-hidden backdrop-blur-sm">
            {/* Header */}
            <div className="bg-gradient-to-r from-slate-700 to-slate-800 p-6 text-white border-b border-slate-600">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-black mb-2 tracking-wide">{unit.name.toUpperCase()}</h2>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-slate-600 text-white rounded-full font-black text-sm tracking-wide">
                                {unit.type.toUpperCase()}
                            </span>
                            <span className="px-3 py-1 bg-amber-900/50 text-amber-300 rounded-full font-black text-sm tracking-wide border border-amber-500/50">
                                {unit.cost} PTS
                            </span>
                        </div>
                    </div>
                    <div className="text-4xl">⚔️</div>
                </div>
            </div>

            <div className="p-6 space-y-6">
                {/* Unit Stats */}
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border border-blue-500/50">
                    <h3 className="text-xl font-black text-slate-200 mb-4 flex items-center gap-2 tracking-wide">
                        <span className="text-blue-400">📊</span>
                        UNIT STATISTICS
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(unit.stats).map(([stat, value]) => (
                            <div key={stat} className="text-center p-3 bg-slate-800/50 rounded-lg shadow-lg border border-blue-500/30">
                                <div className="text-sm text-slate-400 font-black mb-1 tracking-wide">
                                    {stat.charAt(0).toUpperCase() + stat.slice(1).toUpperCase()}
                                </div>
                                <div className="text-2xl font-black text-blue-400 tracking-wider">{value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Abilities */}
                {unit.abilities && unit.abilities.length > 0 && (
                    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border border-purple-500/50">
                        <h3 className="text-xl font-black text-slate-200 mb-4 flex items-center gap-2 tracking-wide">
                            <span className="text-purple-400">✨</span>
                            ABILITIES
                        </h3>
                        <div className="space-y-3">
                            {unit.abilities.map((ability) => (
                                <div key={ability.name} className="bg-slate-800/50 p-4 rounded-lg shadow-lg border border-purple-500/30">
                                    <h4 className="font-black text-purple-300 mb-2 tracking-wide">{ability.name.toUpperCase()}</h4>
                                    <p className="text-slate-300 leading-relaxed">{ability.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Weapon Selection */}
                <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border border-amber-500/50">
                    <h3 className="text-xl font-black text-slate-200 mb-4 flex items-center gap-2 tracking-wide">
                        <span className="text-amber-400">⚔️</span>
                        SELECT WEAPONS
                    </h3>
                    <div className="grid gap-3">
                        {weapons
                            .filter(w => w.allowedFor === "all" || (w.allowedFor === "elite" && unit.type === "Elite"))
                            .map((weapon) => {
                            const isMeleeDefault = weapon.name === "Melee Weapon";
                            const isSelected = unit.selectedWeapons.some(w => w.name === weapon.name);
                            return (
                                <label key={weapon.name} className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                                    isSelected 
                                        ? 'border-amber-500 bg-amber-900/50 shadow-lg shadow-amber-500/25' 
                                        : 'border-slate-600 hover:border-slate-500 bg-slate-800/50 hover:bg-slate-700/50'
                                }`}>
                                    <input
                                        type="checkbox"
                                        checked={isSelected}
                                        onChange={() => handleWeaponToggle(weapon)}
                                        disabled={isMeleeDefault}
                                        className="mr-3 w-4 h-4 text-amber-500 border-amber-500 rounded focus:ring-amber-500/50 bg-slate-700"
                                    />
                                    <div className="flex-1">
                                        <div className="font-black text-slate-200 tracking-wide">{weapon.name.toUpperCase()}</div>
                                        <div className="text-sm text-slate-400 font-medium">
                                            RANGE: {weapon.range} | DICE: {weapon.dice} | COST: {weapon.cost} PTS
                                        </div>
                                    </div>
                                    {isMeleeDefault && (
                                        <span className="text-xs text-amber-400 bg-amber-900/50 px-2 py-1 rounded-full font-black tracking-wide border border-amber-500/50">
                                            DEFAULT
                                        </span>
                                    )}
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* Selected Weapons Table */}
                {unit.selectedWeapons.length > 0 && (
                    <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border border-emerald-500/50">
                        <h3 className="text-xl font-black text-slate-200 mb-4 flex items-center gap-2 tracking-wide">
                            <span className="text-emerald-400">🛡️</span>
                            SELECTED WEAPONS
                        </h3>
                        <div className="overflow-hidden rounded-lg border border-emerald-500/30">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-emerald-700 to-teal-700">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-white font-black tracking-wide">NAME</th>
                                        <th className="px-4 py-3 text-center text-white font-black tracking-wide">RANGE</th>
                                        <th className="px-4 py-3 text-center text-white font-black tracking-wide">DICE</th>
                                        <th className="px-4 py-3 text-center text-white font-black tracking-wide">CRIT DMG</th>
                                        <th className="px-4 py-3 text-center text-white font-black tracking-wide">COST</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-emerald-600">
                                    {unit.selectedWeapons.map((weapon) => (
                                        <tr key={weapon.name} className="hover:bg-emerald-800/30 transition-colors">
                                            <td className="px-4 py-3 font-black text-slate-200 tracking-wide">{weapon.name.toUpperCase()}</td>
                                            <td className="px-4 py-3 text-center text-slate-300">{weapon.range}</td>
                                            <td className="px-4 py-3 text-center text-slate-300">{weapon.dice}</td>
                                            <td className="px-4 py-3 text-center text-slate-300">{weapon.critDmg}</td>
                                            <td className="px-4 py-3 text-center font-black text-emerald-400 tracking-wide">{weapon.cost} PTS</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Weapon Abilities and Effects */}
                {unit.selectedWeapons.length > 0 && (
                    <div className="space-y-6">
                        {/* Abilities */}
                        <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-xl p-6 border border-blue-500/50">
                            <h3 className="text-xl font-black text-slate-200 mb-4 flex items-center gap-2 tracking-wide">
                                <span className="text-blue-400">⚡</span>
                                WEAPON ABILITIES
                            </h3>
                            <div className="space-y-4">
                                {unit.selectedWeapons.map((weapon) => {
                                    const weaponAbilities = weapon.abilities || [];
                                    const uniqueAbilities = [...new Set(
                                        weaponAbilities.filter(a => a && a.trim() !== "")
                                    )];
                                    
                                    if (uniqueAbilities.length === 0) return null;
                                    
                                    return (
                                        <div key={weapon.name} className="bg-slate-800/50 p-4 rounded-lg shadow-lg border border-blue-500/30">
                                            <h4 className="font-black text-blue-300 mb-3 flex items-center gap-2 tracking-wide">
                                                <span className="text-blue-400">⚔️</span>
                                                {weapon.name.toUpperCase()}
                                            </h4>
                                            <div className="space-y-2">
                                                {uniqueAbilities.map((abilityName) => (
                                                    <div key={abilityName} className="pl-4 border-l-2 border-blue-500/50">
                                                        <h5 className="font-black text-slate-200 mb-1 tracking-wide">{abilityName.toUpperCase()}</h5>
                                                        <p className="text-slate-300 text-sm">{findCritEffectDescription(abilityName)}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Critical Effects */}
                        <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl p-6 border border-red-500/50">
                            <h3 className="text-xl font-black text-slate-200 mb-4 flex items-center gap-2 tracking-wide">
                                <span className="text-red-400">💥</span>
                                CRITICAL EFFECTS
                            </h3>
                            <div className="space-y-4">
                                {unit.selectedWeapons.map((weapon) => {
                                    if (!weapon.critEffect || weapon.critEffect.trim() === "") return null;
                                    
                                    return (
                                        <div key={weapon.name} className="bg-slate-800/50 p-4 rounded-lg shadow-lg border border-red-500/30">
                                            <h4 className="font-black text-red-300 mb-3 flex items-center gap-2 tracking-wide">
                                                <span className="text-red-400">⚔️</span>
                                                {weapon.name.toUpperCase()}
                                            </h4>
                                            <div className="pl-4 border-l-2 border-red-500/50">
                                                <h5 className="font-black text-slate-200 mb-1 tracking-wide">{weapon.critEffect.toUpperCase()}</h5>
                                                <p className="text-slate-300 text-sm">{findCritEffectDescription(weapon.critEffect)}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {/* Powers */}
                {unit.powers && unit.powers?.length > 0 && (
                    <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-6 border border-indigo-500/50">
                        <h3 className="text-xl font-black text-slate-200 mb-4 flex items-center gap-2 tracking-wide">
                            <span className="text-indigo-400">🔮</span>
                            POWERS
                        </h3>
                        <div className="space-y-4">
                            {unit.powers.map((power, index) => (
                                <div key={index} className="bg-slate-800/50 p-6 rounded-lg shadow-lg border border-indigo-500/30">
                                    <h4 className="text-xl font-black text-indigo-300 mb-3 tracking-wide">{power.name.toUpperCase()}</h4>
                                    <p className="italic text-indigo-400 mb-4 text-sm">{power.flavor}</p>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <h5 className="font-black text-slate-200 mb-2 tracking-wide">BASE EFFECT</h5>
                                            <p className="text-slate-300 bg-slate-700/50 p-3 rounded-lg">{power.baseEffect}</p>
                                        </div>
                                        
                                        <div>
                                            <h5 className="font-black text-slate-200 mb-2 tracking-wide">OVERDRIVE</h5>
                                            <ul className="space-y-2">
                                                {power.overdrive.map((line, i) => (
                                                    <li key={i} className="flex items-start">
                                                        <span className="text-indigo-400 font-black mr-2 mt-1">•</span>
                                                        <span className="text-slate-300">{line}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        
                                        <div className="bg-red-900/50 p-4 rounded-lg border border-red-500/50">
                                            <h5 className="font-black text-red-300 mb-2 tracking-wide">CRITICAL FAIL</h5>
                                            <p className="text-red-200">{power.critFail}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
