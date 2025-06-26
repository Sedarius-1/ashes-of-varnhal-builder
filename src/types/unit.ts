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
}
