import React from 'react';
import type { Dispatch, SetStateAction } from 'react';

interface AddGameResultModalProps {
  show: boolean;
  campaignWarbands: any[];
  selectedWarbandForGame: number;
  setSelectedWarbandForGame: (idx: number) => void;
  gameResult: string;
  setGameResult: Dispatch<SetStateAction<'' | 'win' | 'draw' | 'loss'>>;
  opponentName: string;
  setOpponentName: (val: string) => void;
  enemyCP: string;
  setEnemyCP: (val: string) => void;
  enemyFaction: string;
  setEnemyFaction: (val: string) => void;
  factions: string[];
  salvageTable: any[];
  getWarbandTotalCP: (warband: any) => number;
  setCampaignWarbands: (warbands: any[]) => void;
  addGameResult: (...args: any[]) => void;
  setShowGameModal: (show: boolean) => void;
}

const AddGameResultModal: React.FC<AddGameResultModalProps> = ({
  show,
  campaignWarbands,
  selectedWarbandForGame,
  setSelectedWarbandForGame,
  gameResult,
  setGameResult,
  opponentName,
  setOpponentName,
  enemyCP,
  setEnemyCP,
  enemyFaction,
  setEnemyFaction,
  factions,
  salvageTable,
  getWarbandTotalCP,
  setCampaignWarbands,
  addGameResult,
  setShowGameModal
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowGameModal(false)}>
      <div className="bg-slate-800 rounded-2xl p-3 sm:p-8 max-w-md w-full mx-2 sm:mx-4 border border-slate-600" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg sm:text-2xl font-black text-slate-200 mb-4 sm:mb-6">Add Game Result</h3>
        <div className="space-y-3 sm:space-y-4">
          <div>
            <label className="block text-slate-300 font-black mb-1 sm:mb-2 text-xs sm:text-base">Select Warband</label>
            <select
              onChange={(e) => setSelectedWarbandForGame(parseInt(e.target.value))}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 text-sm sm:text-base"
              value={selectedWarbandForGame >= 0 ? selectedWarbandForGame : ""}
            >
              <option value="">Choose a warband...</option>
              {campaignWarbands.map((warband, index) => (
                <option key={index} value={index}>
                  {warband.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-black mb-1 sm:mb-2 text-xs sm:text-base">Game Result</label>
            <select
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 text-sm sm:text-base"
              value={gameResult}
              onChange={e => setGameResult(e.target.value as '' | 'win' | 'draw' | 'loss')}
            >
              <option value="">Select result...</option>
              <option value="win">Win (+3 XP to all units)</option>
              <option value="draw">Draw (+2 XP to all units)</option>
              <option value="loss">Loss (+1 XP to all units)</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-black mb-1 sm:mb-2 text-xs sm:text-base">Opponent Player Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 text-sm sm:text-base"
              value={opponentName}
              onChange={e => setOpponentName(e.target.value)}
              placeholder="Enter opponent's name"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-black mb-1 sm:mb-2 text-xs sm:text-base">Enemy Warband CP</label>
            <input
              type="number"
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 text-sm sm:text-base"
              value={enemyCP}
              onChange={e => setEnemyCP(e.target.value)}
              placeholder="Enter enemy warband CP"
              min="0"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-black mb-1 sm:mb-2 text-xs sm:text-base">Enemy Warband Faction</label>
            <select
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 text-sm sm:text-base"
              value={enemyFaction}
              onChange={e => setEnemyFaction(e.target.value)}
            >
              <option value="">-- Select enemy faction --</option>
              {factions.map(faction => (
                <option key={faction} value={faction}>{faction}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-slate-300 font-black mb-1 sm:mb-2 text-xs sm:text-base">Salvage Roll Result</label>
            <select
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 text-sm sm:text-base"
              id="game-salvage-roll"
            >
              <option value="">Select salvage roll result...</option>
              {salvageTable.map((entry, index) => (
                <option key={index} value={entry.roll}>
                  {entry.roll} - {entry.sp} SP: {entry.result}
                </option>
              ))}
            </select>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">1 SP = 10 CP</p>
          </div>
          <div>
            <label className="block text-slate-300 font-black mb-1 sm:mb-2 text-xs sm:text-base">Game Notes</label>
            <textarea
              placeholder="Brief description of the game..."
              className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200 h-16 sm:h-20 text-sm sm:text-base"
              id="game-notes"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 pt-2 sm:pt-4">
            <button
              onClick={() => {
                if (selectedWarbandForGame >= 0 && gameResult) {
                  const salvageRollSelect = document.getElementById('game-salvage-roll') as HTMLSelectElement;
                  const selectedRoll = salvageRollSelect.value;
                  let salvagePoints = 0;
                  let salvageResult = '';
                  if (selectedRoll) {
                    const salvageEntry = salvageTable.find(entry => entry.roll === selectedRoll);
                    if (salvageEntry) {
                      salvagePoints = salvageEntry.sp;
                      salvageResult = salvageEntry.result;
                    }
                  }
                  const userCP = getWarbandTotalCP(campaignWarbands[selectedWarbandForGame]);
                  const enemyCPNum = parseInt(enemyCP) || 0;
                  let bonusSP = 0;
                  if (enemyCPNum > userCP) {
                    bonusSP = Math.floor((enemyCPNum - userCP) / 100);
                    salvagePoints += bonusSP;
                  }
                  const gameNotes = (document.getElementById('game-notes') as HTMLTextAreaElement).value || 'Game completed';
                  // Add XP to all units in the selected warband
                  const xpToAdd = gameResult === "win" ? 3 : gameResult === "draw" ? 2 : 1;
                  const newWarbands = [...campaignWarbands];
                  newWarbands[selectedWarbandForGame].units = newWarbands[selectedWarbandForGame].units.map((unit: any) => ({
                    ...unit,
                    xp: (unit.xp || 0) + xpToAdd
                  }));
                  setCampaignWarbands(newWarbands);
                  addGameResult(
                    selectedWarbandForGame,
                    salvagePoints,
                    (salvageResult ?? ''),
                    'Manual Entry',
                    (gameNotes ?? ''),
                    (gameResult || undefined) as "win" | "draw" | "loss" | undefined,
                    opponentName,
                    enemyCP,
                    enemyFaction
                  );
                  setShowGameModal(false);
                  setSelectedWarbandForGame(-1);
                  setGameResult("");
                  setOpponentName("");
                  setEnemyCP("");
                  setEnemyFaction("");
                }
              }}
              disabled={selectedWarbandForGame < 0 || !gameResult}
              className="w-full sm:w-auto flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-amber-600 to-orange-700 text-white font-black rounded-lg hover:from-amber-700 hover:to-orange-800 transition-all duration-200 disabled:bg-slate-700 disabled:text-slate-400 text-sm sm:text-base"
            >
              Add Game Result
            </button>
            <button
              onClick={() => {
                setShowGameModal(false);
                setSelectedWarbandForGame(-1);
                setGameResult("");
                setOpponentName("");
                setEnemyCP("");
                setEnemyFaction("");
              }}
              className="w-full sm:w-auto flex-1 px-4 sm:px-6 py-2 sm:py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200 text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGameResultModal; 