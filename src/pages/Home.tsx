import { Link, useParams, useNavigate } from 'react-router-dom';
import factionsData from '../definitions/factions.json';
import eventsData from '../definitions/events.json';
import locationsData from '../definitions/locations.json';
import artifactsData from '../definitions/artifacts.json';
import termsData from '../definitions/terms.json';
import peopleData from '../definitions/people.json';
import type { FactionData } from '../types/factionData';

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
  const { termName } = useParams<{ termName: string }>();
  
  if (!termName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
          <div className="text-center text-slate-300 text-2xl">No term specified.</div>
        </div>
      </div>
    );
  }
  
  const term: any = (termsData as Record<string, any>)[termName];
  if (!term) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
          >
            ← Back
          </button>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 mb-8 md:mb-10 tracking-wider text-center">
            {termName}
          </h1>
          <div className="text-center text-slate-300 text-lg md:text-2xl">
            Term not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 mb-8 md:mb-10 tracking-wider text-center">
          {termName}
        </h1>
        
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-black text-cyan-300 tracking-wide">{term.title}</h2>
            <span className="px-3 py-1 bg-cyan-600/20 text-cyan-300 text-sm font-bold rounded-full border border-cyan-500/30">
              {term.category}
            </span>
          </div>
          
          <div className="space-y-4 text-slate-300">
            <p className="text-sm md:text-base leading-relaxed">{term.description}</p>
            
            {term.related && (
              <div>
                <h4 className="text-blue-300 font-bold text-sm mb-2">Related:</h4>
                <div className="flex flex-wrap gap-2">
                  {term.related.map((item: string, itemIdx: number) => (
                    <span key={itemIdx} className="px-2 py-1 bg-blue-900/30 text-blue-200 text-xs rounded border border-blue-700/40">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LoreArtifactsPage() {
  const navigate = useNavigate();
  const { artifactName } = useParams<{ artifactName: string }>();
  
  if (!artifactName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
          <div className="text-center text-slate-300 text-2xl">No artifact specified.</div>
        </div>
      </div>
    );
  }
  
  const artifact: any = (artifactsData as Record<string, any>)[artifactName];
  if (!artifact) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
          >
            ← Back
          </button>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600 mb-8 md:mb-10 tracking-wider text-center">
            {artifactName}
          </h1>
          <div className="text-center text-slate-300 text-lg md:text-2xl">
            Artifact not found.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600 mb-8 md:mb-10 tracking-wider text-center">
          {artifactName}
        </h1>
        
        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <h2 className="text-xl md:text-2xl font-black text-purple-300 tracking-wide">{artifact.title}</h2>
            <span className="px-3 py-1 bg-purple-600/20 text-purple-300 text-sm font-bold rounded-full border border-purple-500/30">
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
            
            {artifact.effects && (
              <div>
                <h4 className="text-rose-300 font-bold text-sm mb-2">Effects:</h4>
                <div className="flex flex-wrap gap-2">
                  {artifact.effects.map((effect: string, effectIdx: number) => (
                    <span key={effectIdx} className="px-2 py-1 bg-rose-900/30 text-rose-200 text-xs rounded border border-rose-700/40">
                      {effect}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
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

export function EventsPage() {
  const navigate = useNavigate();
  // Get all events from the events data
  const events = Object.keys(eventsData as Record<string, any>);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 mb-8 md:mb-10 tracking-wider text-center">
          Events
        </h1>
        <ul className="space-y-4 md:space-y-6 text-center">
          {events.map((eventName) => (
            <li key={eventName}>
              <Link
                to={`/lore/events/${encodeURIComponent(eventName)}`}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-rose-300 hover:text-rose-400 transition-colors block py-2 md:py-3"
              >
                {eventName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function LocationsPage() {
  const navigate = useNavigate();
  // Get all locations from the locations data
  const locations = Object.keys(locationsData as Record<string, any>);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 mb-8 md:mb-10 tracking-wider text-center">
          Locations
        </h1>
        <ul className="space-y-4 md:space-y-6 text-center">
          {locations.map((locationName) => (
            <li key={locationName}>
              <Link
                to={`/lore/locations/${encodeURIComponent(locationName)}`}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-blue-300 hover:text-blue-400 transition-colors block py-2 md:py-3"
              >
                {locationName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ArtifactsPage() {
  const navigate = useNavigate();
  // Get all artifacts from the artifacts data
  const artifacts = Object.keys(artifactsData as Record<string, any>);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-500 to-indigo-600 mb-8 md:mb-10 tracking-wider text-center">
          Artifacts
        </h1>
        <ul className="space-y-4 md:space-y-6 text-center">
          {artifacts.map((artifactName) => (
            <li key={artifactName}>
              <Link
                to={`/lore/artifacts/${encodeURIComponent(artifactName)}`}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-purple-300 hover:text-purple-400 transition-colors block py-2 md:py-3"
              >
                {artifactName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TermsPage() {
  const navigate = useNavigate();
  // Get all terms from the terms data
  const terms = Object.keys(termsData as Record<string, any>);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 mb-8 md:mb-10 tracking-wider text-center">
          Terms & Concepts
        </h1>
        <ul className="space-y-4 md:space-y-6 text-center">
          {terms.map((termName) => (
            <li key={termName}>
              <Link
                to={`/lore/terms/${encodeURIComponent(termName)}`}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-cyan-300 hover:text-cyan-400 transition-colors block py-2 md:py-3"
              >
                {termName}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function PeoplePage() {
  const navigate = useNavigate();
  // Get all people from the people data
  const people = Object.keys(peopleData as Record<string, any>);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
        >
          ← Back
        </button>
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 mb-8 md:mb-10 tracking-wider text-center">
          People
        </h1>
        <ul className="space-y-4 md:space-y-6 text-center">
          {people.map((personName) => (
            <li key={personName}>
              <Link
                to={`/lore/people/${encodeURIComponent(personName)}`}
                className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-300 hover:text-emerald-400 transition-colors block py-2 md:py-3"
              >
                {personName}
              </Link>
            </li>
          ))}
        </ul>
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
