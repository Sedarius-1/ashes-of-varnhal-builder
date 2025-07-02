import { useState, useEffect, useRef } from 'react';
import type { Warband } from '../types/warband';
import type { Unit } from '../types/unit';
import type { Faction } from '../types/faction';
import type { Weapon } from '../types/weapon';
import unitsJson from '../definitions/units.json';
import weaponsJson from '../definitions/weapons.json';

const INJURY_TABLE = [
  { roll: '4–6', result: 'Dead', effect: 'The unit is permanently removed from the roster.' },
  { roll: '7–10', result: 'Crippled', effect: 'The unit survives but suffers a permanent stat penalty (–1 to Move, Defense, or Vigor, your choice).' },
  { roll: '11–13', result: 'Trauma', effect: 'The unit survives but begins the next game with –1 Morale and –1 Wound.' },
  { roll: '14–17', result: 'Lingering Wound', effect: 'Misses next battle. No permanent penalty.' },
  { roll: '18–20', result: 'Wounded', effect: 'Begins next game with –1 Wound.' },
  { roll: '21–22', result: 'Shaken', effect: 'No physical harm, but loses 1 XP.' },
  { roll: '23–24', result: 'Close Call', effect: 'No effect.' },
  { roll: '25+', result: 'Steeled by Fire', effect: 'Gains +1 XP and may reroll one stat advancement in future.' },
];

const SALVAGE_TABLE = [
  { roll: '4–6', sp: 3, result: 'Mostly scrap and damaged gear.' },
  { roll: '7–10', sp: 4, result: 'Minimal returns.' },
  { roll: '11–13', sp: 5, result: 'Usable salvage.' },
  { roll: '14–17', sp: 6, result: 'Functional tech fragments.' },
  { roll: '18–20', sp: 7, result: 'Intact cores and frames.' },
  { roll: '21–22', sp: 8, result: 'Rare salvage. Gain +1 XP on one unit of your choice.' },
  { roll: '23–24', sp: 10, result: 'Exceptional find. Gain +1 XP and unlock a reroll during next postgame.' },
  { roll: '25+', sp: 12, result: 'Major breakthrough. You may also choose 1 basic weapon upgrade for free.' },
];

const LEVEL_UP_TABLE = [
  { roll: 4, result: 'Unexpected Instinct', effect: '+1 Move (max 8\'\')' },
  { roll: 5, result: 'Veteran of Dust', effect: '+1 Morale (max 7)' },
  { roll: 6, result: 'Tireless Engine', effect: '+1 Vigour (max 6)' },
  { roll: 7, result: 'Sharpened Edge', effect: '+1 to Melee Attack Dice (once per activation)' },
  { roll: 8, result: 'Honed Reflexes', effect: '+1 Defense (max 5)' },
  { roll: 9, result: 'Tracker\'s Intuition', effect: 'Gains Ignore Cover when Shooting' },
  { roll: 10, result: 'Hardened Resolve', effect: '+1 Resolve (max 4)' },
  { roll: 11, result: 'Quickdraw', effect: 'May draw Line of Sight through 1 terrain piece per round' },
  { roll: 12, result: 'Deadeye', effect: 'Ranged Critical hits deal +1 extra damage' },
  { roll: 13, result: 'Grizzled Veteran', effect: 'Ignore the Wounds inflicted by first attack suffered each game' },
  { roll: 14, result: 'Adaptive Reflexes', effect: 'Gains "Dodge" as a free action once per game' },
  { roll: 15, result: 'Heavy Step', effect: 'Melee Attacks made after moving deal +1 damage' },
  { roll: 16, result: 'Iron Will', effect: 'Gains reroll on failed Morale tests' },
  { roll: 17, result: 'Weapon Mastery', effect: 'May equip one additional weapon (up to 3 max)' },
  { roll: 18, result: 'Battle Scars', effect: 'Gains a permanent +1 Action on Round 1 only' },
  { roll: 19, result: 'Overcharger', effect: 'If unit has Power stat > 0, gain +1 Power, else reroll' },
  { roll: 20, result: 'Resilient Core', effect: 'The first time reduced to 0 Wounds, survive with 1 instead' },
  { roll: 21, result: 'Augmented Targeting', effect: 'Ranged attacks ignore penalties from Obscured targets' },
  { roll: 22, result: 'Aggression Protocol', effect: 'Gains +1 Attack die when charging' },
  { roll: 23, result: 'Staggering Impact', effect: 'Melee Crits now inflict Stun' },
  { roll: 24, result: 'Legend in Ash', effect: 'Gain a faction-specific Trait (or reroll if not yet implemented)' },
];

export default function CampaignsPage() {
  
  // Campaign tracking state
  const [campaignWarbands, setCampaignWarbands] = useState<Warband[]>([]);
  const [selectedWarbandIndex, setSelectedWarbandIndex] = useState<number>(-1);
  const [showAddWarbandModal, setShowAddWarbandModal] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpUnitIndex, setLevelUpUnitIndex] = useState<number>(-1);
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);
  const [showGameModal, setShowGameModal] = useState(false);
  const [selectedWarbandForGame, setSelectedWarbandForGame] = useState<number>(-1);
  const [showWeaponModal, setShowWeaponModal] = useState(false);
  const [selectedUnitForWeapons, setSelectedUnitForWeapons] = useState<{warbandIndex: number, unitIndex: number} | null>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showXPModal, setShowXPModal] = useState(false);
  const [selectedUnitForXP, setSelectedUnitForXP] = useState<{warbandIndex: number, unitIndex: number} | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Unit definitions from the builder
  const unitDefs = unitsJson as any as Record<Faction, Omit<Unit, 'id' | 'cost' | 'selectedWeapons'>[]>;
  const weaponsData = weaponsJson as any as Record<Faction, Weapon[]>;

  // Load campaign data from localStorage on component mount
  useEffect(() => {
    const savedCampaigns = localStorage.getItem('campaignWarbands');
    if (savedCampaigns) {
      try {
        setCampaignWarbands(JSON.parse(savedCampaigns));
      } catch (error) {
        console.error('Failed to load campaign data:', error);
      }
    }
  }, []);

  // Save campaign data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('campaignWarbands', JSON.stringify(campaignWarbands));
  }, [campaignWarbands]);

  // Helper functions
  const calculateLevel = (xp: number): number => {
    return Math.floor(xp / 10);
  };

  const canLevelUp = (xp: number, abilitiesCount: number): boolean => {
    if (xp < 7) return false;
    const level = calculateLevel(xp);
    const maxAbilitiesForLevel = Math.floor(level / 2) + 1;
    return abilitiesCount < maxAbilitiesForLevel;
  };

  const isUnitDead = (unit: Unit): boolean => {
    return !!(unit.injuries && Array.isArray(unit.injuries) && unit.injuries.includes('Dead'));
  };

  const isUnitDisabled = (unit: Unit): boolean => {
    return isUnitDead(unit);
  };

  const addUnitToWarband = (warbandIndex: number, unit: Unit) => {
    const newWarbands = [...campaignWarbands];
    const warband = newWarbands[warbandIndex];
    const unitCost = unit.cost || unit.baseCost || 0;
    
    if (warband.cp && warband.cp >= unitCost) {
      warband.units.push({
        ...unit,
        xp: 0,
        level: 0,
        injuries: [],
        levelUpAbilities: []
      });
      warband.cp -= unitCost;
      setCampaignWarbands(newWarbands);
      return true;
    }
    return false;
  };

  const removeUnitFromWarband = (warbandIndex: number, unitIndex: number) => {
    const newWarbands = [...campaignWarbands];
    const warband = newWarbands[warbandIndex];
    const unit = warband.units[unitIndex];
    const unitCost = unit.cost || unit.baseCost || 0;
    
    warband.units.splice(unitIndex, 1);
    warband.cp = (warband.cp || 0) + unitCost;
    setCampaignWarbands(newWarbands);
  };

  const importWarband = (data: any, warbandName?: string) => {
    // Check if this is a full warband with campaign data or just units from builder
    if (data.name && data.units && Array.isArray(data.units)) {
      // This is a full warband with campaign data - import as-is
      setCampaignWarbands([...campaignWarbands, data]);
    } else if (Array.isArray(data)) {
      // This is an array of units from the builder - convert to warband format
      const totalCost = data.reduce((sum, unit) => sum + (unit.cost || unit.baseCost || 0), 0);
      const newWarband: Warband = {
        name: warbandName || 'Imported Warband',
        faction: data[0]?.faction || null,
        units: data.map(unit => ({
          ...unit,
          xp: 0,
          level: 1,
          injuries: [],
          levelUpAbilities: []
        })),
        cp: Math.max(0, 500 - totalCost), // Start with 500 CP, minimum 0
        salvagePoints: 0
      };
      setCampaignWarbands([...campaignWarbands, newWarband]);
    } else {
      alert('Invalid file format: expected a warband object or array of units.');
    }
  };

  const addGameResult = (warbandIndex: number, salvagePoints: number, salvageRoll: string, salvageResult: string, gameNotes: string) => {
    const newWarbands = [...campaignWarbands];
    const warband = newWarbands[warbandIndex];
    warband.salvagePoints = (warband.salvagePoints || 0) + salvagePoints;
    warband.cp = (warband.cp !== undefined ? warband.cp : 500) + (salvagePoints * 10); // 1 SP = 10 CP
    
    // Add to game history
    if (!warband.gameHistory) warband.gameHistory = [];
    const gameNumber = warband.gameHistory.length + 1;
    const gameResult = {
      gameNumber,
      date: new Date().toLocaleDateString(),
      salvagePoints,
      salvageRoll,
      salvageResult,
      notes: gameNotes
    };
    warband.gameHistory.push(gameResult);
    
    if (!warband.campaignNotes) warband.campaignNotes = '';
    warband.campaignNotes += `\nGame ${gameNumber}: +${salvagePoints} SP (${salvagePoints * 10} CP) - ${gameNotes}`;
    setCampaignWarbands(newWarbands);
  };

  const setUnitAsLeader = (warbandIndex: number, unitIndex: number) => {
    const newWarbands = [...campaignWarbands];
    const warband = newWarbands[warbandIndex];
    const unit = warband.units[unitIndex];
    
    // Dead units cannot be leaders
    if (isUnitDead(unit)) {
      alert('Dead units cannot be set as leaders!');
      return;
    }
    
    // Only Elite units can be leaders
    if (unit.type !== 'Elite') {
      alert('Only Elite units can be set as leaders!');
      return;
    }
    
    // Remove leader status from all units in this warband
    warband.units.forEach(unit => unit.isLeader = false);
    
    // Set the selected unit as leader
    unit.isLeader = true;
    setCampaignWarbands(newWarbands);
  };

  const addWeaponToUnit = (warbandIndex: number, unitIndex: number, weapon: Weapon) => {
    const newWarbands = [...campaignWarbands];
    const warband = newWarbands[warbandIndex];
    const unit = warband.units[unitIndex];
    
    // Dead units cannot have weapons added
    if (isUnitDead(unit)) {
      alert('Dead units cannot have weapons added!');
      return false;
    }
    
    // Check if we have enough CP
    if ((warband.cp !== undefined ? warband.cp : 500) >= weapon.cost) {
      unit.selectedWeapons.push(weapon);
      unit.cost = (unit.cost || unit.baseCost || 0) + weapon.cost;
      warband.cp = (warband.cp !== undefined ? warband.cp : 500) - weapon.cost;
      setCampaignWarbands(newWarbands);
      return true;
    }
    return false;
  };

  const removeWeaponFromUnit = (warbandIndex: number, unitIndex: number, weaponIndex: number) => {
    const newWarbands = [...campaignWarbands];
    const warband = newWarbands[warbandIndex];
    const unit = warband.units[unitIndex];
    const weapon = unit.selectedWeapons[weaponIndex];
    
    // Don't allow removing the default melee weapon
    if (weapon.name === "Melee Weapon") {
      return false;
    }
    
    unit.selectedWeapons.splice(weaponIndex, 1);
    unit.cost = (unit.cost || unit.baseCost || 0) - weapon.cost;
    warband.cp = (warband.cp || 0) + weapon.cost;
    setCampaignWarbands(newWarbands);
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Gothic background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="max-w-7xl mx-auto p-8 relative z-10">
        <div className="mb-12 text-center">
          <div className="relative">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 mb-4 tracking-wider">
              🏰 Campaign Tracker
            </h1>
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-indigo-400/20 blur-xl rounded-full"></div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 mx-auto rounded-full shadow-lg shadow-violet-500/50"></div>
        </div>

        {/* Only show the tracker content, no tabs */}
        <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
          <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
            <span className="text-violet-400 mr-3">🎯</span>
            Warband Tracker
          </h2>
          
          {/* Warband Selection */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl font-black text-slate-200">Campaign Warbands</h3>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowImportModal(true)}
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200"
                >
                  📥 Import
                </button>
                <button
                  onClick={() => setShowGameModal(true)}
                  className="px-4 py-3 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-black rounded-xl shadow-lg hover:from-amber-700 hover:to-orange-800 transition-all duration-200"
                >
                  🎲 Add Game Result
                </button>

                <button
                  onClick={() => setShowAddWarbandModal(true)}
                  className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-black rounded-xl shadow-lg hover:from-violet-700 hover:to-purple-800 transition-all duration-200"
                >
                  + Add Warband
                </button>
                <button
                  onClick={() => {
                    if (selectedWarbandIndex >= 0 && campaignWarbands[selectedWarbandIndex]) {
                      const warband = campaignWarbands[selectedWarbandIndex];
                      const dataStr = JSON.stringify(warband, null, 2);
                      const blob = new Blob([dataStr], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `${warband.name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    } else if (campaignWarbands.length > 0) {
                      alert("Please select a warband to export!");
                    } else {
                      alert("No warbands to export!");
                    }
                  }}
                  disabled={campaignWarbands.length === 0}
                  className={`px-4 py-3 font-black rounded-xl shadow-lg transition-all duration-200 ${
                    campaignWarbands.length > 0 && selectedWarbandIndex >= 0
                      ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  💾 Export Warband
                </button>
              </div>
            </div>
            
            {campaignWarbands.length === 0 ? (
              <div className="text-center py-12 bg-slate-800/60 rounded-xl border border-slate-600">
                <p className="text-slate-400 text-lg mb-4">No warbands in campaign yet</p>
                <p className="text-slate-500">Add a warband to start tracking your campaign progress</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaignWarbands.map((warband, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedWarbandIndex(index)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedWarbandIndex === index
                        ? 'border-violet-500 bg-violet-900/20'
                        : 'border-slate-600 bg-slate-800/60 hover:border-slate-500 hover:bg-slate-700/60'
                    }`}
                  >
                    <h4 className="font-black text-slate-200 mb-2">{warband.name}</h4>
                    <p className="text-slate-400 text-sm">{warband.faction}</p>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-slate-400">Units: {warband.units.length}</span>
                      <span className="text-violet-400">CP: {warband.cp !== undefined ? warband.cp : 500}</span>
                    </div>
                    <div className="mt-1 flex justify-between text-sm">
                      <span className="text-slate-400">Games: {warband.gameHistory?.length || 0}</span>
                      <span className="text-emerald-400">SP: {warband.salvagePoints || 0}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected Warband Details */}
          {selectedWarbandIndex >= 0 && campaignWarbands[selectedWarbandIndex] && (
            <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-600">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-black text-slate-200">
                  {campaignWarbands[selectedWarbandIndex].name}
                </h3>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-black text-violet-400">
                      {campaignWarbands[selectedWarbandIndex].cp !== undefined ? campaignWarbands[selectedWarbandIndex].cp : 500}
                    </div>
                    <div className="text-sm text-slate-400">Creation Points</div>
                    <button
                      onClick={() => {
                        const newWarbands = [...campaignWarbands];
                        const currentCP = newWarbands[selectedWarbandIndex].cp !== undefined ? newWarbands[selectedWarbandIndex].cp : 500;
                        const newCP = prompt('Enter new Creation Points value:', currentCP.toString());
                        if (newCP !== null) {
                          const cpValue = parseInt(newCP) || 0;
                          newWarbands[selectedWarbandIndex].cp = cpValue;
                          setCampaignWarbands(newWarbands);
                        }
                      }}
                      className="text-xs text-violet-400 hover:text-violet-300 mt-1"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-amber-400">
                      {campaignWarbands[selectedWarbandIndex].salvagePoints || 0}
                    </div>
                    <div className="text-sm text-slate-400">Salvage Points</div>
                    <button
                      onClick={() => {
                        const newWarbands = [...campaignWarbands];
                        const currentSP = newWarbands[selectedWarbandIndex].salvagePoints || 0;
                        const newSP = prompt('Enter new Salvage Points value:', currentSP.toString());
                        if (newSP !== null) {
                          const spValue = parseInt(newSP) || 0;
                          newWarbands[selectedWarbandIndex].salvagePoints = spValue;
                          setCampaignWarbands(newWarbands);
                        }
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 mt-1"
                    >
                      Edit
                    </button>
                  </div>
                  <button
                    onClick={() => setShowAddUnitModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black rounded-lg hover:from-emerald-700 hover:to-teal-800 transition-all duration-200"
                  >
                    + Add Unit
                  </button>
                </div>
              </div>

              {/* Units Table */}
              <div className="overflow-hidden rounded-xl border border-slate-600">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-white font-black">Unit</th>
                      <th className="px-4 py-3 text-left text-white font-black">Cost</th>
                      <th className="px-4 py-3 text-left text-white font-black">XP</th>
                      <th className="px-4 py-3 text-left text-white font-black">Level</th>
                      <th className="px-4 py-3 text-left text-white font-black">Injury</th>
                      <th className="px-4 py-3 text-left text-white font-black">Abilities</th>
                      <th className="px-4 py-3 text-left text-white font-black">Leader</th>
                      <th className="px-4 py-3 text-left text-white font-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {campaignWarbands[selectedWarbandIndex].units.map((unit, unitIndex) => (
                      <tr key={unitIndex} className="hover:bg-slate-700/50 transition-colors">
                        <td className="px-4 py-3">
                          <div>
                            <button
                              onClick={() => {
                                setLevelUpUnitIndex(unitIndex);
                                setShowLevelUpModal(true);
                              }}
                              className="font-black text-slate-200 hover:text-violet-300 transition-colors duration-200 text-left"
                            >
                              {unit.name}
                            </button>
                            <div className="text-sm text-slate-400">{unit.type}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-black text-emerald-400">
                            {unit.cost || unit.baseCost || 0}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className="font-black text-violet-400">
                              {unit.xp || 0}
                            </span>
                            <button
                              onClick={() => {
                                setSelectedUnitForXP({warbandIndex: selectedWarbandIndex, unitIndex: unitIndex});
                                setShowXPModal(true);
                              }}
                              disabled={isUnitDisabled(unit)}
                              className={`px-2 py-1 font-black text-xs rounded transition-all duration-200 ${
                                isUnitDisabled(unit)
                                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-700 hover:to-purple-800'
                              }`}
                            >
                              Add XP
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-black text-violet-400">
                            {calculateLevel(unit.xp || 0)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-2">
                            <div className="flex gap-2">
                              <div className="relative group">
                                <select
                                  onChange={(e) => {
                                    if (e.target.value) {
                                      const newWarbands = [...campaignWarbands];
                                      const unit = newWarbands[selectedWarbandIndex].units[unitIndex];
                                      if (!unit.injuries) unit.injuries = [];
                                      unit.injuries.push(e.target.value);
                                      
                                      // If unit is dead, remove leader status
                                      if (e.target.value === 'Dead' && unit.isLeader) {
                                        unit.isLeader = false;
                                      }
                                      
                                      setCampaignWarbands(newWarbands);
                                      e.target.value = '';
                                    }
                                  }}
                                  className="px-3 py-1 bg-slate-700 border border-slate-600 rounded text-slate-200 text-sm cursor-pointer"
                                >
                                  <option value="">Add Injury</option>
                                  {INJURY_TABLE.map((injury, i) => (
                                    <option key={i} value={injury.result}>
                                      {injury.result}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                            {unit.injuries && unit.injuries.length > 0 && (
                              <div className="space-y-1">
                                {unit.injuries.map((injury, i) => {
                                  const injuryEffect = INJURY_TABLE.find(inj => inj.result === injury)?.effect || 'Effect not found';
                                  return (
                                    <div key={i} className="flex items-center gap-2 text-sm group relative">
                                      <span 
                                        className="text-red-400 font-black cursor-help"
                                        title={injuryEffect}
                                      >
                                        {injury}
                                      </span>
                                      <button
                                        onClick={() => {
                                          const newWarbands = [...campaignWarbands];
                                          newWarbands[selectedWarbandIndex].units[unitIndex].injuries?.splice(i, 1);
                                          setCampaignWarbands(newWarbands);
                                        }}
                                        className="text-red-500 hover:text-red-300 text-xs"
                                      >
                                        ×
                                      </button>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-sm text-slate-300">
                            {unit.levelUpAbilities && unit.levelUpAbilities.length > 0 ? (
                              <div className="space-y-1">
                                {unit.levelUpAbilities.map((ability, i) => {
                                  const abilityEffect = LEVEL_UP_TABLE.find(a => a.result === ability)?.effect || 'Effect not found';
                                  return (
                                    <div key={i} className="text-violet-400 font-black cursor-help group relative" title={abilityEffect}>
                                      {ability}
                                      {/* Tooltip */}
                                      <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-slate-900 text-slate-200 text-xs rounded-lg shadow-lg border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 max-w-xs">
                                        <div className="font-black text-violet-400 mb-1">{ability}</div>
                                        <div className="text-slate-300">{abilityEffect}</div>
                                        <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-900"></div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            ) : (
                              <span className="text-slate-500">None</span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => setUnitAsLeader(selectedWarbandIndex, unitIndex)}
                            disabled={unit.type !== 'Elite' || isUnitDisabled(unit)}
                            className={`px-3 py-1 font-black text-sm rounded transition-all duration-200 ${
                              unit.isLeader
                                ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white'
                                : unit.type === 'Elite' && !isUnitDisabled(unit)
                                  ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                                  : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            }`}
                          >
                            {unit.isLeader ? '👑 Leader' : unit.type === 'Elite' && !isUnitDisabled(unit) ? 'Set Leader' : isUnitDisabled(unit) ? 'Dead' : 'Elite Only'}
                          </button>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedUnitForWeapons({warbandIndex: selectedWarbandIndex, unitIndex: unitIndex});
                                setShowWeaponModal(true);
                              }}
                              disabled={isUnitDisabled(unit)}
                              className={`px-3 py-1 font-black text-sm rounded transition-all duration-200 ${
                                isUnitDisabled(unit)
                                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800'
                              }`}
                            >
                              Weapons
                            </button>
                            <button
                              onClick={() => {
                                setLevelUpUnitIndex(unitIndex);
                                setShowLevelUpModal(true);
                              }}
                              disabled={!canLevelUp(unit.xp || 0, unit.levelUpAbilities?.length || 0) || isUnitDisabled(unit)}
                              className={`px-3 py-1 font-black text-sm rounded transition-all duration-200 ${
                                canLevelUp(unit.xp || 0, unit.levelUpAbilities?.length || 0) && !isUnitDisabled(unit)
                                  ? 'bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-700 hover:to-purple-800'
                                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                              }`}
                            >
                              Level Up
                            </button>
                            <button
                              onClick={() => removeUnitFromWarband(selectedWarbandIndex, unitIndex)}
                              className="px-3 py-1 bg-gradient-to-r from-red-600 to-pink-700 text-white font-black text-sm rounded hover:from-red-700 hover:to-pink-800 transition-all duration-200"
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Game History */}
              {campaignWarbands[selectedWarbandIndex].gameHistory && campaignWarbands[selectedWarbandIndex].gameHistory!.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-xl font-black text-slate-200 mb-4">Game History</h4>
                  <div className="overflow-hidden rounded-xl border border-slate-600">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
                        <tr>
                          <th className="px-4 py-3 text-left text-white font-black">Game</th>
                          <th className="px-4 py-3 text-left text-white font-black">Date</th>
                          <th className="px-4 py-3 text-left text-white font-black">Roll</th>
                          <th className="px-4 py-3 text-left text-white font-black">SP</th>
                          <th className="px-4 py-3 text-left text-white font-black">Result</th>
                          <th className="px-4 py-3 text-left text-white font-black">Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-600">
                        {campaignWarbands[selectedWarbandIndex].gameHistory!.map((game, index) => (
                          <tr key={index} className="hover:bg-slate-700/50 transition-colors">
                            <td className="px-4 py-3">
                              <span className="font-black text-violet-400">#{game.gameNumber}</span>
                            </td>
                            <td className="px-4 py-3 text-slate-300">{game.date}</td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm rounded-full">
                                {game.salvageRoll}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="font-black text-emerald-400">+{game.salvagePoints} SP</span>
                            </td>
                            <td className="px-4 py-3 text-slate-300 text-sm">{game.salvageResult}</td>
                            <td className="px-4 py-3 text-slate-400 text-sm">{game.notes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Add Warband Modal */}
        {showAddWarbandModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-600">
              <h3 className="text-2xl font-black text-slate-200 mb-6">Add Warband to Campaign</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 font-black mb-2">Warband Name</label>
                  <input
                    type="text"
                    placeholder="Enter warband name"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200"
                    id="warband-name"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-black mb-2">Starting CP</label>
                  <input
                    type="number"
                    defaultValue={500}
                    min="0"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200"
                    id="warband-cp"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      const name = (document.getElementById('warband-name') as HTMLInputElement).value;
                      const cp = parseInt((document.getElementById('warband-cp') as HTMLInputElement).value) || 500;
                      if (name.trim()) {
                        const newWarband: Warband = {
                          name: name.trim(),
                          faction: null,
                          units: [],
                          cp: cp
                        };
                        setCampaignWarbands([...campaignWarbands, newWarband]);
                        setShowAddWarbandModal(false);
                      }
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-black rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all duration-200"
                  >
                    Add Warband
                  </button>
                  <button
                    onClick={() => setShowAddWarbandModal(false)}
                    className="flex-1 px-6 py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Unit Modal */}
        {showAddUnitModal && selectedWarbandIndex >= 0 && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-slate-600 max-h-[80vh] overflow-y-auto">
              <h3 className="text-2xl font-black text-slate-200 mb-6">Add Unit to Warband</h3>
              <div className="space-y-6">
                {/* Faction Display */}
                <div>
                  <label className="block text-slate-300 font-black mb-2">Warband Faction</label>
                  <div className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200">
                    {campaignWarbands[selectedWarbandIndex].faction || 'No faction selected'}
                  </div>
                </div>

                {/* Unit Selection */}
                {campaignWarbands[selectedWarbandIndex].faction && (
                  <div>
                    <label className="block text-slate-300 font-black mb-4">Select Unit</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                      {unitDefs[campaignWarbands[selectedWarbandIndex].faction!]?.map((unitTemplate: any, index: number) => (
                        <div
                          key={index}
                          onClick={() => {
                            const newUnit: Unit = {
                              ...unitTemplate,
                              id: Date.now().toString() + index,
                              selectedWeapons: [],
                              cost: unitTemplate.baseCost,
                              xp: 0,
                              level: 0,
                              injuries: [],
                              levelUpAbilities: []
                            };
                            if (addUnitToWarband(selectedWarbandIndex, newUnit)) {
                              setShowAddUnitModal(false);
                            } else {
                              alert('Not enough CP to add this unit!');
                            }
                          }}
                          className="p-4 bg-slate-700 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-600 transition-all duration-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-black text-slate-200">{unitTemplate.name}</h4>
                            <span className="text-emerald-400 font-black">{unitTemplate.baseCost} CP</span>
                          </div>
                          <p className="text-slate-400 text-sm mb-2">{unitTemplate.type}</p>
                          <div className="text-xs text-slate-500">
                            <div>Move: {unitTemplate.stats.move} | Defense: {unitTemplate.stats.defense} | Vigor: {unitTemplate.stats.vigor}</div>
                            <div>Actions: {unitTemplate.stats.actions} | Resolve: {unitTemplate.stats.resolve} | Morale: {unitTemplate.stats.morale}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => {
                      setShowAddUnitModal(false);
                    }}
                    className="px-6 py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unified Import Modal */}
        {showImportModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-600">
              <h3 className="text-2xl font-black text-slate-200 mb-6">Import Warband</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 font-black mb-2">Warband Name</label>
                  <input
                    type="text"
                    placeholder="Enter warband name"
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200"
                    id="import-warband-name"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-black mb-2">Warband JSON File</label>
                  <p className="text-xs text-slate-400 mb-2">
                    Supports both builder exports (units array) and campaign exports (full warband with injuries, XP, etc.)
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          try {
                            const content = reader.result as string;
                            const data = JSON.parse(content);
                            const name = (document.getElementById('import-warband-name') as HTMLInputElement)?.value || 'Imported Warband';
                            importWarband(data, name);
                            setShowImportModal(false);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                          } catch (err) {
                            alert('Could not parse file. Make sure it\'s valid JSON.');
                          }
                        };
                        reader.readAsText(file);
                      }
                    }}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setShowImportModal(false)}
                    className="flex-1 px-6 py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Game Result Modal */}
        {showGameModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-600">
              <h3 className="text-2xl font-black text-slate-200 mb-6">Add Game Result</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-slate-300 font-black mb-2">Select Warband</label>
                  <select
                    onChange={(e) => setSelectedWarbandForGame(parseInt(e.target.value))}
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200"
                  >
                    <option value="">Choose a warband...</option>
                    {campaignWarbands.map((warband, index) => (
                      <option key={index} value={index}>
                        {warband.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-black mb-2">Salvage Roll Result</label>
                  <select
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200"
                    id="game-salvage-roll"
                  >
                    <option value="">Select salvage roll result...</option>
                    {SALVAGE_TABLE.map((entry, index) => (
                      <option key={index} value={entry.roll}>
                        {entry.roll} - {entry.sp} SP: {entry.result}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-slate-400 mt-1">1 SP = 10 CP</p>
                </div>

                <div>
                  <label className="block text-slate-300 font-black mb-2">Game Notes</label>
                  <textarea
                    placeholder="Brief description of the game..."
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 h-20"
                    id="game-notes"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                                              if (selectedWarbandForGame >= 0) {
                          const salvageRollSelect = document.getElementById('game-salvage-roll') as HTMLSelectElement;
                          const selectedRoll = salvageRollSelect.value;
                          let salvagePoints = 0;
                          let salvageResult = '';
                          
                          if (selectedRoll) {
                            const salvageEntry = SALVAGE_TABLE.find(entry => entry.roll === selectedRoll);
                            if (salvageEntry) {
                              salvagePoints = salvageEntry.sp;
                              salvageResult = salvageEntry.result;
                            }
                          }
                          
                          const gameNotes = (document.getElementById('game-notes') as HTMLTextAreaElement).value || 'Game completed';
                          addGameResult(selectedWarbandForGame, salvagePoints, salvageResult, 'Manual Entry', gameNotes);
                        setShowGameModal(false);
                        setSelectedWarbandForGame(-1);
                      }
                    }}
                    disabled={selectedWarbandForGame < 0}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-black rounded-lg hover:from-amber-700 hover:to-orange-800 transition-all duration-200 disabled:bg-slate-700 disabled:text-slate-400"
                  >
                    Add Game Result
                  </button>
                  <button
                    onClick={() => {
                      setShowGameModal(false);
                      setSelectedWarbandForGame(-1);
                    }}
                    className="flex-1 px-6 py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* XP Modal */}
        {showXPModal && selectedUnitForXP && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-600">
              <h3 className="text-2xl font-black text-slate-200 mb-6">
                Add XP: {campaignWarbands[selectedUnitForXP.warbandIndex].units[selectedUnitForXP.unitIndex].name}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-slate-300 font-black">
                    <input
                      type="checkbox"
                      id="downed-leader"
                      className="w-4 h-4 text-violet-600 bg-slate-700 border-slate-600 rounded focus:ring-violet-500"
                    />
                    Downed enemy leader
                  </label>
                  <span className="text-violet-400 font-black">+1 XP</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-slate-300 font-black">
                    <span>Downed enemy units:</span>
                    <input
                      type="number"
                      min="0"
                      defaultValue="0"
                      id="downed-units"
                      className="w-16 px-2 py-1 bg-slate-700 border border-slate-600 rounded text-slate-200 text-center"
                    />
                  </label>
                  <span className="text-violet-400 font-black">×1 XP each</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-slate-300 font-black">
                    <input
                      type="checkbox"
                      id="survived"
                      className="w-4 h-4 text-violet-600 bg-slate-700 border-slate-600 rounded focus:ring-violet-500"
                    />
                    Survived the battle
                  </label>
                  <span className="text-violet-400 font-black">+1 XP</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-slate-300 font-black">
                    <input
                      type="checkbox"
                      id="objective"
                      className="w-4 h-4 text-violet-600 bg-slate-700 border-slate-600 rounded focus:ring-violet-500"
                    />
                    Finished objective
                  </label>
                  <span className="text-violet-400 font-black">+2 XP</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-slate-300 font-black">
                    <input
                      type="checkbox"
                      id="won"
                      className="w-4 h-4 text-violet-600 bg-slate-700 border-slate-600 rounded focus:ring-violet-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          const lostCheckbox = document.getElementById('lost') as HTMLInputElement;
                          if (lostCheckbox) lostCheckbox.checked = false;
                        }
                      }}
                    />
                    Won
                  </label>
                  <span className="text-violet-400 font-black">+2 XP</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-slate-300 font-black">
                    <input
                      type="checkbox"
                      id="lost"
                      className="w-4 h-4 text-violet-600 bg-slate-700 border-slate-600 rounded focus:ring-violet-500"
                      onChange={(e) => {
                        if (e.target.checked) {
                          const wonCheckbox = document.getElementById('won') as HTMLInputElement;
                          if (wonCheckbox) wonCheckbox.checked = false;
                        }
                      }}
                    />
                    Lost
                  </label>
                  <span className="text-violet-400 font-black">+1 XP</span>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      const downedLeader = (document.getElementById('downed-leader') as HTMLInputElement)?.checked || false;
                      const downedUnits = parseInt((document.getElementById('downed-units') as HTMLInputElement)?.value || '0') || 0;
                      const survived = (document.getElementById('survived') as HTMLInputElement)?.checked || false;
                      const objective = (document.getElementById('objective') as HTMLInputElement)?.checked || false;
                      const won = (document.getElementById('won') as HTMLInputElement)?.checked || false;
                      const lost = (document.getElementById('lost') as HTMLInputElement)?.checked || false;
                      
                      let totalXP = 0;
                      if (downedLeader) totalXP += 1;
                      totalXP += downedUnits;
                      if (survived) totalXP += 1;
                      if (objective) totalXP += 2;
                      if (won) totalXP += 2;
                      if (lost) totalXP += 1;
                      
                      const newWarbands = [...campaignWarbands];
                      const unit = newWarbands[selectedUnitForXP.warbandIndex].units[selectedUnitForXP.unitIndex];
                      unit.xp = (unit.xp || 0) + totalXP;
                      setCampaignWarbands(newWarbands);
                      setShowXPModal(false);
                      setSelectedUnitForXP(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-black rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all duration-200"
                  >
                    Add XP
                  </button>
                  <button
                    onClick={() => {
                      setShowXPModal(false);
                      setSelectedUnitForXP(null);
                    }}
                    className="flex-1 px-6 py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Weapon Management Modal */}
        {showWeaponModal && selectedUnitForWeapons && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full mx-4 border border-slate-600 max-h-[80vh] overflow-y-auto">
              <h3 className="text-2xl font-black text-slate-200 mb-6">
                Weapon Management: {campaignWarbands[selectedUnitForWeapons.warbandIndex].units[selectedUnitForWeapons.unitIndex].name}
              </h3>
              <div className="space-y-6">
                {/* Current Weapons */}
                <div>
                  <h4 className="text-xl font-black text-slate-200 mb-4">Current Weapons</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {campaignWarbands[selectedUnitForWeapons.warbandIndex].units[selectedUnitForWeapons.unitIndex].selectedWeapons.map((weapon, weaponIndex) => (
                      <div key={weaponIndex} className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-black text-slate-200">{weapon.name}</h5>
                          <span className="text-emerald-400 font-black">{weapon.cost} CP</span>
                        </div>
                        <div className="text-xs text-slate-500 mb-3">
                          <div>Range: {weapon.range} | Dice: {weapon.dice} | Crit: {weapon.critEffect}</div>
                          <div>Crit Damage: {weapon.critDmg} | Abilities: {weapon.abilities?.join(', ') || 'None'}</div>
                        </div>
                        <button
                          onClick={() => {
                            if (removeWeaponFromUnit(selectedUnitForWeapons.warbandIndex, selectedUnitForWeapons.unitIndex, weaponIndex)) {
                              // Success - modal will close automatically
                            } else {
                              alert('Cannot remove default melee weapon!');
                            }
                          }}
                          className="px-3 py-1 bg-gradient-to-r from-red-600 to-pink-700 text-white font-black text-sm rounded hover:from-red-700 hover:to-pink-800 transition-all duration-200"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Weapons */}
                <div>
                  <h4 className="text-xl font-black text-slate-200 mb-4">Add Weapons</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {(() => {
                      const warband = campaignWarbands[selectedUnitForWeapons.warbandIndex];
                      const unit = warband.units[selectedUnitForWeapons.unitIndex];
                      const factionWeapons = weaponsData[unit.faction] || [];
                      
                      return factionWeapons.map((weapon, weaponIndex) => (
                        <div
                          key={weaponIndex}
                          onClick={() => {
                            if (addWeaponToUnit(selectedUnitForWeapons.warbandIndex, selectedUnitForWeapons.unitIndex, weapon)) {
                              // Success - weapon added
                            } else {
                              alert('Not enough CP to add this weapon!');
                            }
                          }}
                          className="bg-slate-700 border border-slate-600 rounded-lg p-4 cursor-pointer hover:bg-slate-600 transition-all duration-200"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-black text-slate-200">{weapon.name}</h5>
                            <span className="text-emerald-400 font-black">{weapon.cost} CP</span>
                          </div>
                          <div className="text-xs text-slate-500">
                            <div>Range: {weapon.range} | Dice: {weapon.dice} | Crit: {weapon.critEffect}</div>
                            <div>Crit Damage: {weapon.critDmg} | Abilities: {weapon.abilities?.join(', ') || 'None'}</div>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => {
                      setShowWeaponModal(false);
                      setSelectedUnitForWeapons(null);
                    }}
                    className="px-6 py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Level Up Modal */}
        {showLevelUpModal && selectedWarbandIndex >= 0 && levelUpUnitIndex >= 0 && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-slate-600 max-h-[80vh] overflow-y-auto">
              <h3 className="text-2xl font-black text-slate-200 mb-6">
                Level Up: {campaignWarbands[selectedWarbandIndex].units[levelUpUnitIndex].name}
              </h3>
              <div className="space-y-4">
                <p className="text-slate-300 mb-4">
                  Roll 4d6 and select the corresponding ability from the table below:
                </p>
                <div className="overflow-hidden rounded-xl border border-slate-600">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
                      <tr>
                        <th className="px-4 py-3 text-left text-white font-black">Roll</th>
                        <th className="px-4 py-3 text-left text-white font-black">Ability</th>
                        <th className="px-4 py-3 text-left text-white font-black">Effect</th>
                        <th className="px-4 py-3 text-left text-white font-black">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-600">
                      {LEVEL_UP_TABLE.map((row) => (
                        <tr key={row.roll} className="hover:bg-slate-700/50 transition-colors">
                          <td className="px-4 py-3 text-center">
                            <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-black text-lg rounded-full shadow-lg shadow-violet-500/25">
                              {row.roll}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-black text-violet-300">{row.result}</span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-slate-300 leading-relaxed">{row.effect}</span>
                          </td>
                          <td className="px-4 py-3">
                            <button
                              onClick={() => {
                                const newWarbands = [...campaignWarbands];
                                const unit = newWarbands[selectedWarbandIndex].units[levelUpUnitIndex];
                                if (!unit.levelUpAbilities) unit.levelUpAbilities = [];
                                unit.levelUpAbilities.push(row.result);
                                setCampaignWarbands(newWarbands);
                                setShowLevelUpModal(false);
                                setLevelUpUnitIndex(-1);
                              }}
                              className="px-3 py-1 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-black text-sm rounded hover:from-violet-700 hover:to-purple-800 transition-all duration-200"
                            >
                              Select
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => {
                      setShowLevelUpModal(false);
                      setLevelUpUnitIndex(-1);
                    }}
                    className="px-6 py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 