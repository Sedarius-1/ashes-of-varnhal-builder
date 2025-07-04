import React from 'react';
import type { Unit } from '../../types/unit';
import type { Warband } from '../../types/warband';

interface AddUnitModalProps {
  show: boolean;
  selectedWarbandIndex: number;
  campaignWarbands: Warband[];
  unitDefs: Record<string, any[]>;
  addUnitToWarband: (warbandIndex: number, unit: Unit) => boolean;
  setShowAddUnitModal: (show: boolean) => void;
}

const AddUnitModal: React.FC<AddUnitModalProps> = ({
  show,
  selectedWarbandIndex,
  campaignWarbands,
  unitDefs,
  addUnitToWarband,
  setShowAddUnitModal
}) => {
  if (!show || selectedWarbandIndex < 0) return null;
  const warband = campaignWarbands[selectedWarbandIndex];
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowAddUnitModal(false)}>
      <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-slate-600 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h3 className="text-2xl font-black text-slate-200 mb-6">Add Unit to Warband</h3>
        <div className="space-y-6">
          <div>
            <label className="block text-slate-300 font-black mb-2">Warband Faction</label>
            <div className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200">
              {warband.faction || 'No faction selected'}
            </div>
          </div>
          {warband.faction && (
            <div>
              <label className="block text-slate-300 font-black mb-4">Select Unit</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto">
                {unitDefs[warband.faction]?.map((unitTemplate: any, index: number) => (
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
              onClick={() => setShowAddUnitModal(false)}
              className="px-6 py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUnitModal; 