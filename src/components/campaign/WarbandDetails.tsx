import React from 'react';
import type { Warband } from '../../types/warband';
import type { Faction } from '../../types/faction';
import type { Weapon } from '../../types/weapon';

interface WarbandDetailsProps {
  warband: Warband;
  onEditCP: () => void;
  onEditSP: () => void;
  onAddUnit: () => void;
  // Add more handlers as needed for actions (remove unit, set leader, etc.)
  children?: React.ReactNode; // For modals or extra controls
}

const WarbandDetails: React.FC<WarbandDetailsProps> = ({ warband, onEditCP, onEditSP, onAddUnit, children }) => {
  return (
    <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-600">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-slate-200">{warband.name}</h3>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-2xl font-black text-violet-400">{warband.cp !== undefined ? warband.cp : 500}</div>
            <div className="text-sm text-slate-400">Creation Points</div>
            <button onClick={onEditCP} className="text-xs text-violet-400 hover:text-violet-300 mt-1">Edit</button>
          </div>
          <div className="text-center">
            <div className="text-2xl font-black text-amber-400">{warband.salvagePoints || 0}</div>
            <div className="text-sm text-slate-400">Salvage Points</div>
            <button onClick={onEditSP} className="text-xs text-amber-400 hover:text-amber-300 mt-1">Edit</button>
          </div>
          <button
            onClick={onAddUnit}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-black rounded-lg hover:from-emerald-700 hover:to-teal-800 transition-all duration-200"
          >
            + Add Unit
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};

export default WarbandDetails; 