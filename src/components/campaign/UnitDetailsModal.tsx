import React from 'react';
import UnitDetails from '../UnitDetails';

interface UnitDetailsModalProps {
  show: boolean;
  selectedUnitForDetails: { warbandIndex: number; unitIndex: number } | null;
  campaignWarbands: any[];
  weaponsData: any;
  setCampaignWarbands: (warbands: any[]) => void;
  setShowUnitDetailsModal: (show: boolean) => void;
}

const UnitDetailsModal: React.FC<UnitDetailsModalProps> = ({
  show,
  selectedUnitForDetails,
  campaignWarbands,
  weaponsData,
  setCampaignWarbands,
  setShowUnitDetailsModal
}) => {
  if (!show || !selectedUnitForDetails) return null;
  const unit = campaignWarbands[selectedUnitForDetails.warbandIndex].units[selectedUnitForDetails.unitIndex];
  const faction = campaignWarbands[selectedUnitForDetails.warbandIndex].faction;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setShowUnitDetailsModal(false)}>
      <div className="bg-slate-800 rounded-2xl p-8 max-w-2xl w-full mx-4 border border-slate-600 max-h-[80vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
        <button
          onClick={() => setShowUnitDetailsModal(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl font-black"
          aria-label="Close"
        >
          ×
        </button>
        <UnitDetails
          unit={unit}
          weapons={weaponsData[faction] || []}
          onUpdateUnit={(updatedUnit: any) => {
            const newWarbands = [...campaignWarbands];
            newWarbands[selectedUnitForDetails.warbandIndex].units[selectedUnitForDetails.unitIndex] = updatedUnit;
            setCampaignWarbands(newWarbands);
          }}
        />
      </div>
    </div>
  );
};

export default UnitDetailsModal; 