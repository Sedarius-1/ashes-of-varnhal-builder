import { useState } from 'react';

const GAME_SETUP_TABS = [
  { key: 'overview', label: 'Overview', icon: '📋' },
  { key: 'table', label: 'Table Layout', icon: '🎯' },
  { key: 'warband', label: 'Building Warbands', icon: '⚔️' },
  { key: 'leaders', label: 'Leader Traits', icon: '👑' },
  { key: 'deployment', label: 'Deployment', icon: '📍' },
];

export default function GameSetupPage() {
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
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 mb-4 tracking-wider">
              🎯 Game Setup
            </h1>
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20 blur-xl rounded-full"></div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 mx-auto rounded-full shadow-lg shadow-green-500/50"></div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg overflow-hidden">
            {GAME_SETUP_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-3 font-black text-lg tracking-wide flex items-center gap-2 transition-all duration-200 border-r border-slate-700/40 last:border-r-0
                  ${activeTab === tab.key
                    ? 'bg-gradient-to-r from-green-600 to-emerald-700 text-white shadow-xl shadow-green-900/30'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-green-300'}
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
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-green-400 mr-3">📋</span>
                Game Setup Overview
              </h2>
              
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p className="text-lg">
                  Game Setup covers everything needed to prepare for a battle in <span className="font-black text-green-400">Ashes of Varnhal</span>. From table layout and terrain to warband construction and deployment, this section provides the foundation for every game.
                </p>
                
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-2xl font-black text-green-300 mb-4 tracking-wide">Key Components</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-green-400">Table Layout:</span> Standard 3'x3' battlefield with terrain types and deployment zones</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-green-400">Warband Building:</span> CP/SP system for creating and upgrading forces</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-green-400">Leader Traits:</span> Faction-specific abilities and tactical directives</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-green-400">Deployment:</span> Initiative rolls and strategic unit placement</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500">
                  <h3 className="text-2xl font-black text-amber-300 mb-4 tracking-wide">Getting Started</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Begin with Table Layout to understand battlefield setup, then move to Warband Building to create your force. Leader Traits and Deployment complete the preparation phase before the first dice are rolled.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'table' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-green-400 mr-3">🎯</span>
                Table Layout
              </h2>
              
              <div className="space-y-8">
                {/* Standard Size */}
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-2xl font-black text-blue-300 mb-4 tracking-wide">3'x3' Standard</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    The standard battlefield size for a full game of <span className="italic">Ashes of Varnhal</span> is 3 feet by 3 feet (36" x 36"). This provides ample space for movement, cover, and tactical maneuvering while keeping gameplay fast-paced and dynamic.
                  </p>
                  <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                    <p className="text-slate-300">
                      <span className="font-black text-blue-400">Note:</span> Smaller skirmishes or introductory matches can be played on a 2' x 2' board, but some scenarios and deployment types may not function as intended on reduced sizes. Bigger table sizes can also be used, yet it also may change the balance of factions.
                    </p>
                  </div>
                </div>

                {/* Deployment Zones */}
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-2xl font-black text-purple-300 mb-4 tracking-wide">Deployment Zones</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Each scenario defines specific deployment zones. These are areas where players set up their units before the game begins. Common deployment styles include:
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-purple-400">Standard Corners:</span> Each player deploys within a 12" triangle from a corner.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-purple-400">Opposing Edges:</span> Each player deploys within 6"–9" from their board edge.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-purple-400">Encirclement or Center Holds:</span> One player deploys in the center, others on edges (used in asymmetric scenarios).</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                    <p className="text-slate-300">
                      Units must be placed wholly within the deployment zone unless the scenario states otherwise.
                    </p>
                  </div>
                </div>

                {/* Terrain Types */}
                <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border-l-4 border-emerald-500">
                  <h3 className="text-2xl font-black text-emerald-300 mb-4 tracking-wide">Terrain Types</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Terrain is critical to gameplay. Players are encouraged to use a mix of features for balance and tactical variety. There are several key types of terrain:
                  </p>
                  <div className="grid gap-4">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-black text-emerald-400 mb-2">Cover Terrain</h4>
                      <p className="text-slate-300">Includes barricades, ruined walls, low craters. Units partially obscured gain +1 Dice for Defense tests against ranged attacks. Only applies if the terrain is between attacker and defender.</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-black text-emerald-400 mb-2">Blocking Terrain</h4>
                      <p className="text-slate-300">Solid features such as intact buildings or rock formations. Blocks line of sight entirely and cannot be moved through (unless climbing or flying is involved).</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-black text-emerald-400 mb-2">Elevated Terrain</h4>
                      <p className="text-slate-300">Platforms, catwalks, ruins with multiple levels. Units may climb to gain better vantage points. Attacks made from higher elevation gain +1 Dice for Attack rolls made with ranged weapon.</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-black text-emerald-400 mb-2">Difficult Ground</h4>
                      <p className="text-slate-300">Swamps, rubble fields, thick ash. Reduces movement through it by 2 inches unless otherwise stated.</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-black text-emerald-400 mb-2">Impassable Terrain</h4>
                      <p className="text-slate-300">Treated as completely untraversable. No unit can move into or through it for any reason.</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-amber-900/30 rounded-lg border border-amber-500/30">
                    <p className="text-slate-300">
                      <span className="font-black text-amber-400">Important:</span> Terrain features should be agreed upon by both players before the match begins, and their types clarified to avoid confusion during gameplay.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'warband' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-green-400 mr-3">⚔️</span>
                Building a Warband
              </h2>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-6 border-l-4 border-green-500">
                  <p className="text-slate-300 leading-relaxed text-lg">
                    Each player controls a warband—a small force of fighters, specialists, and veterans assembled for a mission. Warbands are built using <span className="font-black text-green-400">Creation Points (CP)</span> and gain post-battle resources in the form of <span className="font-black text-green-400">Salvage Points (SP)</span>. This section explains how to build your force from available units and weapons.
                  </p>
                </div>

                {/* CP/SP System */}
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-2xl font-black text-blue-300 mb-4 tracking-wide">CP/SP System</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-blue-400">Creation Points (CP):</span> Each player begins a game with a CP budget (commonly 500 CP for standard games). This total is spent to hire units and equip them with weapons and upgrades.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-blue-400">Salvage Points (SP):</span> After battle, players earn SP, which represent rare salvage and post-game progression. Each 1 SP equals 10 CP and can be used to purchase upgrades, new weapons, or additional units during a campaign.</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                    <p className="text-slate-300">
                      CP is only used to build warbands before the game. SP is used after a game to modify your roster or repair and enhance units.
                    </p>
                  </div>
                </div>

                {/* Weapons and Units */}
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-2xl font-black text-purple-300 mb-4 tracking-wide">Weapons and Units</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-purple-400">Units:</span> Each warband is built by selecting units from a single faction's roster. Units have a base CP cost, which includes their core stats and any faction-specific traits.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-purple-400">Weapons:</span> Weapons are purchased separately from a shared or faction-specific armory. Most units may equip one ranged and one melee weapon unless their profile states otherwise. (Every unit starts with a generic Melee weapon)</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-purple-400">Weapon Access:</span> Some weapons are limited to Troops or Elites, and certain advanced gear may be restricted to specific units.</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                    <p className="text-slate-300">
                      Each unit entry in a roster will indicate allowed weapon types, available upgrades, and unique traits.
                    </p>
                  </div>
                </div>

                {/* Restrictions and Limits */}
                <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-2xl font-black text-red-300 mb-4 tracking-wide">Restrictions and Unit Limits</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    To maintain balance and diversity in warbands, the following limits apply:
                  </p>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-red-400 font-black mr-3 mt-1">•</span>
                      <div className="text-slate-300">
                        <span className="font-black text-red-400">Troops and Elites:</span> Warbands are built using two categories of units — Troops and Elites.
                        <ul className="mt-2 ml-6 space-y-1">
                          <li className="flex items-start">
                            <span className="text-red-400 font-black mr-2 mt-1">-</span>
                            <span className="text-slate-300"><span className="font-black text-red-400">Troops:</span> Basic fighters. Usually make up the majority of a warband.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-red-400 font-black mr-2 mt-1">-</span>
                            <span className="text-slate-300"><span className="font-black text-red-400">Elites:</span> Advanced or specialized units.</span>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-red-400">Maximum Units:</span> A warband may not exceed 15 units in standard play. Scenario rules may override this.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-red-400">Hero Units:</span> Some special units are not available by default and must be unlocked via scenario rewards or campaign events.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-red-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-red-400">Leaders:</span> One Elite unit must be designated as the warband's Leader. That unit gains access to a special trait or aura depending on the faction.</span>
                    </li>
                  </ul>
                  <div className="mt-4 p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                    <p className="text-slate-300">
                      Players are encouraged to build warbands that reflect their faction's character—whether disciplined nobility, frenzied ferals, or cunning tacticians.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'leaders' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-green-400 mr-3">👑</span>
                Leader Traits and Tactical Directives
              </h2>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500">
                  <p className="text-slate-300 leading-relaxed text-lg">
                    In each game, one of your warband's eligible units is designated as the <span className="font-black text-amber-400">Leader</span>. This model does not receive any bonus to stats or cost unless otherwise noted, but gains access to either a permanent <span className="italic">Leader Trait</span> or a powerful, one-use <span className="italic">Tactical Directive</span>.
                  </p>
                </div>

                {/* Leader Traits */}
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-2xl font-black text-blue-300 mb-4 tracking-wide">Leader Traits</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Each faction comes with a unique <span className="font-black text-blue-400">Leader Trait</span>, representing that faction's philosophy and style of command. Leader Traits are passive or aura-based rules that remain active throughout the game. They typically provide synergy for units near the Leader and reward cohesive positioning and strategic planning.
                  </p>
                  <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                    <p className="text-slate-300">
                      A Leader Trait is the default rule your Leader has unless replaced by a Tactical Directive.
                    </p>
                  </div>
                  <div className="mt-4 p-4 bg-emerald-900/30 rounded-lg border border-emerald-500/30">
                    <p className="text-slate-300 italic">
                      <span className="font-black text-emerald-400">Example:</span> House Kaevaryn's <span className="font-black text-emerald-400">Banner of Resolve</span> grants all friendly units within 6'' +1 Morale and allows a reroll on one attack die per activation. Once per turn, the first attack by an affected unit may be immediately followed by a second attack.
                    </p>
                  </div>
                </div>

                {/* Tactical Directives */}
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-2xl font-black text-purple-300 mb-4 tracking-wide">Tactical Directives</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Before each game begins, instead of using the standard Leader Trait, a player may choose to replace it with a <span className="font-black text-purple-400">Tactical Directive</span>. These are powerful, one-time effects that reflect a moment of decisive command or battlefield gambit.
                  </p>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Tactical Directives can only be used once per game, and only by the Leader. They are declared and resolved as instructed—often at the start of a round, during activation, or in response to a specific condition. Once used, the Leader no longer benefits from their standard Leader Trait for the remainder of the game.
                  </p>
                  <div className="mt-4 p-4 bg-emerald-900/30 rounded-lg border border-emerald-500/30">
                    <p className="text-slate-300 italic mb-4">
                      <span className="font-black text-emerald-400">Example Tactical Directives:</span>
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                        <span className="text-slate-300"><span className="font-black text-emerald-400">Tactical Discipline</span> (House Kaevaryn): All friendly Troopers within 6'' of the Leader gain re-roll on all Attacks rolls during Round 1.</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                        <span className="text-slate-300"><span className="font-black text-emerald-400">Knight's Gambit</span> (House Kaevaryn): Once per game, after a Kaevaryn unit finishes its activation, immediately activate a second friendly unit.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Choosing Between */}
                <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-red-500">
                  <h3 className="text-2xl font-black text-red-300 mb-4 tracking-wide">Choosing Between Trait or Directive</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Leader Traits offer consistent benefits across the battle, rewarding longer-term positioning and synergy. Tactical Directives, on the other hand, are impactful gambits—ideal for disrupting enemy tempo or seizing a critical moment. Players must decide which best suits their plan for the coming battle.
                  </p>
                  <div className="mt-4 p-4 bg-red-900/30 rounded-lg border border-red-500/30">
                    <p className="text-slate-300 font-black">
                      You must choose either your faction's Leader Trait or one of its Tactical Directives before the game begins. This choice cannot be changed mid-game.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'deployment' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-green-400 mr-3">📍</span>
                Deployment Rules
              </h2>
              
              <div className="space-y-8">
                {/* Initiative Roll */}
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-2xl font-black text-blue-300 mb-4 tracking-wide">Initiative Roll</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    At the beginning of each round, players must determine who acts first. This is done through the <span className="font-black text-blue-400">Initiative Roll</span>:
                  </p>
                  <ol className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-400 font-black mr-3 mt-1">1.</span>
                      <span className="text-slate-300">Each player rolls 1d6.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 font-black mr-3 mt-1">2.</span>
                      <span className="text-slate-300">Player with the lower unit count adds the difference to the result of the dice roll.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 font-black mr-3 mt-1">3.</span>
                      <span className="text-slate-300">The player with the higher result chooses who has the first activation.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 font-black mr-3 mt-1">4.</span>
                      <span className="text-slate-300">If the result is a tie, reroll until one player wins.</span>
                    </li>
                  </ol>
                  <div className="mt-4 p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                    <p className="text-slate-300">
                      The initiative is rolled <span className="font-black text-blue-400">each round</span>, not just at the beginning of the game. This creates shifting tactical priorities and reflects the chaos of battle.
                    </p>
                  </div>
                  <div className="mt-4 p-4 bg-amber-900/30 rounded-lg border border-amber-500/30">
                    <p className="text-slate-300">
                      <span className="font-black text-amber-400">Tactical Consideration:</span> Winning initiative allows you to act first or force your opponent to reveal their plan. Choosing who goes first can be just as important as acting first.
                    </p>
                  </div>
                  <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                    <p className="text-slate-300 italic">
                      Note: Some special rules or scenario effects may modify Initiative rolls or grant bonuses to certain factions.
                    </p>
                  </div>
                </div>

                {/* Deployment Order and Range Rules */}
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-2xl font-black text-purple-300 mb-4 tracking-wide">Deployment Order and Range Rules</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Before the first round begins, both players deploy their warbands according to scenario instructions. Deployment impacts initial positioning, engagement potential, and early objectives.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-black text-purple-300 mb-3 tracking-wide">Deployment Order</h4>
                      <ol className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-purple-400 font-black mr-3 mt-1">1.</span>
                          <span className="text-slate-300">The scenario will indicate which player chooses their deployment zone first.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 font-black mr-3 mt-1">2.</span>
                          <span className="text-slate-300">Players then alternate placing units, one at a time, beginning with the player who did <span className="font-black text-purple-400">not</span> choose the deployment zone.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 font-black mr-3 mt-1">3.</span>
                          <span className="text-slate-300">All units must be deployed within the designated <span className="font-black text-purple-400">Deployment Zone</span>, unless otherwise stated (e.g., special rules like scouting or ambush).</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 font-black mr-3 mt-1">4.</span>
                          <span className="text-slate-300">Units must be placed fully within their zone and not in contact with enemy models or impassable terrain.</span>
                        </li>
                      </ol>
                    </div>

                    <div>
                      <h4 className="text-xl font-black text-purple-300 mb-3 tracking-wide">Range Rules</h4>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                          <span className="text-slate-300">All ranges are measured in inches (").</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                          <span className="text-slate-300">Range is always measured from the edge of the acting model's base to the edge of the target's base.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                          <span className="text-slate-300">If a model has multiple weapons or abilities with different ranges, each is measured independently.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                          <span className="text-slate-300">If a rule refers to "within X inches," this includes models at exactly X inches.</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                          <span className="text-slate-300"><span className="font-black text-purple-400">Line of Sight</span> (LoS) is required for most ranged attacks and abilities unless stated otherwise.</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-emerald-900/30 rounded-lg border border-emerald-500/30">
                    <p className="text-slate-300 italic">
                      <span className="font-black text-emerald-400">Example:</span> A unit with a 6'' ranged weapon may target an enemy unit as long as part of that enemy's base lies within 6'' and is visible to the attacker.
                    </p>
                  </div>
                  <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                    <p className="text-slate-300 italic">
                      Tip: Use clear measuring tools and always agree with your opponent on what constitutes line of sight before the game begins.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
} 