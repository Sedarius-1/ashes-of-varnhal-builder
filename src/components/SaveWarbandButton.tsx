import type { Unit } from "../types/unit";

interface Props {
    units: Unit[];
}

export default function SaveWarbandButton({ units }: Props) {
    function handleSaveWarband() {
        if (units.length === 0) {
            alert("No units to save!");
            return;
        }

        const dataStr = JSON.stringify(units, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "warband.json";
        a.click();

        URL.revokeObjectURL(url);
    }

    return (
        <button
            onClick={handleSaveWarband}
            disabled={units.length === 0}
            className={`px-6 py-3 rounded-xl font-black transition-all duration-200 flex items-center gap-2 tracking-wide ${
                units.length > 0 
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 border border-emerald-500/50" 
                    : "bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600"
            }`}
        >
            <span className="text-lg">💾</span>
            SAVE WARBAND
        </button>
    );
}
