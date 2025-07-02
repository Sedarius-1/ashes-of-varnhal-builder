import type {Weapon} from "./weapon.ts";
import type {Faction} from "./faction.ts";
import type {Ability} from "./ability.ts";
import type {Power} from "./power.ts";

export interface Unit {
    id: string;
    name: string;
    type: string;
    faction: Faction;  // add this
    cost: number;
    stats: {
        move: string;
        defense: string;
        vigor: number;
        actions: number;
        resolve: string;
        morale: number;
        power: number;
        reactor: number;
    };
    baseCost: number;
    selectedWeapons: Weapon[];
    abilities?:Ability[];
    powers?:Power[];
    // Campaign tracking properties
    xp?: number; // Experience points
    level?: number; // Current level (calculated from XP)
    injuries?: string[]; // Multiple injuries (array instead of single string)
    levelUpAbilities?: string[]; // Abilities gained through level up
    campaignNotes?: string; // Optional unit-specific notes
    isLeader?: boolean; // Whether this unit is the warband leader
}
