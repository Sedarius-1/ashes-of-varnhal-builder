import { useParams, Link, useNavigate } from 'react-router-dom';
import peopleData from '../definitions/people.json';

function renderWithLinks(text: string) {
    // Regex to match [label](url)
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let linkKey = 0;
    while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
            parts.push(text.slice(lastIndex, match.index));
        }
        parts.push(
            <Link key={linkKey++} to={match[2]} className="text-amber-400 underline hover:text-amber-300">
                {match[1]}
            </Link>
        );
        lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
    }
    return <>{parts}</>;
}

interface PersonData {
    title: string;
    subtitle: string;
    faction: string;
    role: string;
    status: string;
    location: string;
    age: string;
    description: string;
    achievements: string[];
    significance: string;
    related: string[];
}

const PeopleArticle: React.FC = () => {
    const { personName } = useParams<{ personName: string }>();
    const navigate = useNavigate();
    
    if (!personName) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
                <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
                    <div className="text-center text-slate-300 text-2xl">No person specified.</div>
                </div>
            </div>
        );
    }
    
    const person: PersonData | undefined = (peopleData as Record<string, PersonData>)[personName];
    if (!person) {
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
                        {personName}
                    </h1>
                    <div className="text-center text-slate-300 text-lg md:text-2xl">
                        Person not found.
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-16.569 13.431-30 30-30v60c-16.569 0-30-13.431-30-30zm0 0c0 16.569-13.431 30-30 30v-60c16.569 0 30 13.431 30 30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="max-w-6xl mx-auto p-4 md:p-8 relative z-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 md:mb-8 px-3 md:px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 font-bold border border-slate-600 shadow text-sm md:text-base"
                >
                    ← Back
                </button>

                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-green-600 mb-2 tracking-wider">
                        👑 {person.title} 👑
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-slate-300 italic mb-4 md:mb-6">
                        {person.subtitle}
                    </p>
                    <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-green-600 mx-auto rounded-full shadow-lg shadow-emerald-500/50"></div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">
                        {/* Description */}
                        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide flex items-center gap-2">
                                <span className="text-emerald-400">📖</span>
                                Description
                            </h2>
                            <div className="space-y-3 md:space-y-4 text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                                <p>{renderWithLinks(person.description)}</p>
                            </div>
                        </div>

                        {/* Achievements */}
                        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide flex items-center gap-2">
                                <span className="text-green-400">🏆</span>
                                Achievements
                            </h2>
                            <div className="space-y-4 md:space-y-6">
                                {person.achievements.map((achievement: string, idx: number) => (
                                    <div key={idx} className="bg-slate-900/70 rounded-xl border border-green-700/40 p-4 md:p-6 relative">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-t-xl"></div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl text-green-300">⭐</span>
                                            <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                                {renderWithLinks(achievement)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Significance */}
                        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide flex items-center gap-2">
                                <span className="text-purple-400">💎</span>
                                Significance
                            </h2>
                            <div className="space-y-3 md:space-y-4 text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                                <p>{renderWithLinks(person.significance)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Info Panel */}
                    <div className="space-y-6 md:space-y-8">
                        {/* Quick Info */}
                        <div className="bg-gradient-to-br from-slate-700/80 to-slate-900/80 rounded-2xl shadow-xl p-4 md:p-6 border border-slate-600/60">
                            <h3 className="text-base md:text-lg font-bold text-emerald-300 mb-3 md:mb-4 tracking-wide">Personal Profile</h3>
                            <div className="space-y-3 md:space-y-4">
                                <div>
                                    <div className="text-slate-400 font-semibold text-sm md:text-base">Faction</div>
                                    <div className="text-slate-200 text-sm md:text-base">
                                        {renderWithLinks(person.faction)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-semibold text-sm md:text-base">Role</div>
                                    <div className="text-slate-200 text-sm md:text-base">{person.role}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-semibold text-sm md:text-base">Status</div>
                                    <div className="text-slate-200 text-sm md:text-base">{person.status}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-semibold text-sm md:text-base">Location</div>
                                    <div className="text-slate-200 text-sm md:text-base">
                                        {renderWithLinks(person.location)}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-semibold text-sm md:text-base">Age</div>
                                    <div className="text-slate-200 text-sm md:text-base">{person.age}</div>
                                </div>
                            </div>
                        </div>

                        {/* Related */}
                        {person.related && person.related.length > 0 && (
                            <div className="bg-gradient-to-br from-slate-700/80 to-slate-900/80 rounded-2xl shadow-xl p-4 md:p-6 border border-slate-600/60">
                                <h3 className="text-base md:text-lg font-bold text-emerald-300 mb-3 md:mb-4 tracking-wide">Related</h3>
                                <div className="flex flex-wrap gap-2">
                                    {person.related.map((item, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-emerald-900/30 text-emerald-200 text-xs rounded border border-emerald-700/40">
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
};

export default PeopleArticle; 