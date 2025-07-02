import { useState } from 'react';

const CAMPAIGN_TABS = [
  { key: 'overview', label: 'Overview', icon: '📋' },
  { key: 'post-battle', label: 'Post-Battle Sequence', icon: '⚔️' },
  { key: 'injury-table', label: 'Injury Table', icon: '🩸' },
  { key: 'salvage-table', label: 'Salvage Table', icon: '💎' },
  { key: 'level-up-table', label: 'Level-Up Table', icon: '⭐' }
];

const INJURY_TABLE = [
  { roll: '4–6', result: 'Dead', effect: 'The unit is permanently removed from the roster.' },
  { roll: '7–10', result: 'Crippled', effect: 'The unit survives but suffers a permanent stat penalty (–1 to Move, Defense, or Vigor, your choice).' },
  { roll: '11–13', result: 'Trauma', effect: 'The unit survives but begins the next game with –1 Morale and –1 Wound.' },
  { roll: '14–17', result: 'Lingering Wound', effect: 'Misses next battle. No permanent penalty.' },
  { roll: '18–20', result: 'Wounded', effect: 'Begins next game with –1 Wound.' },
  { roll: '21–22', result: 'Shaken', effect: 'No physical harm, but loses 1 XP.' },
  { roll: '23–24', result: 'Close Call', effect: 'No effect.' },
  { roll: '25+', result: 'Steeled by Fire', effect: 'Gains +1 XP and may reroll one stat advancement in future.' },
];

const SALVAGE_TABLE = [
  { roll: '4–6', sp: 3, result: 'Mostly scrap and damaged gear.' },
  { roll: '7–10', sp: 4, result: 'Minimal returns.' },
  { roll: '11–13', sp: 5, result: 'Usable salvage.' },
  { roll: '14–17', sp: 6, result: 'Functional tech fragments.' },
  { roll: '18–20', sp: 7, result: 'Intact cores and frames.' },
  { roll: '21–22', sp: 8, result: 'Rare salvage. Gain +1 XP on one unit of your choice.' },
  { roll: '23–24', sp: 10, result: 'Exceptional find. Gain +1 XP and unlock a reroll during next postgame.' },
  { roll: '25+', sp: 12, result: 'Major breakthrough. You may also choose 1 basic weapon upgrade for free.' },
];

const LEVEL_UP_TABLE = [
  { roll: 4, result: 'Unexpected Instinct', effect: "+1 Move (max 8')" },
  { roll: 5, result: 'Veteran of Dust', effect: '+1 Morale (max 7)' },
  { roll: 6, result: 'Tireless Engine', effect: '+1 Vigour (max 6)' },
  { roll: 7, result: 'Sharpened Edge', effect: '+1 to Melee Attack Dice (once per activation)' },
  { roll: 8, result: 'Honed Reflexes', effect: '+1 Defense (max 5)' },
  { roll: 9, result: "Tracker's Intuition", effect: 'Gains Ignore Cover when Shooting' },
  { roll: 10, result: 'Hardened Resolve', effect: '+1 Resolve (max 4)' },
  { roll: 11, result: 'Quickdraw', effect: 'May draw Line of Sight through 1 terrain piece per round' },
  { roll: 12, result: 'Deadeye', effect: 'Ranged Critical hits deal +1 extra damage' },
  { roll: 13, result: 'Grizzled Veteran', effect: 'Ignore the Wounds inflicted by first attack suffered each game' },
  { roll: 14, result: 'Adaptive Reflexes', effect: 'Gains "Dodge" as a free action once per game' },
  { roll: 15, result: 'Heavy Step', effect: 'Melee Attacks made after moving deal +1 damage' },
  { roll: 16, result: 'Iron Will', effect: 'Gains reroll on failed Morale tests' },
  { roll: 17, result: 'Weapon Mastery', effect: 'May equip one additional weapon (up to 3 max)' },
  { roll: 18, result: 'Battle Scars', effect: 'Gains a permanent +1 Action on Round 1 only' },
  { roll: 19, result: 'Overcharger', effect: 'If unit has Power stat > 0, gain +1 Power, else reroll' },
  { roll: 20, result: 'Resilient Core', effect: 'The first time reduced to 0 Wounds, survive with 1 instead' },
  { roll: 21, result: 'Augmented Targeting', effect: 'Ranged attacks ignore penalties from Obscured targets' },
  { roll: 22, result: 'Aggression Protocol', effect: 'Gains +1 Attack die when charging' },
  { roll: 23, result: 'Staggering Impact', effect: 'Melee Crits now inflict Stun' },
  { roll: 24, result: 'Legend in Ash', effect: 'Gain a faction-specific Trait (or reroll if not yet implemented)' },
];

export default function CampaignRulesPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Gothic background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="max-w-6xl mx-auto p-8 relative z-10">
        <div className="mb-12 text-center">
          <div className="relative">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 mb-4 tracking-wider">
              🏰 Campaign Rules
            </h1>
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-violet-400/20 via-purple-400/20 to-indigo-400/20 blur-xl rounded-full"></div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 mx-auto rounded-full shadow-lg shadow-violet-500/50"></div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg overflow-hidden">
            {CAMPAIGN_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-3 font-black text-lg tracking-wide flex items-center gap-2 transition-all duration-200 border-r border-slate-700/40 last:border-r-0
                  ${activeTab === tab.key
                    ? 'bg-gradient-to-r from-violet-600 to-purple-700 text-white shadow-xl shadow-violet-900/30'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-violet-300'}
                `}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Panels */}
        <div>
          {activeTab === 'overview' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-6 flex items-center tracking-wide">
                <span className="text-violet-400 mr-3">📋</span>
                Overview of Campaign Play
              </h2>
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p>This section describes how to link individual games of <em>Ashes of Varnhal</em> into a persistent narrative campaign. Campaign play allows warbands to evolve over time—earning Salvage, gaining experience, suffering permanent injuries, and occasionally recruiting unique heroes.</p>
                <p>Campaigns consist of multiple connected skirmishes, during which each player controls a persistent Warband that will change based on performance, attrition, and opportunity.</p>
                
                <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 rounded-xl p-6 border-l-4 border-violet-500">
                  <h3 className="text-2xl font-black text-violet-300 mb-4 tracking-wide">Persistent Warbands</h3>
                  <p className="mb-4">Each Warband in a campaign begins with a fixed pool of Creation Points (CP), typically <span className="font-black text-violet-400">500 CP</span>, with which they assemble their starting roster. This roster remains with the player across all campaign games unless modified through upgrades, injuries, deaths, or salvaging.</p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-violet-400 font-black mr-3 mt-1">•</span>
                      <span>Units that are killed in a mission may suffer permanent injuries or be removed entirely (see Injury Table).</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-violet-400 font-black mr-3 mt-1">•</span>
                      <span>Units may gain new Traits or abilities through XP progression (see Level-Up Table).</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-violet-400 font-black mr-3 mt-1">•</span>
                      <span>Players may recruit new units by spending CP earned via Salvage Points (SP).</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/50 rounded-xl p-6 border-l-4 border-indigo-500">
                  <h3 className="text-2xl font-black text-indigo-300 mb-4 tracking-wide">Tracking Roster Changes</h3>
                  <p className="mb-4">Between games, players update their warband sheets to reflect the aftermath of battle. This includes:</p>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                      <span><span className="font-black text-indigo-400">Wound Recovery:</span> Units restore Wounds between games unless Injured.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                      <span><span className="font-black text-indigo-400">Injury Resolution:</span> Use the Injury Table to resolve effects for downed units.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                      <span><span className="font-black text-indigo-400">Salvage Points (SP):</span> Each player rolls 4d6 on the Salvage Table post-battle. SPs can be used to:</span>
                    </div>
                    <ul className="list-disc list-inside ml-6 space-y-1">
                      <li>Recruit new units or restore lost ones.</li>
                      <li>Purchase upgrades (if enabled).</li>
                      <li>Unlock Hero slots, if available.</li>
                    </ul>
                    <div className="flex items-start">
                      <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                      <span><span className="font-black text-indigo-400">XP Progression:</span> Units may gain XP and unlock new abilities through the Level-Up Table.</span>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                    <p className="text-slate-300"><span className="font-black text-indigo-400">Note:</span> 1 Salvage Point (SP) equals <span className="font-black text-indigo-400">10 Creation Points (CP)</span> when used for recruitment or resource management.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-700/50 to-gray-700/50 rounded-xl p-6 border-l-4 border-slate-500">
                  <p className="text-slate-300 italic text-lg">The campaign system is designed to encourage narrative progression and player investment, while keeping bookkeeping minimal and streamlined between sessions.</p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'post-battle' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-violet-400 mr-3">⚔️</span>
                Post-Battle Sequence
              </h2>
              <div className="space-y-8">
                <p className="text-slate-300 leading-relaxed">After each game, both players follow the post-battle sequence in the listed order. This sequence governs casualties, rewards, progression, and potential reinforcements for each Warband.</p>
                {/* Injury Roll */}
                <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-2xl font-black text-red-300 mb-4 tracking-wide">1. Injury Roll</h3>
                  <p className="text-slate-300 mb-4">For each unit that was reduced to 0 Wounds during the battle, roll <span className="font-black text-red-400">4d6</span> on the Injury Table. Results range from minor flesh wounds to permanent maiming or death.</p>
                  <p className="text-slate-300 mb-6">Units that suffer minor injuries may recover fully before the next game. Others may begin the next mission with fewer Wounds, reduced stats, or even be removed from the roster permanently.</p>
                </div>
                {/* Salvage Roll */}
                <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500">
                  <h3 className="text-2xl font-black text-amber-300 mb-4 tracking-wide">2. Salvage Roll</h3>
                  <p className="text-slate-300 mb-4">Each player rolls <span className="font-black text-amber-400">4d6</span> on the Salvage Table to determine how many Salvage Points (SP) they earn from the battlefield.</p>
                  <p className="text-slate-300 mb-6">Salvage Points represent rare materials, valuable scrap, and useful parts that can be converted into Creation Points for warband expansion.</p>
                </div>
                {/* XP Award */}
                <div className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 rounded-xl p-6 border-l-4 border-violet-500">
                  <h3 className="text-2xl font-black text-violet-300 mb-4 tracking-wide">3. Experience Points</h3>
                  <p className="text-slate-300 mb-4">Units that participated in the battle gain Experience Points (XP) based on their performance and survival.</p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="text-violet-400 font-black mr-3 mt-1">•</span>
                      <span><span className="font-black text-violet-400">Surviving Units:</span> Gain 1 XP for participating in the battle.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-violet-400 font-black mr-3 mt-1">•</span>
                      <span><span className="font-black text-violet-400">Combat Performance:</span> Units that inflicted wounds gain +1 XP per wound caused.</span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-violet-400 font-black mr-3 mt-1">•</span>
                      <span><span className="font-black text-violet-400">Level Up:</span> When a unit reaches certain XP thresholds, they can roll on the Level-Up Table for new abilities.</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'injury-table' && (
            <section className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-2xl shadow-2xl p-8 border border-red-500/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-red-400 mr-3">🩸</span>
                Injury Table (4d6 Roll)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-white font-black text-lg tracking-wide">ROLL (4D6)</th>
                      <th className="px-6 py-4 text-white font-black text-lg tracking-wide">RESULT</th>
                      <th className="px-6 py-4 text-white font-black text-lg tracking-wide">EFFECT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {INJURY_TABLE.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-16 h-8 bg-gradient-to-r from-red-500 to-pink-600 text-white font-black text-sm rounded-full shadow-lg shadow-red-500/25">
                            {row.roll}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-black text-red-300">{row.result}</td>
                        <td className="px-6 py-4 text-slate-300 leading-relaxed">{row.effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === 'salvage-table' && (
            <section className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-2xl shadow-2xl p-8 border border-amber-500/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-amber-400 mr-3">💎</span>
                Salvage Table (4d6 Roll)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-white font-black text-lg tracking-wide">ROLL (4D6)</th>
                      <th className="px-6 py-4 text-white font-black text-lg tracking-wide">SALVAGE POINTS</th>
                      <th className="px-6 py-4 text-white font-black text-lg tracking-wide">RESULT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {SALVAGE_TABLE.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-16 h-8 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-sm rounded-full shadow-lg shadow-amber-500/25">
                            {row.roll}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-black text-amber-300">{row.sp}</td>
                        <td className="px-6 py-4 text-slate-300 leading-relaxed">{row.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {activeTab === 'level-up-table' && (
            <section className="bg-gradient-to-r from-violet-900/50 to-purple-900/50 rounded-2xl shadow-2xl p-8 border border-violet-500/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-violet-400 mr-3">⭐</span>
                Level-Up Table (4d6 Roll)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
                    <tr>
                      <th className="px-6 py-4 text-white font-black text-lg tracking-wide">ROLL</th>
                      <th className="px-6 py-4 text-white font-black text-lg tracking-wide">ABILITY</th>
                      <th className="px-6 py-4 text-white font-black text-lg tracking-wide">EFFECT</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-600">
                    {LEVEL_UP_TABLE.map((row, i) => (
                      <tr key={i} className="hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 text-center">
                          <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-black text-lg rounded-full shadow-lg shadow-violet-500/25">
                            {row.roll}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-black text-violet-300">{row.result}</td>
                        <td className="px-6 py-4 text-slate-300 leading-relaxed">{row.effect}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
} 