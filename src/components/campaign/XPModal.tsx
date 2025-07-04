import React from 'react';

interface XPModalProps {
  show: boolean;
  selectedUnitForXP: { warbandIndex: number; unitIndex: number } | null;
  campaignWarbands: any[];
  setCampaignWarbands: (warbands: any[]) => void;
  setShowXPModal: (show: boolean) => void;
  setSelectedUnitForXP: (val: any) => void;
}

const XPModal: React.FC<XPModalProps> = ({
  show,
  selectedUnitForXP,
  campaignWarbands,
  setCampaignWarbands,
  setShowXPModal,
  setSelectedUnitForXP
}) => {
  if (!show || !selectedUnitForXP) return null;
  const unit = campaignWarbands[selectedUnitForXP.warbandIndex].units[selectedUnitForXP.unitIndex];
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowXPModal(false)}>
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-600" onClick={e => e.stopPropagation()}>
        <h3 className="text-2xl font-black text-slate-200 mb-6">
          Add XP: {unit.name}
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
          <div className="flex flex-col xs:flex-row xs:items-center justify-between my-2 gap-2 xs:gap-4">
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
            <span className="text-violet-400 font-black block xs:inline mt-2 xs:mt-0">×1 XP each</span>
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
          <div className="flex flex-col xs:flex-row gap-2 pt-4">
            <button
              onClick={() => {
                const downedLeader = (document.getElementById('downed-leader') as HTMLInputElement)?.checked || false;
                const downedUnits = parseInt((document.getElementById('downed-units') as HTMLInputElement)?.value || '0') || 0;
                const survived = (document.getElementById('survived') as HTMLInputElement)?.checked || false;
                const objective = (document.getElementById('objective') as HTMLInputElement)?.checked || false;
                let totalXP = 0;
                if (downedLeader) totalXP += 1;
                totalXP += downedUnits;
                if (survived) totalXP += 1;
                if (objective) totalXP += 2;
                const newWarbands = [...campaignWarbands];
                const unit = newWarbands[selectedUnitForXP.warbandIndex].units[selectedUnitForXP.unitIndex];
                unit.xp = (unit.xp || 0) + totalXP;
                setCampaignWarbands(newWarbands);
                setShowXPModal(false);
                setSelectedUnitForXP(null);
              }}
              className="w-full xs:w-auto px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-700 text-white font-black rounded-lg hover:from-violet-700 hover:to-purple-800 transition-all duration-200"
            >
              Add XP
            </button>
            <button
              onClick={() => {
                setShowXPModal(false);
                setSelectedUnitForXP(null);
              }}
              className="w-full xs:w-auto px-6 py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XPModal; 