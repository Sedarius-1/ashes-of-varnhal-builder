import type {Unit} from "../types/unit";
import type {Weapon} from "../types/weapon";
import critEffectsJson from '../definitions/critEffects.json';
import {useEffect, useState} from "react";

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
    
    // Collapsible section states
    const [showStats, setShowStats] = useState(false);
    const [showAbilities, setShowAbilities] = useState(false);
    const [showWeapons, setShowWeapons] = useState(false);
    const [showSelectedWeapons, setShowSelectedWeapons] = useState(false);
    const [showWeaponAbilities, setShowWeaponAbilities] = useState(false);
    const [showCritEffects, setShowCritEffects] = useState(false);
    const [showPowers, setShowPowers] = useState(false);

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
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl border border-blue-500/50 mb-2">
                    <button
                        className="w-full flex items-center justify-between p-6 font-black text-xl text-slate-200 tracking-wide focus:outline-none"
                        onClick={() => setShowStats(s => !s)}
                        aria-expanded={showStats}
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-blue-400">📊</span>
                            UNIT STATISTICS
                        </span>
                        <span className={`transition-transform duration-200 ${showStats ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showStats && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 pt-0">
                            {Object.entries(unit.stats).map(([stat, value]) => (
                                <div key={stat} className="text-center p-3 bg-slate-800/50 rounded-lg shadow-lg border border-blue-500/30">
                                    <div className="text-sm text-slate-400 font-black mb-1 tracking-wide">
                                        {stat.charAt(0).toUpperCase() + stat.slice(1).toUpperCase()}
                                    </div>
                                    <div className="text-2xl font-black text-blue-400 tracking-wider">{value}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Abilities */}
                {unit.abilities && unit.abilities.length > 0 && (
                    <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl border border-purple-500/50 mb-2">
                        <button
                            className="w-full flex items-center justify-between p-6 font-black text-xl text-slate-200 tracking-wide focus:outline-none"
                            onClick={() => setShowAbilities(s => !s)}
                            aria-expanded={showAbilities}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-purple-400">✨</span>
                                ABILITIES
                            </span>
                            <span className={`transition-transform duration-200 ${showAbilities ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {showAbilities && (
                            <div className="space-y-3 p-6 pt-0">
                                {unit.abilities.map((ability) => (
                                    <div key={ability.name} className="bg-slate-800/50 p-4 rounded-lg shadow-lg border border-purple-500/30">
                                        <h4 className="font-black text-purple-300 mb-2 tracking-wide">{ability.name.toUpperCase()}</h4>
                                        <p className="text-slate-300 leading-relaxed">{ability.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Weapon Selection */}
                <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl border border-amber-500/50 mb-2">
                    <button
                        className="w-full flex items-center justify-between p-6 font-black text-xl text-slate-200 tracking-wide focus:outline-none"
                        onClick={() => setShowWeapons(s => !s)}
                        aria-expanded={showWeapons}
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-amber-400">⚔️</span>
                            SELECT WEAPONS
                        </span>
                        <span className={`transition-transform duration-200 ${showWeapons ? 'rotate-180' : ''}`}>▼</span>
                    </button>
                    {showWeapons && (
                        <div className="grid gap-3 p-6 pt-0">
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
                    )}
                </div>

                {/* Selected Weapons Table */}
                {unit.selectedWeapons.length > 0 && (
                    <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl border border-emerald-500/50 mb-2">
                        <button
                            className="w-full flex items-center justify-between p-6 font-black text-xl text-slate-200 tracking-wide focus:outline-none"
                            onClick={() => setShowSelectedWeapons(s => !s)}
                            aria-expanded={showSelectedWeapons}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-emerald-400">🛡️</span>
                                SELECTED WEAPONS
                            </span>
                            <span className={`transition-transform duration-200 ${showSelectedWeapons ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {showSelectedWeapons && (
                            <div className="p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {unit.selectedWeapons.map((weapon) => (
                                    <div key={weapon.name} className="bg-gradient-to-r from-emerald-800/60 to-teal-800/60 rounded-lg shadow-lg border border-emerald-500/30 p-4 flex flex-col items-center text-center">
                                        <div className="font-black text-slate-200 text-base md:text-lg tracking-wide mb-2">{weapon.name.toUpperCase()}</div>
                                        <div className="grid grid-cols-2 gap-2 w-full text-xs md:text-sm">
                                            <div className="font-bold text-emerald-300 col-span-1">Range</div>
                                            <div className="text-slate-200 col-span-1">{weapon.range}</div>
                                            <div className="font-bold text-emerald-300 col-span-1">Dice</div>
                                            <div className="text-slate-200 col-span-1">{weapon.dice}</div>
                                            <div className="font-bold text-emerald-300 col-span-1">Crit Dmg</div>
                                            <div className="text-slate-200 col-span-1">{weapon.critDmg}</div>
                                            <div className="font-bold text-emerald-300 col-span-1">Cost</div>
                                            <div className="text-emerald-400 font-black col-span-1">{weapon.cost} PTS</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Weapon Abilities and Effects */}
                {unit.selectedWeapons.length > 0 && (
                    <div className="space-y-6">
                        {/* Abilities */}
                        <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 rounded-xl border border-blue-500/50 mb-2">
                            <button
                                className="w-full flex items-center justify-between p-6 font-black text-xl text-slate-200 tracking-wide focus:outline-none"
                                onClick={() => setShowWeaponAbilities(s => !s)}
                                aria-expanded={showWeaponAbilities}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-blue-400">⚡</span>
                                    WEAPON ABILITIES
                                </span>
                                <span className={`transition-transform duration-200 ${showWeaponAbilities ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {showWeaponAbilities && (
                                <div className="space-y-4 p-6 pt-0">
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
                            )}
                        </div>

                        {/* Critical Effects */}
                        <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl border border-red-500/50 mb-2">
                            <button
                                className="w-full flex items-center justify-between p-6 font-black text-xl text-slate-200 tracking-wide focus:outline-none"
                                onClick={() => setShowCritEffects(s => !s)}
                                aria-expanded={showCritEffects}
                            >
                                <span className="flex items-center gap-2">
                                    <span className="text-red-400">💥</span>
                                    CRITICAL EFFECTS
                                </span>
                                <span className={`transition-transform duration-200 ${showCritEffects ? 'rotate-180' : ''}`}>▼</span>
                            </button>
                            {showCritEffects && (
                                <div className="space-y-4 p-6 pt-0">
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
                            )}
                        </div>
                    </div>
                )}

                {/* Powers */}
                {unit.powers && unit.powers?.length > 0 && (
                    <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl border border-indigo-500/50 mb-2">
                        <button
                            className="w-full flex items-center justify-between p-6 font-black text-xl text-slate-200 tracking-wide focus:outline-none"
                            onClick={() => setShowPowers(s => !s)}
                            aria-expanded={showPowers}
                        >
                            <span className="flex items-center gap-2">
                                <span className="text-indigo-400">🔮</span>
                                POWERS
                            </span>
                            <span className={`transition-transform duration-200 ${showPowers ? 'rotate-180' : ''}`}>▼</span>
                        </button>
                        {showPowers && (
                            <div className="space-y-4 p-6 pt-0">
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
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
