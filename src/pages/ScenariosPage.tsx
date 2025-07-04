import { useState } from 'react';

const SCENARIO_TABS = [
  { key: 'core', label: 'Core Scenarios', icon: '🎲' },
  { key: 'heroic', label: 'Heroic Scenarios', icon: '👑' },
];

const CORE_SCENARIOS = [
  {
    key: 'relic-cache-raid',
    title: '1. Relic Cache Raid',
    overview: 'Hidden caches of forgotten technology lie buried beneath the ash. Both warbands seek to uncover and secure as many as possible.',
    objective: 'Search and control scattered relic markers to score points.',
    deployment: "Standard opposing table edge deployment, 6'' from each edge. Place 5 Relic Markers across the centerline, at least 6'' apart.",
    special: [
      'Searching (1 Action): A unit in base contact with a Relic Marker may spend 1 Action to roll 1d6. On a 4+, the cache is found—replace the marker with a "Recovered Cache" token.',
      "Controlling: A Recovered Cache is controlled if a friendly unit is within 2'' and no enemy is closer."
    ],
    victory: '1 VP per Recovered Cache controlled at the end of the game. Most VP wins.'
  },
  {
    key: 'hunt-the-weak',
    title: '2. Hunt the Weak',
    overview: 'One side must protect a critical asset or injured soldier, while the other moves in for the kill.',
    objective: 'Kill or protect a specific unit designated as the Prey.',
    deployment: "Defender sets up anywhere within an 8''x8'' center zone. Attacker deploys anywhere 6'' from table edges.",
    special: [
      'Defender designates one unit as the Prey. That unit gains +1 Morale for the duration of the game.',
      'If the Prey unit is killed, attacker gains 3 VP. If it survives, defender gains 3 VP.'
    ],
    victory: 'Most VP wins.'
  },
  {
    key: 'burn-the-beacon',
    title: '3. Burn the Beacon',
    overview: 'A vital communication relay must be secured before reinforcements can be summoned—or intercepted.',
    objective: 'Light or destroy the signal beacon in the center of the battlefield.',
    deployment: "Opposing corners, 6'' in from table edges.",
    special: [
      'Place a Signal Beacon marker in the center of the table.',
      'A unit in base contact may spend 2 Actions to either Light (Defender) or Destroy (Attacker) the beacon.'
    ],
    victory: [
      '3 VP to the side that successfully activates the Beacon for their purpose.',
      '1 VP per enemy unit removed.',
      'If neither succeeds, the game is a draw.'
    ]
  },
  {
    key: 'shattered-column',
    title: '4. Shattered Column',
    overview: 'After a surprise assault, each warband finds itself scattered and disoriented.',
    objective: 'Regroup and eliminate the enemy under difficult circumstances.',
    deployment: "Players alternate placing units within randomly assigned 6''x6'' scatter zones (roll 1d6 per unit, place in that numbered zone on a 3×3 grid).",
    special: [
      "Units may not activate within 3'' of another friendly unit during the first round.",
      "Units suffer –1 Morale until they end a turn within 4'' of another friendly unit."
    ],
    victory: "Standard kill points. 1 VP per enemy unit removed. Bonus 1 VP if you regroup at least 3 units in a single 8'' radius."
  },
  {
    key: 'fog-and-flame',
    title: '5. Fog and Flame',
    overview: 'Swirling ash and flickering embers limit vision. Movement is perilous.',
    objective: 'Eliminate the enemy while navigating a treacherous environment.',
    deployment: 'Standard opposing table edge deployment.',
    special: [
      "Heavy Fog: Line of sight is limited to 8'' unless firing from Elevated Terrain.",
      'Random Embers: At the start of each round, roll 1D6. On a 4+, choose one terrain feature—it becomes Blazing: any unit ending its activation within it suffers 1 Wound.'
    ],
    victory: [
      '1 VP per enemy unit removed.',
      '2 VP if your Leader survives to the end.'
    ]
  },
  {
    key: 'ashes-call-to-ashes',
    title: '6. Ashes Call to Ashes',
    overview: "A pulsing relic at the battlefield's heart promises power—or doom.",
    objective: 'Control the central Ash Core or use it for a desperate, explosive gambit.',
    deployment: "Opposing table edges. Place the Ash Core in the exact center.",
    special: [
      'Activate the Core (1 Action): A unit in base contact may attempt to interact. Roll 1d6:',
      '1–2: Unit suffers 1 Wound.',
      '3–5: Gain 1 VP.',
      "6: You may detonate the core—deal 2 Wounds to all units within 4''.",
      'You may only attempt to activate once per unit per game.'
    ],
    victory: [
      '1 VP per enemy unit removed.',
      '1 VP per successful Core activation.',
      '+2 VP if you trigger the detonation.'
    ]
  },
];

const HEROIC_SCENARIOS = [
  {
    key: 'heros-ascent',
    title: '6. Hero\'s Ascent',
    overview: 'A forsaken ruin holds remnants of a lost prototype or sacred rite. Both warbands seek it—one to preserve, the other to seize. Only through triumph here may a Hero rise.',
    objective: 'Secure the central structure and hold it at the end of the game. The victor earns the right to unlock a Hero slot.',
    deployment: "Opposing corners (9'' triangle deployment zones). Place a central Objective Marker (the 'Ascension Node') at the center of the board.",
    special: [
      "Ascension Node: At the end of the game, if a unit is within 2'' of the node and no enemies are within 2'', that warband claims it.",
      'Reactive Core: Starting Round 2, the Ascension Node pulses with unstable energy. At the start of each round, roll 1D6:',
      '1–3: Nothing happens.',
      "4–5: All units within 3'' of the node suffer 1 Wound.",
      '6: The unit closest to the node gains +1 Power Point this round.',
      'Focused Violence: No VP for kills. The goal is control, not slaughter.'
    ],
    victory: [
      "The warband that controls the Ascension Node at game's end gains 1 Victory Point and unlocks the ability to recruit a Hero by spending CP (following standard rules).",
      'If tied, no Hero slot is gained.',
      'Winner does not roll for Salvage, as they are too busy with preparations for the arriving Hero.',
      'The other warband may roll Salvage as usual.'
    ]
  }
];

const OPTIONAL_SCENARIO_TABLE = [
  { roll: 1, scenario: 'Relic Cache Raid' },
  { roll: 2, scenario: 'Hunt the Weak' },
  { roll: 3, scenario: 'Burn the Beacon' },
  { roll: 4, scenario: 'Shattered Column' },
  { roll: 5, scenario: 'Fog and Flame' },
  { roll: 6, scenario: "Hero's Ascent (special scenario, winner unlocks Hero slot)" },
];

export default function ScenariosPage() {
  const [activeTab, setActiveTab] = useState('core');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Gothic background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="max-w-4xl mx-auto p-8 relative z-10">
        <div className="mb-12 text-center">
          <div className="relative">
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 mb-4 tracking-wider">
              📜 Scenarios & Missions
            </h1>
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-cyan-400/20 blur-xl rounded-full"></div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 mx-auto rounded-full shadow-lg shadow-emerald-500/50"></div>
          <p className="mt-6 text-slate-400 text-lg max-w-2xl mx-auto">
            Browse the available scenarios for Ashes of Varnhal. Each scenario includes objectives, deployment, special rules, and victory conditions. Use these lists to select or randomize your next mission.
          </p>
        </div>
        {/* Tabs Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg overflow-hidden">
            {SCENARIO_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-3 font-black text-lg tracking-wide flex items-center gap-2 transition-all duration-200 border-r border-slate-700/40 last:border-r-0
                  ${activeTab === tab.key
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-900/30'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-emerald-300'}
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
          {activeTab === 'core' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-cyan-400 mr-3">🎲</span>
                Core Scenarios
              </h2>
              <div className="space-y-10">
                {CORE_SCENARIOS.map(scenario => (
                  <div key={scenario.key} className="bg-slate-800/60 rounded-xl p-6 border border-cyan-700/30 shadow-lg">
                    <h3 className="text-2xl font-black text-cyan-300 mb-2 tracking-wide">{scenario.title}</h3>
                    <div className="mb-2 text-slate-300"><span className="font-black text-cyan-400">Overview:</span> {scenario.overview}</div>
                    <div className="mb-2 text-slate-300"><span className="font-black text-cyan-400">Objective:</span> {scenario.objective}</div>
                    <div className="mb-2 text-slate-300"><span className="font-black text-cyan-400">Deployment:</span> {scenario.deployment}</div>
                    {scenario.special && (
                      <div className="mb-2 text-slate-300">
                        <span className="font-black text-cyan-400">Special Rules:</span>
                        <ul className="list-disc list-inside ml-6 mt-2">
                          {scenario.special.map((rule, i) => (
                            <li key={i}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {scenario.victory && (
                      <div className="mb-2 text-slate-300">
                        <span className="font-black text-cyan-400">Victory:</span>
                        {Array.isArray(scenario.victory) ? (
                          <ul className="list-disc list-inside ml-6 mt-2">
                            {scenario.victory.map((v, i) => (
                              <li key={i}>{v}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="ml-2">{scenario.victory}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          {activeTab === 'heroic' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-purple-400 mr-3">👑</span>
                Heroic Scenarios
              </h2>
              
              {/* Unlocking Hero Slots Section */}
              <div className="mb-10 bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-purple-500">
                <h3 className="text-2xl font-black text-purple-300 mb-4 tracking-wide">
                  Unlocking Hero Slots via Win Conditions
                </h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Heroic Scenarios represent pivotal battles or quests where warbands can earn the right to add powerful Hero units to their roster. Unlike standard matches, these scenarios have special objectives and increased stakes.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-purple-400">Trigger:</span> A Heroic Scenario is played either by player choice or drawn randomly from an Optional Scenario Table.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-purple-400">Win Condition:</span> The winning warband unlocks a Hero slot, allowing them to recruit a Hero unit by spending Creation Points (CP) at the start of their next roster building phase.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-purple-400">Balance:</span> To maintain fairness, Heroes unlocked via these scenarios count against the warband's total CP limit and are not guaranteed to be game-breaking due to their cost.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-purple-400">Accessibility:</span> Both sides have the opportunity to play Heroic Scenarios, ensuring no faction is excluded from Hero access.</span>
                  </li>
                </ul>
              </div>

              {/* Optional Scenario Table */}
              <div className="mb-10 bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500">
                <h3 className="text-2xl font-black text-amber-300 mb-4 tracking-wide">
                  Optional Scenario Table
                </h3>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  To add unpredictability and variety to campaigns, an Optional Scenario Table can be rolled on after each battle or at campaign milestones:
                </p>
                <div className="overflow-hidden rounded-xl border border-slate-600">
                  <table className="w-full">
                    <thead className="bg-gradient-to-r from-slate-700 to-slate-800">
                      <tr>
                        <th className="px-6 py-4 text-left text-white font-black text-lg tracking-wide">ROLL (1D6)</th>
                        <th className="px-6 py-4 text-left text-white font-black text-lg tracking-wide">SCENARIO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-600">
                      {OPTIONAL_SCENARIO_TABLE.map((row) => (
                        <tr key={row.roll} className="hover:bg-slate-700/50 transition-colors">
                          <td className="px-6 py-4 text-center">
                            <span className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-black text-lg rounded-full shadow-lg shadow-amber-500/25">
                              {row.roll}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-slate-300 leading-relaxed">{row.scenario}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Heroic Scenarios */}
              <div className="space-y-10">
                {HEROIC_SCENARIOS.map(scenario => (
                  <div key={scenario.key} className="bg-gradient-to-r from-purple-800/60 to-pink-800/60 rounded-xl p-6 border border-purple-700/30 shadow-lg">
                    <h3 className="text-2xl font-black text-purple-300 mb-2 tracking-wide">{scenario.title}</h3>
                    <div className="mb-2 text-slate-300"><span className="font-black text-purple-400">Overview:</span> {scenario.overview}</div>
                    <div className="mb-2 text-slate-300"><span className="font-black text-purple-400">Objective:</span> {scenario.objective}</div>
                    <div className="mb-2 text-slate-300"><span className="font-black text-purple-400">Deployment:</span> {scenario.deployment}</div>
                    {scenario.special && (
                      <div className="mb-2 text-slate-300">
                        <span className="font-black text-purple-400">Special Rules:</span>
                        <ul className="list-disc list-inside ml-6 mt-2">
                          {scenario.special.map((rule, i) => (
                            <li key={i}>{rule}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {scenario.victory && (
                      <div className="mb-2 text-slate-300">
                        <span className="font-black text-purple-400">Victory:</span>
                        {Array.isArray(scenario.victory) ? (
                          <ul className="list-disc list-inside ml-6 mt-2">
                            {scenario.victory.map((v, i) => (
                              <li key={i}>{v}</li>
                            ))}
                          </ul>
                        ) : (
                          <span className="ml-2">{scenario.victory}</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
} 