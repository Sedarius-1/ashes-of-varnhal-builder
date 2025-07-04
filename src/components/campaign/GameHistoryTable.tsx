import React from 'react';

interface GameHistoryTableProps {
  gameHistory: any[];
}

const GameHistoryTable: React.FC<GameHistoryTableProps> = ({ gameHistory }) => {
  if (!gameHistory || gameHistory.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-slate-600">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
          <tr>
            <th className="px-4 py-3 text-left text-white font-black">Game</th>
            <th className="px-4 py-3 text-left text-white font-black">Date</th>
            <th className="px-4 py-3 text-left text-white font-black">Status</th>
            <th className="px-4 py-3 text-left text-white font-black">Opponent</th>
            <th className="px-4 py-3 text-left text-white font-black">Enemy CP</th>
            <th className="px-4 py-3 text-left text-white font-black">Enemy Faction</th>
            <th className="px-4 py-3 text-left text-white font-black">Roll</th>
            <th className="px-4 py-3 text-left text-white font-black">SP</th>
            <th className="px-4 py-3 text-left text-white font-black">Result</th>
            <th className="px-4 py-3 text-left text-white font-black">Notes</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-600">
          {gameHistory.map((game, index) => (
            <tr key={index} className="hover:bg-slate-700/50 transition-colors">
              <td className="px-4 py-3">
                <span className="font-black text-violet-400">#{game.gameNumber}</span>
              </td>
              <td className="px-4 py-3 text-slate-300">{game.date}</td>
              <td className="px-4 py-3 text-slate-300">{game.status || "-"}</td>
              <td className="px-4 py-3 text-slate-300">{game.opponentName || "-"}</td>
              <td className="px-4 py-3 text-slate-300">{game.enemyCP || "-"}</td>
              <td className="px-4 py-3 text-slate-300">{game.enemyFaction || "-"}</td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black text-sm rounded-full">
                  {game.salvageRoll}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="font-black text-emerald-400">+{game.salvagePoints} SP</span>
              </td>
              <td className="px-4 py-3 text-slate-300 text-sm">{game.salvageResult}</td>
              <td className="px-4 py-3 text-slate-400 text-sm">{game.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameHistoryTable; 