import { useState } from 'react';

const SPECIAL_RULES_TABS = [
  { key: 'critical-effects', label: 'Critical Effects', icon: '🎯' },
  { key: 'status-conditions', label: 'Status Conditions', icon: '⚡' },
];

const STATUS_CONDITIONS = [
  {
    name: 'Slowed',
    effect: 'Unit\'s Movement is reduced by 2\'\' (minimum 1\'\') until the end of the current round.',
    color: 'blue'
  },
  {
    name: 'Suppressed',
    effect: 'Unit suffers –1 Action on its next activation.',
    color: 'purple'
  },
  {
    name: 'Burning',
    effect: 'Unit takes 1 Wound at the end of its next activation unless it spends 1 Action to extinguish the effect.',
    color: 'red'
  },
  {
    name: 'Staggered',
    effect: 'Unit suffers –1 Defense until the start of its next turn.',
    color: 'yellow'
  },
  {
    name: 'Poisoned',
    effect: 'Unit suffers –1 Action on its next activation and takes 1 Wound at the start of its following activation.',
    color: 'green'
  }
];

const getStatusColor = (color: string) => {
  switch (color) {
    case 'blue': return 'from-blue-500 to-cyan-500';
    case 'purple': return 'from-purple-500 to-pink-500';
    case 'red': return 'from-red-500 to-orange-500';
    case 'yellow': return 'from-yellow-500 to-amber-500';
    case 'green': return 'from-green-500 to-emerald-500';
    default: return 'from-slate-500 to-gray-500';
  }
};

export default function SpecialRulesPage() {
  const [activeTab, setActiveTab] = useState('critical-effects');

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
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 mb-4 tracking-wider">
              🔮 Special Rules & Traits
            </h1>
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-cyan-400/20 via-blue-400/20 to-indigo-400/20 blur-xl rounded-full"></div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 mx-auto rounded-full shadow-lg shadow-cyan-500/50"></div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg overflow-hidden">
            {SPECIAL_RULES_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-3 font-black text-lg tracking-wide flex items-center gap-2 transition-all duration-200 border-r border-slate-700/40 last:border-r-0
                  ${activeTab === tab.key
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-xl shadow-cyan-900/30'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-cyan-300'}
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
          {activeTab === 'critical-effects' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-cyan-400 mr-3">🎯</span>
                Critical Effects
              </h2>
              
              <div className="space-y-8">
                <p className="text-slate-300 leading-relaxed text-lg">
                  Critical effects occur when an attack roll achieves a critical success, triggering special additional effects defined by the weapon or ability used.
                </p>

                {/* Crit Effects by Weapon */}
                <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl p-6 border-l-4 border-cyan-500">
                  <h3 className="text-2xl font-black text-cyan-300 mb-4 tracking-wide">Crit Effects by Weapon</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Each weapon has its own unique critical effect, detailed in the weapon's profile. For example, some weapons may cause extra damage, inflict conditions like Stun or Bleed, or impose movement penalties on the target.
                  </p>
                </div>

                {/* Stacking and Trigger Timing */}
                <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-xl p-6 border-l-4 border-indigo-500">
                  <h3 className="text-2xl font-black text-indigo-300 mb-4 tracking-wide">Stacking and Trigger Timing</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    If multiple critical effects occur simultaneously, they resolve in the order declared by the attacker. Unless specified otherwise, critical effects do not stack; identical effects applied multiple times overwrite previous instances.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Timing of when effects trigger is governed by the weapon or ability description, typically occurring immediately after a successful critical hit.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'status-conditions' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-cyan-400 mr-3">⚡</span>
                Status Conditions
              </h2>
              
              <div className="space-y-8">
                <p className="text-slate-300 leading-relaxed text-lg">
                  Status conditions represent temporary effects that impact units during the game. These conditions can alter movement, actions, defenses, or cause damage over time.
                </p>

                {/* Common Status Conditions */}
                <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 rounded-xl p-6 border-l-4 border-cyan-500">
                  <h3 className="text-2xl font-black text-cyan-300 mb-6 tracking-wide">Common Status Conditions</h3>
                  <div className="grid gap-4">
                    {STATUS_CONDITIONS.map((condition, index) => (
                      <div key={index} className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getStatusColor(condition.color)}`}></div>
                          <h4 className="text-xl font-black text-slate-200 tracking-wide">{condition.name}</h4>
                        </div>
                        <p className="text-slate-300 leading-relaxed">{condition.effect}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Vigor Tests and Status Resistance */}
                <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border-l-4 border-emerald-500">
                  <h3 className="text-2xl font-black text-emerald-300 mb-4 tracking-wide">Vigor Tests and Status Resistance</h3>
                  <p className="text-slate-300 leading-relaxed">
                    When targeted by a status condition, a unit may be required to perform a <span className="font-black text-emerald-400">Vigor Test</span> to resist or reduce the effect. The Vigor Test involves rolling a number of dice equal to the Vigor stat of the unit, with successes that reduce or negate the impact of the condition as specified by the effect.
                  </p>
                </div>

                {/* Removal and Recovery Rules */}
                <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500">
                  <h3 className="text-2xl font-black text-amber-300 mb-4 tracking-wide">Removal and Recovery Rules</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Status conditions typically last until a specified time such as the end of the round or the unit's next activation. Some conditions can be removed early by spending an Action or through specific abilities.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Units may remove <span className="font-black text-amber-400">Burning</span> by forfeiting 1 Action during their activation.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Other conditions usually expire naturally after the duration specified.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Some powers or abilities can remove or reduce status effects.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Vigor test may be taken after the activation to attempt to remove the status.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
} 