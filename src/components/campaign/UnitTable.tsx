import React from 'react';
import type { Unit } from '../../types/unit';

interface UnitTableProps {
  units: Unit[];
  selectedWarbandIndex: number;
  calculateLevel: (xp: number) => number;
  canLevelUp: (xp: number, abilitiesCount: number) => boolean;
  isUnitDisabled: (unit: Unit) => boolean;
  setSelectedUnitForDetails: (val: { warbandIndex: number, unitIndex: number }) => void;
  setShowUnitDetailsModal: (val: boolean) => void;
  setSelectedUnitForXP: (val: { warbandIndex: number, unitIndex: number }) => void;
  setShowXPModal: (val: boolean) => void;
  setUnitAsLeader: (warbandIndex: number, unitIndex: number) => void;
  setSelectedUnitForWeapons: (val: { warbandIndex: number, unitIndex: number }) => void;
  setShowWeaponModal: (val: boolean) => void;
  setLevelUpUnitIndex: (val: number) => void;
  setShowLevelUpModal: (val: boolean) => void;
  removeUnitFromWarband: (warbandIndex: number, unitIndex: number) => void;
  injuryTable: any[];
  levelUpTable: any[];
  campaignWarbands: any[];
}

const UnitTable: React.FC<UnitTableProps> = ({
  units,
  selectedWarbandIndex,
  calculateLevel,
  canLevelUp,
  isUnitDisabled,
  setSelectedUnitForDetails,
  setShowUnitDetailsModal,
  setSelectedUnitForXP,
  setShowXPModal,
  setUnitAsLeader,
  setSelectedUnitForWeapons,
  setShowWeaponModal,
  setLevelUpUnitIndex,
  setShowLevelUpModal,
  removeUnitFromWarband,
  injuryTable,
  levelUpTable,
  campaignWarbands
}) => (
  <div className="rounded-xl border border-slate-600">
    {/* Table for desktop, cards for mobile */}
    <div className="hidden sm:block">
      <table className="w-full text-sm">
        <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
          <tr>
            <th className="px-4 py-3 text-left text-white font-black whitespace-nowrap">Unit</th>
            <th className="px-4 py-3 text-left text-white font-black whitespace-nowrap">Cost</th>
            <th className="px-4 py-3 text-left text-white font-black whitespace-nowrap">XP</th>
            <th className="px-4 py-3 text-left text-white font-black whitespace-nowrap">Level</th>
            <th className="px-4 py-3 text-left text-white font-black whitespace-nowrap">Injury</th>
            <th className="px-4 py-3 text-left text-white font-black whitespace-nowrap">Abilities</th>
            <th className="px-4 py-3 text-left text-white font-black whitespace-nowrap">Leader</th>
            <th className="px-4 py-3 text-left text-white font-black whitespace-nowrap">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-600">
          {units.map((unit, unitIndex) => (
            <tr key={unitIndex} className="hover:bg-slate-700/50 transition-colors">
              <td className="px-4 py-3 max-w-[120px] truncate">
                <div>
                  <button
                    onClick={() => {
                      setSelectedUnitForDetails({ warbandIndex: selectedWarbandIndex, unitIndex });
                      setShowUnitDetailsModal(true);
                    }}
                    className="font-black text-slate-200 hover:text-violet-300 transition-colors duration-200 text-left truncate"
                  >
                    {unit.name}
                  </button>
                  <div className="text-sm text-slate-400 truncate">{unit.type}</div>
                </div>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="font-black text-emerald-400">
                  {unit.cost || unit.baseCost || 0}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
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
              <td className="px-4 py-3 whitespace-nowrap">
                <span className="font-black text-violet-400">
                  {calculateLevel(unit.xp || 0)}
                </span>
              </td>
              <td className="px-4 py-3 max-w-[120px] truncate">
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
                            if (e.target.value === 'Dead' && unit.isLeader) {
                              unit.isLeader = false;
                            }
                            // This will need to be handled by parent
                          }
                        }}
                        className="px-3 py-1 bg-slate-700 border border-slate-600 rounded text-slate-200 text-sm cursor-pointer"
                      >
                        <option value="">Add Injury</option>
                        {injuryTable.map((injury, i) => (
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
                        const injuryEffect = injuryTable.find(inj => inj.result === injury)?.effect || 'Effect not found';
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
                                // This will need to be handled by parent
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
              <td className="px-4 py-3 max-w-[120px] truncate">
                <div className="text-sm text-slate-300">
                  {unit.levelUpAbilities && unit.levelUpAbilities.length > 0 ? (
                    <div className="space-y-1">
                      {unit.levelUpAbilities.map((ability, i) => {
                        const abilityEffect = levelUpTable.find(a => a.result === ability)?.effect || 'Effect not found';
                        return (
                          <div key={i} className="text-violet-400 font-black cursor-help group relative" title={abilityEffect}>
                            {ability}
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
              <td className="px-4 py-3 whitespace-nowrap">
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
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex flex-wrap gap-2">
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
                    className="px-3 py-1 bg-gradient-to-r from-red-600 to-pink-700 text-white font-black text-sm rounded hover:from-red-700 hover:to-pink-800 transition-all duration-200 ml-2"
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
    {/* Card/list layout for mobile */}
    <div className="block sm:hidden space-y-4">
      {units.map((unit, unitIndex) => (
        <div key={unitIndex} className="bg-slate-800 rounded-xl p-4 border border-slate-700 shadow flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <button
                onClick={() => {
                  setSelectedUnitForDetails({ warbandIndex: selectedWarbandIndex, unitIndex });
                  setShowUnitDetailsModal(true);
                }}
                className="font-black text-slate-200 hover:text-violet-300 transition-colors duration-200 text-left text-lg"
              >
                {unit.name}
              </button>
              <div className="text-xs text-slate-400">{unit.type}</div>
            </div>
            <span className="font-black text-emerald-400 text-lg">{unit.cost || unit.baseCost || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-violet-400">XP: {unit.xp || 0}</span>
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
            <span className="font-black text-violet-400 ml-auto">Lvl: {calculateLevel(unit.xp || 0)}</span>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-black text-slate-200">Injuries:</span>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    const newWarbands = [...campaignWarbands];
                    const unit = newWarbands[selectedWarbandIndex].units[unitIndex];
                    if (!unit.injuries) unit.injuries = [];
                    unit.injuries.push(e.target.value);
                    if (e.target.value === 'Dead' && unit.isLeader) {
                      unit.isLeader = false;
                    }
                    // This will need to be handled by parent
                  }
                }}
                className="px-2 py-1 bg-slate-700 border border-slate-600 rounded text-slate-200 text-xs cursor-pointer"
              >
                <option value="">Add Injury</option>
                {injuryTable.map((injury, i) => (
                  <option key={i} value={injury.result}>
                    {injury.result}
                  </option>
                ))}
              </select>
            </div>
            {unit.injuries && unit.injuries.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {unit.injuries.map((injury, i) => {
                  const injuryEffect = injuryTable.find(inj => inj.result === injury)?.effect || 'Effect not found';
                  return (
                    <span key={i} className="text-red-400 font-black cursor-help text-xs" title={injuryEffect}>
                      {injury}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <div>
            <span className="font-black text-slate-200">Abilities:</span>
            {unit.levelUpAbilities && unit.levelUpAbilities.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-1">
                {unit.levelUpAbilities.map((ability, i) => {
                  const abilityEffect = levelUpTable.find(a => a.result === ability)?.effect || 'Effect not found';
                  return (
                    <span key={i} className="text-violet-400 font-black cursor-help text-xs" title={abilityEffect}>
                      {ability}
                    </span>
                  );
                })}
              </div>
            ) : (
              <span className="text-slate-500 ml-2">None</span>
            )}
          </div>
          {/* Actions: split into two rows for mobile */}
          <div className="flex flex-wrap gap-2 mb-1">
            <button
              onClick={() => setUnitAsLeader(selectedWarbandIndex, unitIndex)}
              disabled={unit.type !== 'Elite' || isUnitDisabled(unit)}
              className={`px-2 py-1 font-black text-xs rounded transition-all duration-200 ${
                unit.isLeader
                  ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white'
                  : unit.type === 'Elite' && !isUnitDisabled(unit)
                    ? 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
              }`}
            >
              {unit.isLeader ? '👑 Leader' : unit.type === 'Elite' && !isUnitDisabled(unit) ? 'Set Leader' : isUnitDisabled(unit) ? 'Dead' : 'Elite Only'}
            </button>
            <button
              onClick={() => {
                setSelectedUnitForWeapons({warbandIndex: selectedWarbandIndex, unitIndex: unitIndex});
                setShowWeaponModal(true);
              }}
              disabled={isUnitDisabled(unit)}
              className={`px-2 py-1 font-black text-xs rounded transition-all duration-200 ${
                isUnitDisabled(unit)
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800'
              }`}
            >
              Weapons
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            <button
              onClick={() => {
                setLevelUpUnitIndex(unitIndex);
                setShowLevelUpModal(true);
              }}
              disabled={!canLevelUp(unit.xp || 0, unit.levelUpAbilities?.length || 0) || isUnitDisabled(unit)}
              className={`px-2 py-1 font-black text-xs rounded transition-all duration-200 ${
                canLevelUp(unit.xp || 0, unit.levelUpAbilities?.length || 0) && !isUnitDisabled(unit)
                  ? 'bg-gradient-to-r from-violet-600 to-purple-700 text-white hover:from-violet-700 hover:to-purple-800'
                  : 'bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              Level Up
            </button>
            <button
              onClick={() => removeUnitFromWarband(selectedWarbandIndex, unitIndex)}
              className="px-2 py-1 bg-gradient-to-r from-red-600 to-pink-700 text-white font-black text-xs rounded hover:from-red-700 hover:to-pink-800 transition-all duration-200 ml-2"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UnitTable; 