import { useState } from 'react';

const TURN_STRUCTURE_TABS = [
  { key: 'overview', label: 'Overview', icon: '📋' },
  { key: 'rounds', label: 'Game Rounds', icon: '🔄' },
  { key: 'activations', label: 'Unit Activations', icon: '⚡' },
  { key: 'actions', label: 'Actions & Types', icon: '🎯' },
  { key: 'defensive', label: 'Defensive Stances', icon: '🛡️' },
];

export default function TurnStructurePage() {
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
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400 mb-4 tracking-wider">
              ⏱️ Turn Structure
            </h1>
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-indigo-400/20 via-blue-400/20 to-cyan-400/20 blur-xl rounded-full"></div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 mx-auto rounded-full shadow-lg shadow-indigo-500/50"></div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg overflow-hidden">
            {TURN_STRUCTURE_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-3 font-black text-lg tracking-wide flex items-center gap-2 transition-all duration-200 border-r border-slate-700/40 last:border-r-0
                  ${activeTab === tab.key
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-700 text-white shadow-xl shadow-indigo-900/30'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-indigo-300'}
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
                <span className="text-indigo-400 mr-3">📋</span>
                Turn Structure Overview
              </h2>
              
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p className="text-lg">
                  Ashes of Varnhal uses an <span className="font-black text-indigo-400">alternating activation</span> system that creates dynamic, tactical gameplay. Instead of one player activating their entire warband, players take turns activating one unit at a time, creating constant counterplay opportunities.
                </p>
                
                <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/50 rounded-xl p-6 border-l-4 border-indigo-500">
                  <h3 className="text-2xl font-black text-indigo-300 mb-4 tracking-wide">Key Concepts</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-indigo-400">Alternating Activations:</span> Players activate units one at a time, not entire warbands</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-indigo-400">Action Points:</span> Units spend AP to perform actions during their activation</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-indigo-400">Round Structure:</span> Complete rounds with cleanup phases between</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300"><span className="font-black text-indigo-400">Defensive Stances:</span> Overwatch and Dodge provide tactical defensive options</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500">
                  <h3 className="text-2xl font-black text-amber-300 mb-4 tracking-wide">Tactical Importance</h3>
                  <p className="text-slate-300 leading-relaxed">
                    The alternating activation system creates constant counterplay. Timing and sequencing are critical—consider your opponent's next move before choosing your own. This system rewards tactical thinking and punishes poor positioning.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'rounds' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-indigo-400 mr-3">🔄</span>
                Game Rounds and Phases
              </h2>
              
              <div className="space-y-8">
                {/* Alternating Activations */}
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-2xl font-black text-blue-300 mb-4 tracking-wide">Alternating Activations</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Ashes of Varnhal uses an <span className="font-black text-blue-400">alternating activation</span> system. Instead of one player activating their entire warband, players take turns activating one unit at a time.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-blue-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">At the start of each round, the player who has initiative chooses who activates a unit first.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Players then alternate activating a single unit from their warband until all units have been activated once.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">A unit may only be activated once per round.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">If one player has more units remaining than the other, they may take multiple activations at the end of the round after their opponent has no eligible units left.</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                    <p className="text-slate-300 italic">
                      <span className="font-black text-blue-400">Example:</span> Player A activates a ranged unit and shoots a nearby enemy. Player B may then respond by activating a melee unit to charge in retaliation before the next ranged attack occurs.
                    </p>
                  </div>
                </div>

                {/* End of Round Cleanup */}
                <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-2xl font-black text-purple-300 mb-4 tracking-wide">End of Round Cleanup</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    At the end of each round, follow these steps to prepare for the next:
                  </p>
                  <ol className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-purple-400 font-black mr-3 mt-1">1.</span>
                      <span className="text-slate-300"><span className="font-black text-purple-400">Remove Temporary Effects:</span> Clear all effects that last "until the end of the round" (e.g., buffs, debuffs, or power effects that expire).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 font-black mr-3 mt-1">2.</span>
                      <span className="text-slate-300"><span className="font-black text-purple-400">Resolve Ongoing Effects:</span> Apply lingering damage (e.g., Bleed or Burning), Vigor tests, or other persistent conditions.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 font-black mr-3 mt-1">3.</span>
                      <span className="text-slate-300"><span className="font-black text-purple-400">Check for Morale Triggers:</span> If any warband has taken significant losses, assess whether Morale Tests are needed (see Morale rules).</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 font-black mr-3 mt-1">4.</span>
                      <span className="text-slate-300"><span className="font-black text-purple-400">Reset Activated Status:</span> Mark all units as unactivated for the next round.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-purple-400 font-black mr-3 mt-1">5.</span>
                      <span className="text-slate-300"><span className="font-black text-purple-400">Refresh Initiative:</span> Roll again if the scenario allows or if it's a new round.</span>
                    </li>
                  </ol>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'activations' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-indigo-400 mr-3">⚡</span>
                Activating Units
              </h2>
              
              <div className="space-y-8">
                {/* Declaration and Action Spending */}
                <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border-l-4 border-emerald-500">
                  <h3 className="text-2xl font-black text-emerald-300 mb-4 tracking-wide">Declaration and Action Spending</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    When a unit is activated, it may perform actions by spending its available Action Points (AP). Most units begin with 2 AP unless modified by effects or traits.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">The controlling player must declare all actions for the unit before resolving them.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Actions can be performed in any order, but no action may be taken more than once unless a special rule states otherwise.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Units cannot save or transfer unused Action Points. Unspent AP is lost at the end of the unit's activation.</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                    <p className="text-slate-300 italic">
                      <span className="font-black text-emerald-400">Example:</span> A unit with 2 AP may move and shoot, or move twice, or use a special ability and then move, depending on available options.
                    </p>
                  </div>
                  
                  <div className="mt-4 p-4 bg-amber-900/30 rounded-lg border border-amber-500/30">
                    <p className="text-slate-300">
                      <span className="font-black text-amber-400">Note:</span> Some actions (such as Overwatch) explicitly end a unit's activation and prevent further actions.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'actions' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-indigo-400 mr-3">🎯</span>
                Types of Actions
              </h2>
              
              <div className="space-y-6">
                <p className="text-slate-300 leading-relaxed text-lg">
                  Units may spend Action Points on the following standard actions unless otherwise restricted:
                </p>

                <div className="grid gap-4">
                  <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border-l-4 border-blue-500">
                    <h3 className="text-xl font-black text-blue-300 mb-2 tracking-wide">Move</h3>
                    <p className="text-slate-300">Move up to the unit's full Movement value in inches.</p>
                  </div>

                  <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-red-500">
                    <h3 className="text-xl font-black text-red-300 mb-2 tracking-wide">Charge</h3>
                    <p className="text-slate-300">Move up to the unit's full Movement value in inches and end in base contact with enemy unit. Gain +1 Dice to Attack Rolls made with melee weapons in this turn.</p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-900/50 to-amber-900/50 rounded-xl p-6 border-l-4 border-orange-500">
                    <h3 className="text-xl font-black text-orange-300 mb-2 tracking-wide">Attack</h3>
                    <p className="text-slate-300">Make one attack with an equipped weapon. A unit may only attack once per activation unless a rule states otherwise.</p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-purple-500">
                    <h3 className="text-xl font-black text-purple-300 mb-2 tracking-wide">Use Power</h3>
                    <p className="text-slate-300">Spend 1 Action to use an available ability (casters only).</p>
                  </div>

                  <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-6 border-l-4 border-green-500">
                    <h3 className="text-xl font-black text-green-300 mb-2 tracking-wide">Dodge</h3>
                    <p className="text-slate-300">Adopt a defensive stance until the start of your next activation. You may make a Dodge Test (target 4+) the next time you are attacked this round.</p>
                  </div>

                  <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl p-6 border-l-4 border-cyan-500">
                    <h3 className="text-xl font-black text-cyan-300 mb-2 tracking-wide">Overwatch</h3>
                    <p className="text-slate-300">End your activation and enter Overwatch stance (see Defensive Stances).</p>
                  </div>

                  <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-yellow-500">
                    <h3 className="text-xl font-black text-yellow-300 mb-2 tracking-wide">Interact</h3>
                    <p className="text-slate-300">Perform a mission-specific or terrain interaction (e.g., opening a gate, seizing a relic).</p>
                  </div>

                  <div className="bg-gradient-to-r from-teal-900/50 to-cyan-900/50 rounded-xl p-6 border-l-4 border-teal-500">
                    <h3 className="text-xl font-black text-teal-300 mb-2 tracking-wide">Recover</h3>
                    <p className="text-slate-300">Remove one negative condition from the unit (e.g., Burning, Pinned, Suppressed). Cannot be used while engaged unless stated otherwise.</p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-slate-700/50 to-gray-700/50 rounded-xl p-6 border-l-4 border-slate-500">
                  <p className="text-slate-300 leading-relaxed">
                    <span className="font-black text-slate-400">Note:</span> Some actions may be replaced or extended by powers, traits, or equipment effects. Special actions are defined per scenario or unit.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'defensive' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-indigo-400 mr-3">🛡️</span>
                Overwatch and Dodge Stance
              </h2>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-slate-700/50 to-gray-700/50 rounded-xl p-6 border-l-4 border-slate-500">
                  <p className="text-slate-300 leading-relaxed">
                    There are no Reactions in Ashes of Varnhal. However, specific defensive stances can be taken as actions during a unit's activation:
                  </p>
                </div>

                {/* Overwatch */}
                <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl p-6 border-l-4 border-cyan-500">
                  <h3 className="text-2xl font-black text-cyan-300 mb-4 tracking-wide">Overwatch (1 Action, Ends Activation)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-cyan-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">The unit enters an alert state, scanning the battlefield.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">If any enemy ends a Movement action within Line of Sight and within range of a weapon held by the overwatching unit, it may immediately make one ranged attack.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-cyan-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">After firing, the unit leaves Overwatch and does not react again this round.</span>
                    </li>
                  </ul>
                </div>

                {/* Dodge */}
                <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-xl p-6 border-l-4 border-green-500">
                  <h3 className="text-2xl font-black text-green-300 mb-4 tracking-wide">Dodge (1 Action)</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="text-green-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Until the start of its next activation, the unit may attempt a Dodge Test the next time it is attacked.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Roll dice equal to your Defense. On a successful test (4+ total), ignore the result of enemy attack.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Dodge stance ends and Dodge cannot be used again this turn.</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500">
                  <h3 className="text-2xl font-black text-amber-300 mb-4 tracking-wide">Tactical Considerations</h3>
                  <p className="text-slate-300 leading-relaxed">
                    These defensive options offer limited but tactical choices for battlefield control. Units may not use both Dodge and Overwatch in the same activation. Choose wisely based on your tactical situation and opponent's likely actions.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
} 