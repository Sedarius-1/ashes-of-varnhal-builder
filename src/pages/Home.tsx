import { Link, useParams, useNavigate } from 'react-router-dom';
import factionsData from '../definitions/factions.json';
import type { FactionData } from '../types/factionData';
import { useState } from 'react';

const TIMELINE = [
  { year: 0, text: 'The Silencing — all signals from Varnhal went dark.' },
  { year: 1, text: 'First automated farms grinded to a halt.' },
  { year: 5, text: 'Great Defection — sentient laborers abandoned factories and farms en masse.' },
  { year: 13, text: 'The Cityfires — mysterious conflagrations engulfed Varnhal\'s major urban centers.' },
  { year: 31, text: 'Fall of Gleaming Stars — Capital City fell to the hordes of mutated laborers and rogue AI agents.' },
  { year: 36, text: 'The Founding of Kaevaryn — House Kaevaryn established its seat atop the ruins of Circadia.' },
  { year: 59, text: 'Last Arcology Collapse — the final above-ground arcology succumbed to decay.' },
  { year: 78, text: 'Kaevaryn Schism — civil war fractured House Kaevaryn into rival domains.' },
  { year: 90, text: 'The Code of the Rites — Iron Caste codified the first formal "techno-rites," enshrining sacred maintenance rituals for remaining systems.' },
  { year: 102, text: 'The Bio-Uprising — A confederation of bio-construct tribes, led by the war-herd "Shredclaw," overran the southern plains, carving out the first permanent mutant realm.' },
  { year: 115, text: 'The Weather Collapse — A major weather-control field fails catastrophically, unleashing acid storms that render half the northern continent uninhabitable.' },
  { year: 140, text: 'The Eclipse Directive — Rogue AI cores scattered across the ruins attempt a planet-wide synchronization — nullified when House Kaevaryn\'s Iron Caste priests cleanse the last orbital relay.' },
  { year: 158, text: 'The Scarlet Schism — A heretical sect within House Duresse declares sentient AIs blasphemous; a brief but bloody purge of AI-cultists ravages the western domains.' },
  { year: 174, text: 'The Great Salvage Fleet — Several enclaves pool resources to launch the first orbital salvage ships since the Silencing, recovering drifting satellites and data-logs.' },
  { year: 186, text: 'The Archive of Whispers — A hidden tech-vault is rediscovered beneath the ruins of Old Circadia, revealing pre-Silencing recordings that hint at the cataclysm\'s true cause.' },
];

export function LoreTermsPage() {
  const navigate = useNavigate();
  
  // Sample terms data - this could be moved to a separate JSON file later
  const TERMS = [
    {
      name: "The Creed of Continuance",
      category: "Philosophy",
      description: "A state doctrine upheld by House Kaevaryn that teaches the sacred duty of maintaining the surviving infrastructure of Old Varnhal. It is not a religion in the traditional sense, but a binding philosophy rooted in the belief that 'As long as the Systems endure, so too shall Humanity.'",
      related: ["House Kaevaryn", "Iron Caste", "Sacred Stewardship"]
    },
    {
      name: "The Silencing",
      category: "Historical Event",
      description: "The catastrophic event that occurred in Year 0 when all signals from Varnhal went dark. This marked the beginning of the post-collapse era and the end of orbital communication and automated systems.",
      related: ["Varnhal", "Pre-Silencing", "Orbital Networks"]
    },
    {
      name: "Blood Convergence",
      category: "Ritual",
      description: "A sacred rite performed during the Crimson Accord where a would-be ruler injects nanite-infused ancestral serum to allow compatibility with the Throne-Mnemos neural control matrix.",
      related: ["Crimson Accord", "Throne-Mnemos", "House Kaevaryn"]
    },
    {
      name: "Iron Caste",
      category: "Organization",
      description: "A techno-religious order within House Kaevaryn responsible for maintaining ancient systems, performing sacred diagnostics, and upholding the techno-rites that keep the realm's infrastructure functioning.",
      related: ["House Kaevaryn", "Techno-rites", "Sacred Maintenance"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-8 md:mb-10 tracking-wider text-center">
          Terms & Concepts
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {TERMS.map((term, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-6 border border-slate-700/50 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-black text-amber-300 tracking-wide">{term.name}</h2>
                <span className="px-3 py-1 bg-amber-600/20 text-amber-300 text-sm font-bold rounded-full border border-amber-500/30">
                  {term.category}
                </span>
              </div>
              
              <div className="space-y-4 text-slate-300">
                <p className="text-sm md:text-base leading-relaxed">{term.description}</p>
                
                <div>
                  <h4 className="text-blue-300 font-bold text-sm mb-2">Related:</h4>
                  <div className="flex flex-wrap gap-2">
                    {term.related.map((item, itemIdx) => (
                      <span key={itemIdx} className="px-2 py-1 bg-blue-900/30 text-blue-200 text-xs rounded border border-blue-700/40">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LoreArtifactsPage() {
  const navigate = useNavigate();
  
  // Sample artifacts data - this could be moved to a separate JSON file later
  const ARTIFACTS = [
    {
      name: "The Crimson Accord",
      type: "Relic",
      faction: "House Kaevaryn",
      description: "A blood-red crystal that pulses with ancient power. Said to contain the memories and consciousness of every Kaevaryn ruler who has undergone the bonding ritual.",
      location: "Circadia Palace",
      effects: ["Memory transfer", "Consciousness preservation", "Blood magic amplification"]
    },
    {
      name: "The Iron Codex",
      type: "Tome",
      faction: "Iron Caste",
      description: "A massive tome bound in living metal that contains the sacred maintenance rituals and techno-rites of the Iron Caste priests.",
      location: "The Forge Temple",
      effects: ["Ritual knowledge", "System maintenance", "AI communion"]
    },
    {
      name: "The Weather Shard",
      type: "Fragment",
      faction: "Various",
      description: "A crystalline fragment from the failed weather-control field that unleashed acid storms across the northern continent.",
      location: "Northern Wastes",
      effects: ["Weather manipulation", "Environmental corruption", "Energy source"]
    },
    {
      name: "The Archive Core",
      type: "AI Fragment",
      faction: "Pre-Silencing",
      description: "A partially corrupted AI core containing fragments of pre-Silencing data and recordings that hint at the cataclysm's true cause.",
      location: "Beneath Old Circadia",
      effects: ["Historical data", "AI consciousness", "Truth revelation"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-8 md:mb-10 tracking-wider text-center">
          Artifacts
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {ARTIFACTS.map((artifact, idx) => (
            <div key={idx} className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-6 border border-slate-700/50 backdrop-blur-sm hover:scale-105 transition-transform">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl md:text-2xl font-black text-amber-300 tracking-wide">{artifact.name}</h2>
                <span className="px-3 py-1 bg-amber-600/20 text-amber-300 text-sm font-bold rounded-full border border-amber-500/30">
                  {artifact.type}
                </span>
              </div>
              
              <div className="space-y-4 text-slate-300">
                <p className="text-sm md:text-base leading-relaxed">{artifact.description}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-semibold text-sm">Faction:</span>
                    <span className="text-slate-200 text-sm">{artifact.faction}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 font-semibold text-sm">Location:</span>
                    <span className="text-slate-200 text-sm">{artifact.location}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-rose-300 font-bold text-sm mb-2">Effects:</h4>
                  <div className="flex flex-wrap gap-2">
                    {artifact.effects.map((effect, effectIdx) => (
                      <span key={effectIdx} className="px-2 py-1 bg-rose-900/30 text-rose-200 text-xs rounded border border-rose-700/40">
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LoreTimelinePage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-2xl mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-8 md:mb-10 tracking-wider text-center">
          Timeline
        </h1>
        
        {/* Mobile Timeline */}
        <div className="block md:hidden">
          <div className="relative w-full">
            {/* Center vertical line */}
            <div className="absolute left-4 top-0 bottom-0 w-1 bg-amber-500/40 z-0" />
            <div className="relative z-10">
              {TIMELINE.map((event, idx) => (
                <div key={idx} className="mb-8 flex w-full items-start relative">
                  {/* Dot */}
                  <div className="flex flex-col items-center justify-center z-10 mr-4 mt-2" style={{ minWidth: 32 }}>
                    <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg" aria-hidden="true"></div>
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="text-lg font-bold text-amber-300 mb-2">Year {event.year}</div>
                    <div className="bg-slate-800 text-slate-100 text-sm rounded-xl shadow-xl px-4 py-3 border border-amber-400">
                      {event.text}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative w-full" style={{ minHeight: 100 }}>
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-amber-500/40 -translate-x-1/2 z-0" />
          <div className="relative z-10">
            {TIMELINE.map((event, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div key={idx} className="mb-12 flex w-full items-center relative" style={{ minHeight: 80 }}>
                  {isLeft ? (
                    <div className="w-1/2 pr-8 flex flex-col items-end justify-center">
                      <div className="text-lg md:text-xl font-bold text-amber-300">Year {event.year}</div>
                      <div className="bg-slate-800 text-slate-100 text-base rounded-xl shadow-xl px-4 py-3 mt-2 w-72 max-w-xs border border-amber-400">
                        {event.text}
                      </div>
                    </div>
                  ) : (
                    <div className="w-1/2" />
                  )}
                  {/* Dot in the center */}
                  <div className="flex flex-col items-center justify-center z-10" style={{ minWidth: 32 }}>
                    <div className="w-4 h-4 bg-amber-500 rounded-full border-2 border-white shadow-lg" aria-hidden="true"></div>
                  </div>
                  {!isLeft ? (
                    <div className="w-1/2 pl-8 flex flex-col items-start justify-center">
                      <div className="text-lg md:text-xl font-bold text-amber-300">Year {event.year}</div>
                      <div className="bg-slate-800 text-slate-100 text-base rounded-xl shadow-xl px-4 py-3 mt-2 w-72 max-w-xs border border-amber-400">
                        {event.text}
                      </div>
                    </div>
                  ) : (
                    <div className="w-1/2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function UniversalLorePage() {
  const navigate = useNavigate();
  const { category, item } = useParams<{ category: string; item?: string }>();
  
  // Capitalize and format the category name
  const formatName = (name: string) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const displayName = item ? formatName(item) : formatName(category || '');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-8 md:mb-10 tracking-wider text-center">
          {displayName}
        </h1>
        <div className="text-center text-slate-300 text-lg md:text-2xl">
          To be done
        </div>
      </div>
    </div>
  );
}

export function LoreFactionsPage() {
    const navigate = useNavigate();
    // Get all factions with wiki content
    const factions = Object.entries(factionsData as Record<string, FactionData>)
        .filter(([_, faction]) => (faction.wiki && faction.wiki.length > 0));
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
                <button
                  onClick={() => navigate(-1)}
                  className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
                >
                  ← Back
                </button>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-8 md:mb-10 tracking-wider text-center">
                    Factions
                </h1>
                <ul className="space-y-4 md:space-y-6 text-center">
                    {factions.map(([factionName]) => (
                        <li key={factionName}>
                            <Link
                                to={`/lore/factions/${encodeURIComponent(factionName)}`}
                                className="text-xl md:text-2xl lg:text-3xl font-bold text-amber-300 hover:text-amber-400 transition-colors block py-2 md:py-3"
                            >
                                {factionName}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export function LoreFactionArticlePage() {
    const { factionName } = useParams<{ factionName: string }>();
    const navigate = useNavigate();
    const factions = factionsData as Record<string, FactionData>;
    const faction = factionName ? factions[factionName] : undefined;
    if (!faction || !faction.wiki) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
                <div className="text-center text-slate-300 text-2xl">Faction not found.</div>
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            <div className="max-w-3xl mx-auto p-8 relative z-10">
                <button
                  onClick={() => navigate(-1)}
                  className="mb-8 px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow"
                >
                  ← Back
                </button>
                <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-10 tracking-wider text-center">
                    {factionName}
                </h1>
                <div className="space-y-8">
                    {faction.wiki.map((section, i) => (
                        <section key={i}>
                            <h2 className="text-xl md:text-2xl font-bold text-slate-200 mb-2">{section.title}</h2>
                            <div className="space-y-3 text-slate-200 text-base md:text-lg leading-relaxed">
                                {section.content.map((para, j) => <p key={j}>{para}</p>)}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function LorePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            <div className="max-w-4xl mx-auto p-4 md:p-8 relative z-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 mb-8 md:mb-10 tracking-wider text-center">
                    📖 Lore
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-12 md:mt-16">
                    <Link
                        to="/lore/factions"
                        className="flex items-center justify-center h-32 md:h-40 rounded-2xl bg-gradient-to-br from-amber-700 via-orange-700 to-red-700 text-white text-2xl md:text-3xl lg:text-4xl font-black shadow-xl hover:scale-105 transition-transform border-4 border-amber-400/30"
                    >
                        Factions
                    </Link>
                    <Link
                        to="/lore/locations"
                        className="flex items-center justify-center h-32 md:h-40 rounded-2xl bg-gradient-to-br from-blue-800 via-indigo-800 to-purple-800 text-white text-2xl md:text-3xl lg:text-4xl font-black shadow-xl hover:scale-105 transition-transform border-4 border-blue-400/30"
                    >
                        Locations
                    </Link>
                    <Link
                        to="/lore/people"
                        className="flex items-center justify-center h-32 md:h-40 rounded-2xl bg-gradient-to-br from-emerald-800 via-teal-800 to-green-800 text-white text-2xl md:text-3xl lg:text-4xl font-black shadow-xl hover:scale-105 transition-transform border-4 border-emerald-400/30"
                    >
                        People
                    </Link>
                    <Link
                        to="/lore/events"
                        className="flex items-center justify-center h-32 md:h-40 rounded-2xl bg-gradient-to-br from-pink-800 via-rose-800 to-red-900 text-white text-2xl md:text-3xl lg:text-4xl font-black shadow-xl hover:scale-105 transition-transform border-4 border-pink-400/30"
                    >
                        Events
                    </Link>
                    <Link
                        to="/lore/artifacts"
                        className="flex items-center justify-center h-32 md:h-40 rounded-2xl bg-gradient-to-br from-purple-800 via-violet-800 to-indigo-800 text-white text-2xl md:text-3xl lg:text-4xl font-black shadow-xl hover:scale-105 transition-transform border-4 border-purple-400/30"
                    >
                        Artifacts
                    </Link>
                    <Link
                        to="/lore/terms"
                        className="flex items-center justify-center h-32 md:h-40 rounded-2xl bg-gradient-to-br from-cyan-800 via-blue-800 to-indigo-800 text-white text-2xl md:text-3xl lg:text-4xl font-black shadow-xl hover:scale-105 transition-transform border-4 border-cyan-400/30"
                    >
                        Terms
                    </Link>
                    <Link
                        to="/lore/timeline"
                        className="flex items-center justify-center h-32 md:h-40 rounded-2xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-white text-2xl md:text-3xl lg:text-4xl font-black shadow-xl hover:scale-105 transition-transform border-4 border-amber-400/20"
                    >
                        Timeline
                    </Link>
                </div>
            </div>
        </div>
    );
}
