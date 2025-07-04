import React from 'react';

interface LevelUpModalProps {
  show: boolean;
  selectedWarbandIndex: number;
  levelUpUnitIndex: number;
  campaignWarbands: any[];
  levelUpTable: any[];
  setCampaignWarbands: (warbands: any[]) => void;
  setShowLevelUpModal: (show: boolean) => void;
  setLevelUpUnitIndex: (idx: number) => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({
  show,
  selectedWarbandIndex,
  levelUpUnitIndex,
  campaignWarbands,
  levelUpTable,
  setCampaignWarbands,
  setShowLevelUpModal,
  setLevelUpUnitIndex
}) => {
  if (!show || selectedWarbandIndex < 0 || levelUpUnitIndex < 0) return null;
  const unit = campaignWarbands[selectedWarbandIndex].units[levelUpUnitIndex];
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowLevelUpModal(false)}>
      <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-slate-600 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <h3 className="text-2xl font-black text-slate-200 mb-6">
          Level Up: {unit.name}
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
                {levelUpTable.map((row: { roll: number; result: string; effect: string }) => (
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
  );
};

export default LevelUpModal; 