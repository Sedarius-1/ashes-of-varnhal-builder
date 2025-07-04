import React from 'react';
import type { RefObject } from 'react';

interface ImportWarbandModalProps {
  show: boolean;
  fileInputRef: RefObject<HTMLInputElement | null>;
  importWarband: (data: unknown, warbandName?: string) => void;
  setShowImportModal: (show: boolean) => void;
}

const ImportWarbandModal: React.FC<ImportWarbandModalProps> = ({
  show,
  fileInputRef,
  importWarband,
  setShowImportModal
}) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowImportModal(false)}>
      <div className="bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 border border-slate-600" onClick={e => e.stopPropagation()}>
        <h3 className="text-2xl font-black text-slate-200 mb-6">Import Warband</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-slate-300 font-black mb-2">Warband Name</label>
            <input
              type="text"
              placeholder="Enter warband name"
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200"
              id="import-warband-name"
            />
          </div>
          <div>
            <label className="block text-slate-300 font-black mb-2">Warband JSON File</label>
            <p className="text-xs text-slate-400 mb-2">
              Supports both unit array and campaign exports (full warband with injuries, XP, etc.)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    try {
                      const content = reader.result as string;
                      const data = JSON.parse(content);
                      const name = (document.getElementById('import-warband-name') as HTMLInputElement)?.value || 'Imported Warband';
                      importWarband(data, name);
                      setShowImportModal(false);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    } catch (err) {
                      alert('Could not parse file. Make sure it\'s valid JSON.');
                    }
                  };
                  reader.readAsText(file);
                }
              }}
              className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-slate-200"
            />
          </div>
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => setShowImportModal(false)}
              className="flex-1 px-6 py-3 bg-slate-700 text-slate-300 font-black rounded-lg hover:bg-slate-600 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportWarbandModal; 