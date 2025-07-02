import type {Faction} from "./faction.ts";
import type {Unit} from "./unit.ts";

export interface GameResult {
    gameNumber: number;
    date: string;
    salvagePoints: number;
    salvageRoll: string;
    salvageResult: string;
    notes: string;
}

export interface Warband {
    name: string;
    faction: Faction | null;
    units: Unit[];
    // Campaign tracking properties
    cp?: number; // Creation Points
    salvagePoints?: number; // Salvage Points earned
    campaignNotes?: string; // Optional campaign notes
    gameHistory?: GameResult[]; // History of game results
}
