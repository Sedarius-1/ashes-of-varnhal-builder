import React, { useState, useRef } from "react";
import type { Unit } from "../types/unit";

interface Props {
    onLoad: (units: Unit[]) => void;
}

export default function LoadWarbandButton({ onLoad }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleLoadWarband = () => {
        if (!selectedFile) return;

        setIsLoading(true);
        const reader = new FileReader();
        
        reader.onload = () => {
            try {
                const content = reader.result as string;
                const parsed = JSON.parse(content);

                if (!Array.isArray(parsed)) {
                    alert("Invalid file format: expected a list of units.");
                    return;
                }

                onLoad(parsed);
                setIsModalOpen(false);
                setSelectedFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } catch (err) {
                console.error("Failed to load warband:", err);
                alert("Could not parse file. Make sure it's valid JSON.");
            } finally {
                setIsLoading(false);
            }
        };

        reader.onerror = () => {
            alert("Failed to read file.");
            setIsLoading(false);
        };

        reader.readAsText(selectedFile);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSelectedFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 rounded-xl font-black transition-all duration-200 flex items-center gap-2 tracking-wide bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 border border-blue-500/50"
            >
                <span className="text-lg">📂</span>
                LOAD WARBAND
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl shadow-2xl border border-slate-600 w-full max-w-md">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl text-white border-b border-blue-500/50">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">📂</span>
                                    <div>
                                        <h2 className="text-xl font-black tracking-wide">LOAD WARBAND</h2>
                                        <p className="text-blue-200 text-sm font-medium">Select a JSON file to load</p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleCancel}
                                    className="text-blue-200 hover:text-white transition-colors duration-200 p-2 hover:bg-white/10 rounded-lg"
                                >
                                    <span className="text-2xl">×</span>
                                </button>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-black text-slate-300 mb-2 tracking-wide">
                                        CHOOSE JSON FILE
                                    </label>
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".json"
                                        onChange={handleFileSelect}
                                        className="w-full p-3 border-2 border-slate-600 rounded-lg bg-slate-800 text-slate-200 shadow-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 font-medium"
                                    />
                                </div>

                                {selectedFile && (
                                    <div className="p-4 bg-emerald-900/50 border border-emerald-500/50 rounded-lg">
                                        <div className="flex items-center gap-2">
                                            <span className="text-emerald-400">✓</span>
                                            <span className="font-black text-emerald-300 tracking-wide">FILE SELECTED:</span>
                                        </div>
                                        <p className="text-emerald-200 text-sm mt-1 font-medium">{selectedFile.name}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-slate-600 bg-slate-800/50 rounded-b-2xl">
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors duration-200 font-black tracking-wide border border-slate-600"
                                >
                                    CANCEL
                                </button>
                                <button
                                    onClick={handleLoadWarband}
                                    disabled={!selectedFile || isLoading}
                                    className={`px-6 py-2 rounded-lg font-black transition-all duration-200 flex items-center gap-2 tracking-wide ${
                                        selectedFile && !isLoading
                                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 border border-blue-500/50"
                                            : "bg-slate-700 text-slate-400 cursor-not-allowed border border-slate-600"
                                    }`}
                                >
                                    {isLoading ? (
                                        <>
                                            <span className="animate-spin">⏳</span>
                                            LOADING...
                                        </>
                                    ) : (
                                        <>
                                            <span>📥</span>
                                            LOAD WARBAND
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
