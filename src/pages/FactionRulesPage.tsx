import { useParams } from 'react-router-dom';
import factionsData from '../definitions/factions.json';

export default function FactionRulesPage() {
  const { factionName } = useParams();
  const faction = (factionsData as any)[factionName as string];

  if (!faction) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <div className="text-center">
          <h1 className="text-3xl font-black text-rose-400 mb-4">Faction Not Found</h1>
          <p className="text-slate-400">No rules data for this faction.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black p-2 sm:p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-400 to-amber-400 mb-2 tracking-wider">
            🏰 {factionName}
          </h1>
        </div>

        {/* Section Titles Row (desktop only) */}
        <div className="hidden md:grid grid-cols-3 gap-8 mb-2 px-2">
          <div className="text-center text-lg font-black text-amber-300 tracking-wide">Passive Trait</div>
          <div className="text-center text-lg font-black text-indigo-300 tracking-wide">Leader Trait</div>
          <div className="text-center text-lg font-black text-violet-300 tracking-wide">Tactical Directives</div>
        </div>

        {/* Main Traits Row */}
        <div className="relative mb-12">
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-slate-800/60 via-slate-900/60 to-slate-800/60 rounded-2xl pointer-events-none" style={{zIndex:0}} />
          <div className="relative flex flex-col gap-6 z-10 md:grid md:grid-cols-3 md:gap-8 md:items-stretch">
            {/* Passive Faction Trait */}
            {faction.themesAndPlaystyle?.passiveTrait && (
              <section className="flex-1 bg-gradient-to-r from-amber-900/50 to-yellow-900/50 rounded-2xl shadow-xl p-4 sm:p-6 border border-amber-700/50 min-w-0 transition-transform hover:scale-[1.025] hover:shadow-2xl duration-200 flex flex-col">
                <h2 className="md:hidden text-xl font-black text-amber-300 mb-2 flex items-center gap-2"><span>🛡️</span>Passive Trait</h2>
                <h3 className="text-base font-bold text-amber-200 mb-2">{faction.themesAndPlaystyle.passiveTrait.title}</h3>
                <ul className="list-disc pl-5 space-y-1 text-slate-200 text-sm sm:text-base flex-1 flex flex-col">
                  {faction.themesAndPlaystyle.passiveTrait.description.map((d: string, i: number) => <li key={i}>{d}</li>)}
                </ul>
              </section>
            )}

            {/* Leader Trait */}
            {faction.themesAndPlaystyle?.leaderTrait && (
              <section className="flex-1 bg-gradient-to-r from-indigo-900/50 to-blue-900/50 rounded-2xl shadow-xl p-4 sm:p-6 border border-indigo-700/50 min-w-0 transition-transform hover:scale-[1.025] hover:shadow-2xl duration-200 flex flex-col">
                <h2 className="md:hidden text-xl font-black text-indigo-300 mb-2 flex items-center gap-2"><span>👑</span>Leader Trait</h2>
                <div className="text-slate-200 text-base font-semibold mb-1">{faction.themesAndPlaystyle.leaderTrait.title}</div>
                <div className="text-slate-300 text-sm sm:text-base flex-1 flex flex-col">{faction.themesAndPlaystyle.leaderTrait.description}</div>
              </section>
            )}

            {/* Tactical Directives */}
            {faction.themesAndPlaystyle?.tacticalDirectives && (
              <section className="flex-1 bg-gradient-to-r from-violet-900/50 to-purple-900/50 rounded-2xl shadow-xl p-4 sm:p-6 border border-violet-700/50 min-w-0 transition-transform hover:scale-[1.025] hover:shadow-2xl duration-200 flex flex-col">
                <h2 className="md:hidden text-xl font-black text-violet-300 mb-2 flex items-center gap-2"><span>⚔️</span>Tactical Directives</h2>
                <ul className="list-disc pl-5 space-y-1 text-slate-200 text-sm sm:text-base flex-1 flex flex-col">
                  {faction.themesAndPlaystyle.tacticalDirectives.map((d: string, i: number) => <li key={i}>{d}</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Divider and Trait Table Heading */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-700/60 to-transparent" />
          <h2 className="text-2xl font-black text-green-300 flex items-center gap-2"><span>📜</span>Trait Table</h2>
          <div className="flex-1 h-px bg-gradient-to-l from-transparent via-green-700/60 to-transparent" />
        </div>

        {/* Trait Table */}
        {faction.traitTable && (
          <section className="mb-8 bg-gradient-to-r from-green-900/50 to-emerald-900/50 rounded-2xl shadow-xl p-4 sm:p-6 border border-green-700/50">
            <div className="overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="text-left text-green-200 font-bold px-2 py-1">Roll</th>
                    <th className="text-left text-green-200 font-bold px-2 py-1">Name</th>
                    <th className="text-left text-green-200 font-bold px-2 py-1">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {faction.traitTable.map((row: any, i: number) => (
                    <tr key={i} className="bg-slate-800/60 rounded-lg">
                      <td className="px-2 py-1 text-green-100 font-mono">{row.roll}</td>
                      <td className="px-2 py-1 text-green-200 font-bold">{row.name}</td>
                      <td className="px-2 py-1 text-green-100">{row.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
      </div>
    </div>
  );
} 