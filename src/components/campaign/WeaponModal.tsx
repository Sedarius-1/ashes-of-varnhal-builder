import React from 'react';

interface WeaponModalProps {
  show: boolean;
  selectedUnitForWeapons: { warbandIndex: number; unitIndex: number } | null;
  campaignWarbands: any[];
  weaponsData: any;
  removeWeaponFromUnit: (warbandIndex: number, unitIndex: number, weaponIndex: number) => boolean;
  addWeaponToUnit: (warbandIndex: number, unitIndex: number, weapon: any) => boolean;
  setShowWeaponModal: (show: boolean) => void;
  setSelectedUnitForWeapons: (val: any) => void;
}

const WeaponModal: React.FC<WeaponModalProps> = ({
  show,
  selectedUnitForWeapons,
  campaignWarbands,
  weaponsData,
  removeWeaponFromUnit,
  addWeaponToUnit,
  setShowWeaponModal,
  setSelectedUnitForWeapons
}) => {
  if (!show || !selectedUnitForWeapons) return null;
  const warband = campaignWarbands[selectedUnitForWeapons.warbandIndex];
  const unit = warband.units[selectedUnitForWeapons.unitIndex];
  const factionWeapons = weaponsData[unit.faction] || [];
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowWeaponModal(false)}>
      <div className="bg-slate-800 rounded-2xl p-8 max-w-4xl w-full mx-4 border border-slate-600 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h3 className="text-2xl font-black text-slate-200 mb-6">
          Weapon Management: {unit.name}
        </h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-xl font-black text-slate-200 mb-4">Current Weapons</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {unit.selectedWeapons.map((weapon: any, weaponIndex: number) => (
                <div key={weaponIndex} className="bg-slate-700 border border-slate-600 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-black text-slate-200">{weapon.name}</h5>
                    <span className="text-emerald-400 font-black">{weapon.cost} CP</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-3">
                    <dl className="grid grid-cols-2 gap-x-2 gap-y-1">
                      <dt className="font-bold text-slate-400 flex items-center gap-1">🔫 Range</dt>
                      <dd className="text-slate-200 font-mono">{weapon.range}</dd>
                      <dt className="font-bold text-slate-400 flex items-center gap-1">🎲 Dice</dt>
                      <dd className="text-slate-200 font-mono">{weapon.dice}</dd>
                      <dt className="font-bold text-slate-400 flex items-center gap-1">💥 Crit Effect</dt>
                      <dd className="text-slate-200 font-mono">{weapon.critEffect || '—'}</dd>
                      <dt className="font-bold text-slate-400 flex items-center gap-1">🔥 Crit Dmg</dt>
                      <dd className="text-slate-200 font-mono">{weapon.critDmg}</dd>
                      <dt className="font-bold text-slate-400 flex items-center gap-1">✨ Abilities</dt>
                      <dd className="text-slate-200 font-mono">{weapon.abilities?.length ? weapon.abilities.join(', ') : 'None'}</dd>
                    </dl>
                  </div>
                  <button
                    onClick={() => {
                      if (removeWeaponFromUnit(selectedUnitForWeapons.warbandIndex, selectedUnitForWeapons.unitIndex, weaponIndex)) {
                        // Success
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
          <div>
            <h4 className="text-xl font-black text-slate-200 mb-4">Add Weapons</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {factionWeapons.map((weapon: any, weaponIndex: number) => (
                <div
                  key={weaponIndex}
                  onClick={() => {
                    if (addWeaponToUnit(selectedUnitForWeapons.warbandIndex, selectedUnitForWeapons.unitIndex, weapon)) {
                      // Success
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
                    <dl className="grid grid-cols-2 gap-x-2 gap-y-1">
                      <dt className="font-bold text-slate-400 flex items-center gap-1">🔫 Range</dt>
                      <dd className="text-slate-200 font-mono">{weapon.range}</dd>
                      <dt className="font-bold text-slate-400 flex items-center gap-1">🎲 Dice</dt>
                      <dd className="text-slate-200 font-mono">{weapon.dice}</dd>
                      <dt className="font-bold text-slate-400 flex items-center gap-1">💥 Crit Effect</dt>
                      <dd className="text-slate-200 font-mono">{weapon.critEffect || '—'}</dd>
                      <dt className="font-bold text-slate-400 flex items-center gap-1">🔥 Crit Dmg</dt>
                      <dd className="text-slate-200 font-mono">{weapon.critDmg}</dd>
                      <dt className="font-bold text-slate-400 flex items-center gap-1">✨ Abilities</dt>
                      <dd className="text-slate-200 font-mono">{weapon.abilities?.length ? weapon.abilities.join(', ') : 'None'}</dd>
                    </dl>
                  </div>
                </div>
              ))}
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
  );
};

export default WeaponModal; 