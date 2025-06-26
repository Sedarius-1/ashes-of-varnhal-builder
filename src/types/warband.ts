import type {Faction} from "./faction.ts";
import type {Unit} from "./unit.ts";

export interface Warband {
    name: string;
    faction: Faction | null;
    units: Unit[];
}
