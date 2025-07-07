import React from 'react';
import type { Warband } from '../../types/warband';

interface WarbandListProps {
  warbands: Warband[];
  selectedWarbandIndex: number;
  setSelectedWarbandIndex: (index: number) => void;
  onDeleteWarband: (warbandId: string) => void;
}

const WarbandList: React.FC<WarbandListProps> = ({ 
  warbands, 
  selectedWarbandIndex, 
  setSelectedWarbandIndex, 
  onDeleteWarband 
}) => {
  const handleDelete = (e: React.MouseEvent, warband: Warband) => {
    e.stopPropagation(); // Prevent selecting the warband when clicking delete
    if (warband.id && confirm(`Are you sure you want to delete "${warband.name}"? This action cannot be undone.`)) {
      onDeleteWarband(warband.id);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {warbands.map((warband, index) => (
        <div
          key={index}
          onClick={() => setSelectedWarbandIndex(index)}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 relative group ${
            selectedWarbandIndex === index
              ? 'border-violet-500 bg-violet-900/20'
              : 'border-slate-600 bg-slate-800/60 hover:border-slate-500 hover:bg-slate-700/60'
          }`}
        >
          {/* Delete button */}
          <button
            onClick={(e) => handleDelete(e, warband)}
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-red-600 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
            title="Delete warband"
          >
            ×
          </button>
          
          <h4 className="font-black text-slate-200 mb-2 pr-8">{warband.name}</h4>
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