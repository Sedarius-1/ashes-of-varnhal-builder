import { useState } from 'react';
import { Link } from 'react-router-dom';
import fateCardsData from '../definitions/fateCards.json';

const FATE_CARDS_TABS = [
  { key: 'overview', label: 'Overview', icon: '📋' },
  { key: 'drawing', label: 'Drawing Cards', icon: '🎴' },
  { key: 'playing', label: 'Playing Cards', icon: '⚡' },
  { key: 'cards', label: 'Card List', icon: '🃏' },
  { key: 'synergy', label: 'Synergy & Rules', icon: '🔗' },
];

export default function FateCardsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const fateCardCount = Object.keys(fateCardsData).length;

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
            <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 mb-4 tracking-wider">
              🎴 Fate Cards
            </h1>
            <div className="absolute -top-2 -left-2 -right-2 -bottom-2 bg-gradient-to-r from-rose-400/20 via-pink-400/20 to-purple-400/20 blur-xl rounded-full"></div>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 mx-auto rounded-full shadow-lg shadow-rose-500/50"></div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-2xl bg-slate-800/80 border border-slate-700/60 shadow-lg overflow-hidden">
            {FATE_CARDS_TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-8 py-3 font-black text-lg tracking-wide flex items-center gap-2 transition-all duration-200 border-r border-slate-700/40 last:border-r-0
                  ${activeTab === tab.key
                    ? 'bg-gradient-to-r from-rose-600 to-pink-700 text-white shadow-xl shadow-rose-900/30'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80 hover:text-rose-300'}
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
                <span className="text-rose-400 mr-3">📋</span>
                Overview
              </h2>
              
              <div className="space-y-6 text-slate-300 leading-relaxed">
                <p className="text-lg">
                  Fate Cards represent unpredictable pulses of ash-born memory, machine echoes, or divine entropy that warp the battlefield. Drawn from a shuffled deck, they create temporary environmental effects, psychic surges, or unit-level distortions. Fate Cards introduce dynamic battlefield changes that reward adaptation and enhance the game's tension.
                </p>
                
                <div className="bg-gradient-to-r from-rose-900/50 to-pink-900/50 rounded-xl p-6 border-l-4 border-rose-500">
                  <p className="text-slate-300 leading-relaxed">
                    They are not campaign upgrades or persistent modifiers. Instead, they are fleeting anomalies—lasting a round or a turn—that affect the flow of play in unique, memorable ways.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'drawing' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-rose-400 mr-3">🎴</span>
                Drawing Fate Cards
              </h2>
              
              <div className="space-y-8">
                {/* Initial Draw */}
                <div className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 rounded-xl p-6 border-l-4 border-purple-500">
                  <h3 className="text-2xl font-black text-purple-300 mb-4 tracking-wide">Initial Draw</h3>
                  <p className="text-slate-300 leading-relaxed">
                    At the start of the battle, each player draws one Fate Card and keeps it face down. It may be played at any time during the game—typically as a surprise shift or reactive move.
                  </p>
                </div>

                {/* Additional Draws */}
                <div className="bg-gradient-to-r from-indigo-900/50 to-blue-900/50 rounded-xl p-6 border-l-4 border-indigo-500">
                  <h3 className="text-2xl font-black text-indigo-300 mb-4 tracking-wide">Additional Draws</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Fate Cards may be drawn mid-game through powers (e.g., Neural Shardbearer's Protocol: Fate-Shard Detonation) or scenario-specific rules. Unless otherwise stated, players may not draw more than one Fate Card per turn.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'playing' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-rose-400 mr-3">⚡</span>
                Playing a Fate Card
              </h2>
              
              <div className="space-y-6">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-rose-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-rose-400">Timing:</span> A player may choose to play a Fate Card at the start of any Round, during their activation, or in response to an enemy activation—depending on the card's instructions.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-rose-400">Targeting:</span> Some cards affect all units, others only enemies or friendlies, or zones of the battlefield.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-rose-400">Duration:</span> Unless specified otherwise, all Fate effects last until the end of the current Round.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-rose-400 font-black mr-3 mt-1">•</span>
                    <span className="text-slate-300"><span className="font-black text-rose-400">Limit:</span> Each player may only have one active Fate Card in play at a time.</span>
                  </li>
                </ul>

                <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500">
                  <h3 className="text-2xl font-black text-amber-300 mb-4 tracking-wide">Card Effects</h3>
                  <p className="text-slate-300 leading-relaxed">
                    Fate Cards provide one-shot modifiers. Effects range from mild buffs and terrain manipulation to punishing morale tests or weathering Wound spikes.
                  </p>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'cards' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-rose-400 mr-3">🃏</span>
                Card List
              </h2>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-emerald-900/50 to-teal-900/50 rounded-xl p-6 border-l-4 border-emerald-500">
                  <h3 className="text-2xl font-black text-emerald-300 mb-4 tracking-wide">Complete Fate Cards List</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed text-lg">
                    The complete list of <span className='font-black text-emerald-400'>{fateCardCount}</span> Fate Cards is available in the <span className="font-black text-emerald-400">Download</span> section. 
                    There you can browse all cards, search for specific effects, and download them in various formats for your gaming table.
                  </p>
                  
                  <div className="bg-slate-800/60 rounded-lg p-6 border border-slate-600 mb-6">
                    <h4 className="text-xl font-black text-emerald-300 mb-4 tracking-wide">Available Features:</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <span className="text-emerald-400 font-black mr-3 mt-1">✓</span>
                        <span className="text-slate-300">Complete list of all 30 Fate Cards with full descriptions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-400 font-black mr-3 mt-1">✓</span>
                        <span className="text-slate-300">Search functionality to find specific cards or effects</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-400 font-black mr-3 mt-1">✓</span>
                        <span className="text-slate-300">PDF download for print-ready cards</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-emerald-400 font-black mr-3 mt-1">✓</span>
                        <span className="text-slate-300">Reference guide perfect for gaming table use</span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    to="/fate-cards-list"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-lg tracking-wide rounded-xl shadow-lg shadow-emerald-500/25 border border-emerald-500/40 transition-all duration-200 hover:shadow-xl hover:shadow-emerald-500/40"
                  >
                    <span className="text-2xl">🎴</span>
                    View Complete Card List
                  </Link>
                </div>

                <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500">
                  <h3 className="text-2xl font-black text-amber-300 mb-4 tracking-wide">Card Categories</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Fate Cards can be categorized by their effects and targets:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-black text-amber-300 mb-2">Friendly Buffs</h4>
                      <p className="text-slate-300 text-sm">Cards that enhance your units' abilities, movement, or combat effectiveness.</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-black text-amber-300 mb-2">Enemy Debuffs</h4>
                      <p className="text-slate-300 text-sm">Cards that weaken enemy units, reduce their actions, or impose penalties.</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-black text-amber-300 mb-2">Environmental Effects</h4>
                      <p className="text-slate-300 text-sm">Cards that change battlefield conditions, line of sight, or terrain effects.</p>
                    </div>
                    <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                      <h4 className="font-black text-amber-300 mb-2">Special Actions</h4>
                      <p className="text-slate-300 text-sm">Cards that grant unique abilities, additional actions, or special effects.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeTab === 'synergy' && (
            <section className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-8 border border-slate-700/50 backdrop-blur-sm mb-10">
              <h2 className="text-3xl font-black text-slate-200 mb-8 flex items-center tracking-wide">
                <span className="text-rose-400 mr-3">🔗</span>
                Synergy With Powers
              </h2>
              
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-900/50 to-indigo-900/50 rounded-xl p-6 border-l-4 border-blue-500">
                  <h3 className="text-2xl font-black text-blue-300 mb-4 tracking-wide">Power Interactions</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    Certain caster units (such as the Neural Shardbearer) can trigger Fate effects directly from the deck. These effects always resolve immediately and may not be chosen—the top card of the deck is applied.
                  </p>
                  <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-600">
                    <p className="text-slate-300 italic">
                      <span className="font-black text-blue-400">Important:</span> When powers or rules state "draw and apply a Fate Card," it refers to this process: draw the top card of the Fate deck and resolve its effect immediately on the specified targets.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-amber-900/50 to-orange-900/50 rounded-xl p-6 border-l-4 border-amber-500">
                  <h3 className="text-2xl font-black text-amber-300 mb-4 tracking-wide">Optional Rules: Shared Deck</h3>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    In standard games players are encouraged to use a shared Fate Deck:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Randomly choose 12–16 Fate Cards at the start of the mission.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">Shuffle the newly created deck.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">All draws are from the same deck.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 font-black mr-3 mt-1">•</span>
                      <span className="text-slate-300">No reshuffling once the deck is empty.</span>
                    </li>
                  </ul>
                  <p className="text-slate-300 mt-4 leading-relaxed">
                    This variant increases drama and encourages timing plays, as players can't rely on fixed access to card types.
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