import { useState, useEffect, useRef } from 'react';
import type { Warband } from '../types/warband';
import type { Unit } from '../types/unit';
import type { Faction } from '../types/faction';
import type { Weapon } from '../types/weapon';
import unitsJson from '../definitions/units.json';
import weaponsJson from '../definitions/weapons.json';
import injuryTable from '../definitions/injuryTable.json';
import salvageTable from '../definitions/salvageTable.json';
import levelUpTable from '../definitions/levelUpTable.json';
import factionsList from '../definitions/factionsList.json';
import UnitTable from '../components/campaign/UnitTable';
import GameHistoryTable from '../components/campaign/GameHistoryTable';
import AddWarbandModal from '../components/campaign/AddWarbandModal';
import AddUnitModal from '../components/campaign/AddUnitModal';
import ImportWarbandModal from '../components/campaign/ImportWarbandModal';
import AddGameResultModal from '../components/campaign/AddGameResultModal';
import XPModal from '../components/campaign/XPModal';
import WeaponModal from '../components/campaign/WeaponModal';
import LevelUpModal from '../components/campaign/LevelUpModal';
import UnitDetailsModal from '../components/campaign/UnitDetailsModal';
import { downloadWarbandPDF } from '../utils/pdfGenerator';
import { useAuth } from '../contexts/AuthContext';
import { getWarbands, createWarband, updateWarband, deleteWarband } from '../firebase/firestore';

export default function CampaignsPage() {
  const { user } = useAuth();
  
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
  const [showUnitDetailsModal, setShowUnitDetailsModal] = useState(false);
  const [selectedUnitForDetails, setSelectedUnitForDetails] = useState<{ warbandIndex: number, unitIndex: number } | null>(null);
  const [newWarbandFaction, setNewWarbandFaction] = useState<Faction | null>(null);
  const [gameResult, setGameResult] = useState<"win" | "draw" | "loss" | "">("");
  const [opponentName, setOpponentName] = useState("");
  const [enemyCP, setEnemyCP] = useState("");
  const [enemyFaction, setEnemyFaction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Unit definitions
  const unitDefs: Record<Faction, Omit<Unit, 'id' | 'cost' | 'selectedWeapons'>[]> = unitsJson as Record<Faction, Omit<Unit, 'id' | 'cost' | 'selectedWeapons'>[]>;
  const weaponsData: Record<Faction, Weapon[]> = weaponsJson as Record<Faction, Weapon[]>;

  // Load warbands from Firestore when user is authenticated
  useEffect(() => {
    if (user) {
      loadWarbands();
    } else {
      setCampaignWarbands([]);
    }
  }, [user]);

  const loadWarbands = async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const warbands = await getWarbands(user.uid);
      setCampaignWarbands(warbands);
    } catch (error) {
      console.error('Failed to load warbands:', error);
      setError('Failed to load warbands. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Save warband changes to Firestore
  const saveWarband = async (warband: Warband) => {
    if (!user || !warband.id) return;
    
    try {
      await updateWarband(warband.id, warband);
    } catch (error) {
      console.error('Failed to save warband:', error);
      setError('Failed to save warband. Please try again.');
    }
  };

  // Create new warband in Firestore
  const createNewWarband = async (warband: Omit<Warband, 'id'>): Promise<Warband> => {
    if (!user) throw new Error('User not authenticated');
    
    try {
      const newWarband = await createWarband(warband, user.uid);
      setCampaignWarbands(prev => [...prev, newWarband]);
      return newWarband;
    } catch (error) {
      console.error('Failed to create warband:', error);
      setError('Failed to create warband. Please try again.');
      throw error;
    }
  };

  // Delete warband from Firestore
  const deleteWarbandFromFirestore = async (warbandId: string) => {
    if (!user) return;
    
    try {
      await deleteWarband(warbandId);
      setCampaignWarbands(prev => prev.filter(w => w.id !== warbandId));
    } catch (error) {
      console.error('Failed to delete warband:', error);
      setError('Failed to delete warband. Please try again.');
    }
  };

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

  const addUnitToWarband = async (warbandIndex: number, unit: Unit) => {
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
      
      // Save to Firestore
      if (warband.id) {
        await saveWarband(warband);
      }
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

  const importWarband = (data: unknown, warbandName?: string) => {
    // Check if this is a full warband with campaign data or just a unit array
    if (typeof data === 'object' && data !== null && 'name' in data && 'units' in data && Array.isArray((data as any).units)) {
      // This is a full warband with campaign data - import as-is
      setCampaignWarbands([...campaignWarbands, data as Warband]);
    } else if (Array.isArray(data)) {
      // This is an array of units - convert to warband format
      const totalCost = data.reduce((sum, unit) => sum + ((unit as Unit).cost || (unit as Unit).baseCost || 0), 0);
      const newWarband: Warband = {
        name: warbandName || 'Imported Warband',
        faction: (data[0] as Unit)?.faction || null,
        units: data.map(unit => ({
          ...(unit as Unit),
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

  const addGameResult = (
    warbandIndex: number,
    salvagePoints: number,
    salvageRoll: string,
    salvageResult: string,
    gameNotes: string,
    status?: "win" | "draw" | "loss",
    opponentName?: string,
    enemyCP?: string,
    enemyFaction?: string
  ) => {
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
      notes: gameNotes,
      status: (status || "") as "win" | "draw" | "loss" | "",
      opponentName: opponentName || "",
      enemyCP: enemyCP || "",
      enemyFaction: enemyFaction || ""
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

  // Helper to get total warband CP (sum of all units' cost)
  function getWarbandTotalCP(warband: Warband): number {
    return warband.units.reduce((sum, unit) => sum + (unit.cost || unit.baseCost || 0), 0);
  }

  const factions: Faction[] = factionsList as Faction[];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Gothic background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="max-w-7xl mx-auto p-2 sm:p-4 md:p-8 relative z-10">
        <div className="mb-8 sm:mb-12 text-center">
          <div className="relative">
            <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 mb-2 sm:mb-4 tracking-wider">
              🏰 Campaign Tracker
            </h1>
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-indigo-400/20 blur-xl rounded-full"></div>
          </div>
          <div className="w-20 sm:w-32 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 mx-auto rounded-full shadow-lg shadow-violet-500/50"></div>
        </div>

        {/* Only show the tracker content, no tabs */}
        <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-2 sm:p-4 md:p-8 border border-slate-700/50 backdrop-blur-sm mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-3xl font-black text-slate-200 mb-4 sm:mb-8 flex items-center tracking-wide">
            <span className="text-violet-400 mr-2 sm:mr-3">🎯</span>
            Warband Tracker
          </h2>
          
          {/* Loading and Error States */}
          {loading && (
            <div className="text-center py-8 bg-slate-800/60 rounded-xl border border-slate-600 mb-6">
              <div className="text-slate-400 text-lg mb-2">Loading warbands...</div>
              <div className="animate-spin text-amber-400 text-2xl">⚔️</div>
            </div>
          )}
          
          {error && (
            <div className="bg-red-900/50 border border-red-700/50 text-red-300 px-4 py-3 rounded-lg mb-6">
              <div className="font-bold mb-1">Error</div>
              <div>{error}</div>
              <button
                onClick={() => setError(null)}
                className="text-red-400 hover:text-red-300 text-sm mt-2"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* Warband Selection */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
              <h3 className="text-lg sm:text-2xl font-black text-slate-200">Campaign Warbands</h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <button
                  onClick={() => setShowImportModal(true)}
                  className="px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-800 transition-all duration-200 text-sm sm:text-base"
                >
                  📥 Import
                </button>
                <button
                  onClick={() => setShowGameModal(true)}
                  className="px-3 py-2 sm:px-4 sm:py-3 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-black rounded-xl shadow-lg hover:from-amber-700 hover:to-orange-800 transition-all duration-200 text-sm sm:text-base"
                >
                  🎲 Add Game Result
                </button>
                <button
                  onClick={() => {
                    if (selectedWarbandIndex >= 0 && campaignWarbands[selectedWarbandIndex]) {
                      downloadWarbandPDF(campaignWarbands[selectedWarbandIndex].units);
                    } else if (campaignWarbands.length > 0) {
                      alert("Please select a warband to export as PDF!");
                    } else {
                      alert("No warbands to export!");
                    }
                  }}
                  disabled={campaignWarbands.length === 0 || selectedWarbandIndex < 0}
                  className={`px-3 py-2 sm:px-4 sm:py-3 font-black rounded-xl shadow-lg transition-all duration-200 text-sm sm:text-base ${
                    campaignWarbands.length > 0 && selectedWarbandIndex >= 0
                      ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  🖨️ Download as PDF
                </button>
                <button
                  onClick={() => setShowAddWarbandModal(true)}
                  className="px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-black rounded-xl shadow-lg hover:from-violet-700 hover:to-purple-800 transition-all duration-200 text-sm sm:text-base"
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
                  className={`px-3 py-2 sm:px-4 sm:py-3 font-black rounded-xl shadow-lg transition-all duration-200 text-sm sm:text-base ${
                    campaignWarbands.length > 0 && selectedWarbandIndex >= 0
                      ? "bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800"
                      : "bg-slate-700 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  💾 Export Warband
                </button>
              </div>
            </div>
            
            {!user ? (
              <div className="text-center py-8 sm:py-12 bg-slate-800/60 rounded-xl border border-slate-600">
                <p className="text-slate-400 text-base sm:text-lg mb-2 sm:mb-4">Please sign in to manage your warbands</p>
                <p className="text-slate-500 text-sm sm:text-base">Your warbands will be saved to the cloud</p>
              </div>
            ) : campaignWarbands.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-slate-800/60 rounded-xl border border-slate-600">
                <p className="text-slate-400 text-base sm:text-lg mb-2 sm:mb-4">No warbands in campaign yet</p>
                <p className="text-slate-500 text-sm sm:text-base">Add a warband to start tracking your campaign progress</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
                {campaignWarbands.map((warband, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedWarbandIndex(index)}
                    className={`p-3 sm:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      selectedWarbandIndex === index
                        ? 'border-violet-500 bg-violet-900/20'
                        : 'border-slate-600 bg-slate-800/60 hover:border-slate-500 hover:bg-slate-700/60'
                    }`}
                  >
                    <h4 className="font-black text-slate-200 mb-1 sm:mb-2 text-base sm:text-lg">{warband.name}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm">{warband.faction}</p>
                    <div className="mt-1 sm:mt-2 flex justify-between text-xs sm:text-sm">
                      <span className="text-slate-400">Units: {warband.units.length}</span>
                      <span className="text-violet-400">CP: {warband.cp !== undefined ? warband.cp : 500}</span>
                    </div>
                    <div className="mt-1 flex justify-between text-xs sm:text-sm">
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
            <div className="bg-slate-800/60 rounded-xl p-3 sm:p-6 border border-slate-600 overflow-x-auto">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2 sm:gap-0">
                <h3 className="text-lg sm:text-2xl font-black text-slate-200">
                  {campaignWarbands[selectedWarbandIndex].name}
                </h3>
                <div className="flex flex-wrap items-center gap-3 sm:gap-6">
                  <div className="text-center">
                    <div className="text-lg sm:text-2xl font-black text-violet-400">
                      {campaignWarbands[selectedWarbandIndex].cp !== undefined ? campaignWarbands[selectedWarbandIndex].cp : 500}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400">Creation Points</div>
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
                    <div className="text-lg sm:text-2xl font-black text-amber-400">
                      {campaignWarbands[selectedWarbandIndex].salvagePoints || 0}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-400">Salvage Points</div>
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
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black rounded-lg hover:from-emerald-700 hover:to-teal-800 transition-all duration-200 text-xs sm:text-base"
                  >
                    + Add Unit
                  </button>
                </div>
              </div>

              {/* Units Table */}
              <div className="overflow-x-auto">
                <UnitTable
                  units={campaignWarbands[selectedWarbandIndex].units}
                  selectedWarbandIndex={selectedWarbandIndex}
                  calculateLevel={calculateLevel}
                  canLevelUp={canLevelUp}
                  isUnitDisabled={isUnitDisabled}
                  setSelectedUnitForDetails={setSelectedUnitForDetails}
                  setShowUnitDetailsModal={setShowUnitDetailsModal}
                  setSelectedUnitForXP={setSelectedUnitForXP}
                  setShowXPModal={setShowXPModal}
                  setUnitAsLeader={setUnitAsLeader}
                  setSelectedUnitForWeapons={setSelectedUnitForWeapons}
                  setShowWeaponModal={setShowWeaponModal}
                  setLevelUpUnitIndex={setLevelUpUnitIndex}
                  setShowLevelUpModal={setShowLevelUpModal}
                  removeUnitFromWarband={removeUnitFromWarband}
                  injuryTable={injuryTable}
                  levelUpTable={levelUpTable}
                  campaignWarbands={campaignWarbands}
                />
              </div>

              {/* Game History */}
              {campaignWarbands[selectedWarbandIndex].gameHistory && campaignWarbands[selectedWarbandIndex].gameHistory!.length > 0 && (
                <div className="mt-6 sm:mt-8 overflow-x-auto">
                  <h4 className="text-lg sm:text-xl font-black text-slate-200 mb-2 sm:mb-4">Game History</h4>
                  <GameHistoryTable gameHistory={campaignWarbands[selectedWarbandIndex].gameHistory!} />
                </div>
              )}
            </div>
          )}
        </section>

        {/* Add Warband Modal */}
        <AddWarbandModal
          show={showAddWarbandModal}
          factions={factions}
          newWarbandFaction={newWarbandFaction}
          setNewWarbandFaction={setNewWarbandFaction}
          setShowAddWarbandModal={setShowAddWarbandModal}
          createNewWarband={createNewWarband}
        />

        {/* Add Unit Modal */}
        <AddUnitModal
          show={showAddUnitModal}
          selectedWarbandIndex={selectedWarbandIndex}
          campaignWarbands={campaignWarbands}
          unitDefs={unitDefs}
          addUnitToWarband={addUnitToWarband}
          setShowAddUnitModal={setShowAddUnitModal}
        />

        {/* Unified Import Modal */}
        <ImportWarbandModal
          show={showImportModal}
          fileInputRef={fileInputRef}
          importWarband={importWarband}
          setShowImportModal={setShowImportModal}
        />

        {/* Add Game Result Modal */}
        <AddGameResultModal
          show={showGameModal}
          campaignWarbands={campaignWarbands}
          selectedWarbandForGame={selectedWarbandForGame}
          setSelectedWarbandForGame={setSelectedWarbandForGame}
          gameResult={gameResult}
          setGameResult={setGameResult}
          opponentName={opponentName}
          setOpponentName={setOpponentName}
          enemyCP={enemyCP}
          setEnemyCP={setEnemyCP}
          enemyFaction={enemyFaction}
          setEnemyFaction={setEnemyFaction}
          factions={factions}
          salvageTable={salvageTable}
          getWarbandTotalCP={getWarbandTotalCP}
          setCampaignWarbands={setCampaignWarbands}
          addGameResult={addGameResult}
          setShowGameModal={setShowGameModal}
        />

        {/* XP Modal */}
        <XPModal
          show={showXPModal}
          selectedUnitForXP={selectedUnitForXP}
          campaignWarbands={campaignWarbands}
          setCampaignWarbands={setCampaignWarbands}
          setShowXPModal={setShowXPModal}
          setSelectedUnitForXP={setSelectedUnitForXP}
        />

        {/* Weapon Management Modal */}
        <WeaponModal
          show={showWeaponModal}
          selectedUnitForWeapons={selectedUnitForWeapons}
          campaignWarbands={campaignWarbands}
          weaponsData={weaponsData}
          removeWeaponFromUnit={removeWeaponFromUnit}
          addWeaponToUnit={addWeaponToUnit}
          setShowWeaponModal={setShowWeaponModal}
          setSelectedUnitForWeapons={setSelectedUnitForWeapons}
        />

        {/* Level Up Modal */}
        <LevelUpModal
          show={showLevelUpModal}
          selectedWarbandIndex={selectedWarbandIndex}
          levelUpUnitIndex={levelUpUnitIndex}
          campaignWarbands={campaignWarbands}
          levelUpTable={levelUpTable}
          setCampaignWarbands={setCampaignWarbands}
          setShowLevelUpModal={setShowLevelUpModal}
          setLevelUpUnitIndex={setLevelUpUnitIndex}
        />

        {/* Unit Details Modal */}
        <UnitDetailsModal
          show={showUnitDetailsModal}
          selectedUnitForDetails={selectedUnitForDetails}
          campaignWarbands={campaignWarbands}
          weaponsData={weaponsData}
          setCampaignWarbands={setCampaignWarbands}
          setShowUnitDetailsModal={setShowUnitDetailsModal}
        />
      </div>
    </div>
  );
} 