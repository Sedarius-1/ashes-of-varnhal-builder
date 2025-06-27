const Topbar = () => (
    <header className="bg-gradient-to-r from-slate-900 via-gray-900 to-black text-amber-200 px-8 py-5 shadow-2xl border-b-2 border-amber-700/40 flex items-center justify-between z-10 relative">
        <div className="flex items-center gap-4">
            <span className="text-3xl drop-shadow-lg">⚔️</span>
            <h1 className="text-2xl md:text-3xl font-black uppercase tracking-widest drop-shadow-lg">
                Ashes of Varnhal <span className="text-amber-400">Warband Builder</span>
            </h1>
        </div>
    </header>
);

export default Topbar;
