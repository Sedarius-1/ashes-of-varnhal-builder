import React from 'react';
import FactionSelector from '../FactionSelector';
import type { Warband } from '../../types/warband';
import type { Faction } from '../../types/faction';

interface AddWarbandModalProps {
  show: boolean;
  factions: Faction[];
  newWarbandFaction: Faction | null;
  setNewWarbandFaction: (f: Faction | null) => void;
  setShowAddWarbandModal: (show: boolean) => void;
  createNewWarband: (warband: Omit<Warband, 'id'>) => Promise<Warband>;
}

const AddWarbandModal: React.FC<AddWarbandModalProps> = ({
  show,
  factions,
  newWarbandFaction,
  setNewWarbandFaction,
  setShowAddWarbandModal,
  createNewWarband
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowAddWarbandModal(false)}>
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-600" onClick={e => e.stopPropagation()}>
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
          <div>
            <FactionSelector
              factions={factions}
              selectedFaction={newWarbandFaction}
              setSelectedFaction={setNewWarbandFaction}
              onAddUnit={() => {}}
              isLocked={false}
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={async () => {
                const name = (document.getElementById('warband-name') as HTMLInputElement).value;
                const cp = parseInt((document.getElementById('warband-cp') as HTMLInputElement).value) || 500;
                if (name.trim() && newWarbandFaction) {
                  try {
                    const newWarband: Omit<Warband, 'id'> = {
                      name: name.trim(),
                      faction: newWarbandFaction,
                      units: [],
                      cp: cp
                    };
                    await createNewWarband(newWarband);
                    setShowAddWarbandModal(false);
                    setNewWarbandFaction(null);
                  } catch (error) {
                    console.error('Failed to create warband:', error);
                    alert('Failed to create warband. Please try again.');
                  }
                }
              }}
              disabled={!newWarbandFaction}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-black rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all duration-200 disabled:bg-slate-700 disabled:text-slate-400"
            >
              Add Warband
            </button>
            <button
              onClick={() => {
                setShowAddWarbandModal(false);
                setNewWarbandFaction(null);
              }}
              className="flex-1 px-6 py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddWarbandModal; 