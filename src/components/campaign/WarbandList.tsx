import React from 'react';
import type { Warband } from '../../types/warband';

interface WarbandListProps {
  warbands: Warband[];
  selectedWarbandIndex: number;
  setSelectedWarbandIndex: (index: number) => void;
}

const WarbandList: React.FC<WarbandListProps> = ({ warbands, selectedWarbandIndex, setSelectedWarbandIndex }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {warbands.map((warband, index) => (
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
  );
};

export default WarbandList; 