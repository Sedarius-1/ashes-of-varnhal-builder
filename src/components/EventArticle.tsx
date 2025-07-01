import { useParams, Link, useNavigate } from 'react-router-dom';
import eventsData from '../definitions/events.json';

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

interface EventData {
    title: string;
    subtitle: string;
    type: string;
    date: string;
    duration: string;
    location: string;
    casualties: string;
    factions: string[];
    significance: string;
    overview: string[];
    timeline: Array<{
        phase: string;
        description: string;
    }>;
    impact: Array<{
        title: string;
        content: string[];
    }>;
    survivors: Array<{
        title: string;
        content: string[];
    }>;
    currentState: Array<{
        title: string;
        content: string[];
    }>;
    legacy: string[];
    relatedEvents: Array<{
        name: string;
        description: string;
        link: string;
    }>;
    keyFigures: Array<{
        name: string;
        role: string;
        status: string;
    }>;
}

const EventArticle: React.FC = () => {
    const { eventName } = useParams<{ eventName: string }>();
    const navigate = useNavigate();
    
    if (!eventName) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
                <div className="max-w-3xl mx-auto p-4 md:p-8 relative z-10">
                    <div className="text-center text-slate-300 text-2xl">No event specified.</div>
                </div>
            </div>
        );
    }
    
    const event: EventData | undefined = (eventsData as Record<string, EventData>)[eventName];
    if (!event) {
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
                        {eventName}
                    </h1>
                    <div className="text-center text-slate-300 text-lg md:text-2xl">
                        Event not found.
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
                    <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-purple-600 mb-2 tracking-wider">
                        ⚡ {event.title} ⚡
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-slate-300 italic mb-4 md:mb-6">
                        {event.subtitle}
                    </p>
                    <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 mx-auto rounded-full shadow-lg shadow-rose-500/50"></div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">
                        {/* Overview */}
                        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide flex items-center gap-2">
                                <span className="text-rose-400">📖</span>
                                Overview
                            </h2>
                            <div className="space-y-3 md:space-y-4 text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                                {event.overview.map((para, i) => (
                                    <p key={i}>{renderWithLinks(para)}</p>
                                ))}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide flex items-center gap-2">
                                <span className="text-pink-400">⏰</span>
                                Timeline
                            </h2>
                            <div className="space-y-6 md:space-y-8">
                                {event.timeline.map((phase, idx) => (
                                    <div key={idx} className="bg-slate-900/70 rounded-xl border border-pink-700/40 p-4 md:p-6 relative">
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-purple-500 rounded-t-xl"></div>
                                        <h3 className="text-lg md:text-xl font-bold text-pink-300 mb-3 md:mb-4 flex items-center gap-2">
                                            <span className="text-xl">⚡</span>
                                            {phase.phase}
                                        </h3>
                                        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                                            {renderWithLinks(phase.description)}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Impact */}
                        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide flex items-center gap-2">
                                <span className="text-purple-400">💥</span>
                                Impact
                            </h2>
                            <div className="space-y-6 md:space-y-8">
                                {event.impact.map((section, idx) => (
                                    <div key={idx} className="bg-slate-900/70 rounded-xl border border-purple-700/40 p-4 md:p-6">
                                        <h3 className="text-lg md:text-xl font-bold text-purple-300 mb-3 md:mb-4 flex items-center gap-2">
                                            <span className="text-xl">🌍</span>
                                            {section.title}
                                        </h3>
                                        <div className="space-y-3 text-slate-300 leading-relaxed text-sm md:text-base">
                                            {section.content.map((para, i) => (
                                                <p key={i}>{renderWithLinks(para)}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Survivors */}
                        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide flex items-center gap-2">
                                <span className="text-emerald-400">🛡️</span>
                                Survivors
                            </h2>
                            <div className="space-y-6 md:space-y-8">
                                {event.survivors.map((section, idx) => (
                                    <div key={idx} className="bg-slate-900/70 rounded-xl border border-emerald-700/40 p-4 md:p-6">
                                        <h3 className="text-lg md:text-xl font-bold text-emerald-300 mb-3 md:mb-4 flex items-center gap-2">
                                            <span className="text-xl">👥</span>
                                            {section.title}
                                        </h3>
                                        <div className="space-y-3 text-slate-300 leading-relaxed text-sm md:text-base">
                                            {section.content.map((para, i) => (
                                                <p key={i}>{renderWithLinks(para)}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Current State */}
                        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide flex items-center gap-2">
                                <span className="text-amber-400">🏛️</span>
                                Current State
                            </h2>
                            <div className="space-y-6 md:space-y-8">
                                {event.currentState.map((section, idx) => (
                                    <div key={idx} className="bg-slate-900/70 rounded-xl border border-amber-700/40 p-4 md:p-6">
                                        <h3 className="text-lg md:text-xl font-bold text-amber-300 mb-3 md:mb-4 flex items-center gap-2">
                                            <span className="text-xl">⚙️</span>
                                            {section.title}
                                        </h3>
                                        <div className="space-y-3 text-slate-300 leading-relaxed text-sm md:text-base">
                                            {section.content.map((para, i) => (
                                                <p key={i}>{renderWithLinks(para)}</p>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Legacy */}
                        <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 rounded-2xl shadow-2xl p-4 md:p-6 border border-slate-700/50 backdrop-blur-sm">
                            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-slate-200 mb-4 md:mb-6 tracking-wide flex items-center gap-2">
                                <span className="text-blue-400">📜</span>
                                Legacy
                            </h2>
                            <div className="space-y-3 md:space-y-4 text-slate-300 leading-relaxed text-sm md:text-base lg:text-lg">
                                {event.legacy.map((para, i) => (
                                    <p key={i}>{renderWithLinks(para)}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Info Panel */}
                    <div className="space-y-6 md:space-y-8">
                        {/* Event Profile */}
                        <div className="bg-gradient-to-br from-slate-700/80 to-slate-900/80 rounded-2xl shadow-xl p-4 md:p-6 border border-slate-600/60">
                            <h3 className="text-base md:text-lg font-bold text-rose-300 mb-3 md:mb-4 tracking-wide">Event Profile</h3>
                            <div className="space-y-3 md:space-y-4">
                                <div>
                                    <div className="text-slate-400 font-semibold text-sm md:text-base">Type</div>
                                    <div className="text-slate-200 text-sm md:text-base">{event.type}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-semibold text-sm md:text-base">Date</div>
                                    <div className="text-slate-200 text-sm md:text-base">{event.date}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-semibold text-sm md:text-base">Duration</div>
                                    <div className="text-slate-200 text-sm md:text-base">{event.duration}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-semibold text-sm md:text-base">Location</div>
                                    <div className="text-slate-200 text-sm md:text-base">{event.location}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-semibold text-sm md:text-base">Casualties</div>
                                    <div className="text-slate-200 text-sm md:text-base">{event.casualties}</div>
                                </div>
                                <div>
                                    <div className="text-slate-400 font-semibold text-sm md:text-base">Significance</div>
                                    <div className="text-slate-200 text-sm md:text-base">{event.significance}</div>
                                </div>
                            </div>
                        </div>

                        {/* Key Figures */}
                        <div className="bg-gradient-to-br from-slate-700/80 to-slate-900/80 rounded-2xl shadow-xl p-4 md:p-6 border border-slate-600/60">
                            <h3 className="text-base md:text-lg font-bold text-purple-300 mb-3 md:mb-4 tracking-wide">Key Figures</h3>
                            <div className="space-y-3 md:space-y-4">
                                {event.keyFigures.map((figure, idx) => (
                                    <div key={idx} className="bg-slate-800/50 rounded-lg border border-purple-600/30 p-3 md:p-4">
                                        <h4 className="text-sm md:text-base font-bold text-purple-200 mb-1">
                                            {figure.name}
                                        </h4>
                                        <div className="text-slate-300 text-xs md:text-sm">
                                            <div className="mb-1">
                                                <span className="text-slate-400">Role: </span>
                                                {figure.role}
                                            </div>
                                            <div>
                                                <span className="text-slate-400">Status: </span>
                                                <span className={`${figure.status === 'Active' ? 'text-emerald-400' : 'text-slate-400'}`}>
                                                    {figure.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Related Events */}
                        <div className="bg-gradient-to-br from-slate-700/80 to-slate-900/80 rounded-2xl shadow-xl p-4 md:p-6 border border-slate-600/60">
                            <h3 className="text-base md:text-lg font-bold text-pink-300 mb-3 md:mb-4 tracking-wide">Related Events</h3>
                            <div className="space-y-3 md:space-y-4">
                                {event.relatedEvents.map((relatedEvent, idx) => (
                                    <div key={idx} className="bg-slate-800/50 rounded-lg border border-pink-600/30 p-3 md:p-4">
                                        <Link 
                                            to={relatedEvent.link}
                                            className="text-sm md:text-base font-bold text-pink-200 hover:text-pink-300 transition-colors block mb-1"
                                        >
                                            {relatedEvent.name}
                                        </Link>
                                        <p className="text-slate-300 text-xs md:text-sm leading-relaxed">
                                            {relatedEvent.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventArticle; 