import { useState } from 'react';

const COMBAT_TABS = [
  { key: 'movement', label: 'Movement Rules', icon: '🏃' },
  { key: 'combat', label: 'Combat Resolution', icon: '⚔️' },
  { key: 'powers', label: 'Using Powers', icon: '✨' },
  { key: 'damage', label: 'Damage Resolution', icon: '💀' },
];

export default function CombatPage() {
  const [activeTab, setActiveTab] = useState('movement');

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
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-rose-400 mb-4 tracking-wider">
              ⚔️ Actions & Combat
            </h1>
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-red-400/20 via-pink-400/20 to-rose-400/20 blur-xl rounded-full"></div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 mx-auto rounded-full shadow-lg shadow-red-500/50"></div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg overflow-hidden">
            {COMBAT_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-3 font-black text-lg tracking-wide flex items-center gap-2 transition-all duration-200 border-r border-slate-700/40 last:border-r-0
                  ${activeTab === tab.key
                    ? 'bg-gradient-to-r from-red-600 to-pink-700 text-white shadow-xl shadow-red-900/30'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-red-300'}
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
          {activeTab === 'movement' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-red-400 mr-3">🏃</span>
                Movement Rules
              </h2>
              
              {/* Terrain and Line of Sight */}
              <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border-l-4 border-blue-500 mb-8">
                <h3 className="text-2xl font-black text-blue-300 mb-4 tracking-wide">Terrain and Line of Sight</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  <span className="font-black text-blue-400">Terrain</span> affects movement, cover, and line of sight during gameplay. Different types of terrain influence how units can move and defend.
                </p>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  For exact rules regarding different types of terrain, see section 3.1 - Terrain types
                </p>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  <span className="font-black text-blue-400">Line of Sight (LoS)</span> is required for ranged attacks and many abilities.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-blue-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">LoS is determined by an unobstructed straight line from any part of the attacking model's base to any part of the target model's base.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Blocking terrain or other units block LoS.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Elevation differences must be considered; units on higher terrain may see over some obstacles.</span>
                  </li>
                </ul>
              </div>

              {/* Climbing, Jumping, Falling */}
              <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500">
                <h3 className="text-2xl font-black text-amber-300 mb-4 tracking-wide">Climbing, Jumping, Falling</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Some terrain features require units to climb or jump to traverse.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-amber-400">Climbing:</span> Units must spend 2 Actions to climb vertical surfaces or obstacles. Movement during climbing is halved.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-amber-400">Jumping:</span> Units may spend 1 Action to jump over gaps or low obstacles up to 3'' wide.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-amber-400">Falling:</span> If a unit falls from a height of 3'' or more, it suffers 1 Wound and must pass a Vigor Test (target 4+) to avoid being Staggered.</span>
                  </li>
                </ul>
                <p className="text-slate-300 mt-4 leading-relaxed">
                  Units cannot move normally while climbing or jumping, and these actions consume available Actions. Special abilities or equipment may modify these rules.
                </p>
              </div>
            </section>
          )}

          {activeTab === 'combat' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-red-400 mr-3">⚔️</span>
                Combat Resolution
              </h2>

              {/* Ranged vs Melee */}
              <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-red-500 mb-8">
                <h3 className="text-2xl font-black text-red-300 mb-4 tracking-wide">Ranged vs. Melee</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Combat in <span className="font-black text-red-400">Ashes of Varnhal</span> is resolved through ranged and melee attacks. Both follow similar core mechanics but differ in range and conditions:
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-red-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-red-400">Ranged Combat:</span> Attacks made using ranged weapons from a distance. Requires line of sight and within weapon range.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-red-400">Melee Combat:</span> Close-quarters combat performed when a model is adjacent (0'' range) to an enemy unit.</span>
                  </li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  Ranged attacks can be made during a unit's activation if the target is within the weapon's range and line of sight. Melee attacks require the attacker to be in base contact with the target.
                </p>
              </div>

              {/* Attack Rolls and Defense */}
              <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl p-6 border-l-4 border-purple-500 mb-8">
                <h3 className="text-2xl font-black text-purple-300 mb-4 tracking-wide">Attack Rolls and Defense</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  When making an attack, follow these steps:
                </p>
                <ol className="space-y-3 mb-4">
                  <li className="flex items-start">
                    <span className="text-purple-400 font-black mr-3 mt-1">1.</span>
                    <span className="text-slate-300"><span className="font-black text-purple-400">Roll Attack Dice:</span> Roll a number of dice equal to the attacking weapon's dice pool.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-black mr-3 mt-1">2.</span>
                    <span className="text-slate-300"><span className="font-black text-purple-400">Calculate Successes:</span> Each die result of 4 or higher counts as a success, 6 counts as a Critical success and triggers weapon special rules.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-black mr-3 mt-1">3.</span>
                    <span className="text-slate-300"><span className="font-black text-purple-400">Compare to Defense:</span> The target's Defense stat reduces the number of successes from the attack.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-400 font-black mr-3 mt-1">4.</span>
                    <span className="text-slate-300"><span className="font-black text-purple-400">Apply Damage:</span> Each remaining success inflicts 1 damage, critical success 1 damage + damage according to the weapon's Crit Damage value.</span>
                  </li>
                </ol>
                <p className="text-slate-300 leading-relaxed">
                  If the attack inflicts Wounds equal to or greater than the target's current Wounds, the target is removed from play.
                </p>
              </div>

              {/* Cover and Line of Sight */}
              <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border-l-4 border-emerald-500">
                <h3 className="text-2xl font-black text-emerald-300 mb-4 tracking-wide">Cover and Line of Sight</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  <span className="font-black text-emerald-400">Cover</span> provides defensive bonuses and affects combat outcomes:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Units fully or partially behind cover gain +1 to their Defense stat.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Some cover may completely block line of sight and cannot be targeted unless the attacker moves around it.</span>
                  </li>
                </ul>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  <span className="font-black text-emerald-400">Line of Sight (LoS)</span> determines whether an attacker can target an enemy:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">An unobstructed straight line from any part of the attacker's base to any part of the target's base is required.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Terrain, other units, and elevation changes can block or grant LoS.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">If LoS is blocked, the attack cannot be made.</span>
                  </li>
                </ul>
              </div>
            </section>
          )}

          {activeTab === 'powers' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-red-400 mr-3">✨</span>
                Using Powers
              </h2>

              {/* Power Stat and Activation */}
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-purple-500 mb-8">
                <h3 className="text-2xl font-black text-purple-300 mb-4 tracking-wide">Power Stat and Activation</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Units with a <span className="font-black text-purple-400">Power</span> stat greater than 0 may use one or more Powers during their activation. The Power stat determines the maximum number of different Powers a unit may use per activation.
                </p>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Each Power costs 1 Action to use unless stated otherwise.
                </p>
                <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                  <p className="text-slate-300 italic">
                    Example: A unit with Power 2 may use up to two Powers during its activation, provided it has the Actions to do so.
                  </p>
                </div>
              </div>

              {/* Power Tests */}
              <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/50 rounded-xl p-6 border-l-4 border-indigo-500 mb-8">
                <h3 className="text-2xl font-black text-indigo-300 mb-4 tracking-wide">Power Tests</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  To use a Power, roll a number of dice equal to the unit's <span className="font-black text-indigo-400">Power</span> stat. Evaluate the result using the standard dice system:
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-indigo-400">1:</span> Critical Fail – subtracts 1 success</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-indigo-400">2–3:</span> No effect</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-indigo-400">4–5:</span> Counts as 1 success</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-indigo-400">6:</span> Counts as 2 successes</span>
                  </li>
                </ul>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Compare the total number of successes to the thresholds listed in the Power's description:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-indigo-400">Base Effect:</span> Triggered on 1+ success</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-indigo-400">Overdrive Effects:</span> Trigger at 2+, 3+, or 4+ successes</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-indigo-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-indigo-400">Backlash:</span> Triggered by each die that rolls a <span className="font-black text-indigo-400">1</span></span>
                  </li>
                </ul>
              </div>

              {/* Resolve and Power Resistance */}
              <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500 mb-8">
                <h3 className="text-2xl font-black text-amber-300 mb-4 tracking-wide">Resolve and Power Resistance</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  If a Power directly targets an enemy unit, that unit may attempt to resist it using a <span className="font-black text-amber-400">Resolve Test</span>.
                </p>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Roll a number of dice equal to the target's Resolve stat.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Each result of <span className="font-black text-amber-400">1</span> counts as <span className="font-black text-amber-400">1 extra success</span> added to the caster's total (due to feedback).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Each result of <span className="font-black text-amber-400">4–5</span> subtracts 1 success from the caster's result.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Each <span className="font-black text-amber-400">6</span> subtracts 2 successes.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Results of 2–3 do nothing.</span>
                  </li>
                </ul>
                <p className="text-slate-300 leading-relaxed">
                  The adjusted total determines which Overdrive or base effect is applied.
                </p>
                <div className="mt-4 p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                  <p className="text-slate-300 italic">
                    Note: Powers that affect only friendly units or the battlefield directly do not trigger Resolve tests.
                  </p>
                </div>
              </div>

              {/* Backlash Rules */}
              <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-red-500 mb-8">
                <h3 className="text-2xl font-black text-red-300 mb-4 tracking-wide">Backlash Rules</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Each die that rolls a <span className="font-black text-red-400">1</span> during a Power Test causes a <span className="font-black text-red-400">Backlash</span>. The effects vary between Powers, but always represent danger to the caster—such as wounds, loss of Action, or becoming affected by their own powers.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  Some Powers scale backlash severity with the number of 1s rolled.
                </p>
              </div>

              {/* Additional Notes */}
              <div className="bg-gradient-to-r from-slate-700/50 to-gray-700/50 rounded-xl p-6 border-l-4 border-slate-500">
                <h3 className="text-2xl font-black text-slate-300 mb-4 tracking-wide">Additional Notes</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-slate-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Powers are not attacks and cannot be blocked by cover or armor unless explicitly stated.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Powers may not normally be used while engaged in melee unless the Power specifies otherwise.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Powers cannot be "stored" or delayed—effects resolve immediately.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-slate-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">A unit cannot use the same Power more than once per activation unless the Power says otherwise.</span>
                  </li>
                </ul>
              </div>
            </section>
          )}

          {activeTab === 'damage' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-red-400 mr-3">💀</span>
                Damage Resolution
              </h2>

              {/* Wounds, Resolve Tests */}
              <div className="bg-gradient-to-r from-red-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-red-500 mb-8">
                <h3 className="text-2xl font-black text-red-300 mb-4 tracking-wide">Wounds, Resolve Tests</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  Units have a set number of Wounds representing their health. When a unit takes damage, Wounds are deducted accordingly.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <span className="font-black text-red-400">Resolve Tests</span> are made when certain effects or powers attempt to reduce harm the targeted unit. The target unit rolls a number of dice equal to its Resolve stat. Each success reduces the effect's potency by 1 point. On a roll of 1, power is counted as having one success more.
                </p>
              </div>

              {/* Overkill and Unit Death */}
              <div className="bg-gradient-to-r from-gray-900/50 to-slate-900/50 rounded-xl p-6 border-l-4 border-gray-500 mb-8">
                <h3 className="text-2xl font-black text-gray-300 mb-4 tracking-wide">Overkill and Unit Death</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  If a unit loses all its Wounds, it is removed from play and considered dead.
                </p>
                <p className="text-slate-300 leading-relaxed">
                  <span className="font-black text-gray-400">Overkill</span> refers to damage dealt beyond the unit's remaining Wounds. This extra damage is discarded and does not carry over.
                </p>
              </div>

              {/* Vigor Tests */}
              <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border-l-4 border-emerald-500">
                <h3 className="text-2xl font-black text-emerald-300 mb-4 tracking-wide">Vigor Tests</h3>
                <p className="text-slate-300 mb-4 leading-relaxed">
                  A <span className="font-black text-emerald-400">Vigor Test</span> is a resilience-type test used to resist certain negative effects (such as Staggered, Burning, or other conditions).
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">To perform a Vigor Test, roll a number of dice equal to the unit's Vigor stat.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Successes are counted on dice results of 4 or higher.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Each success reduces the effect or prevents its application.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">Critical dice results (6s) count as 2 successes, and 1s count as -1 success.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-emerald-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300">The minimum success count is zero (failures cannot reduce successes below zero).</span>
                  </li>
                </ul>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
} 