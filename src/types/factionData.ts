import type {FactionTrait} from "./factionTrait.ts";

export type FactionData = {
    lore: string[];
    themesAndPlaystyle: {
        passiveTrait: {
            title: string;
            description: string[];
        };
        leaderTrait: {
            title: string;
            description: string;
        };
        tacticalDirectives: string[];
    };
    traitTable: FactionTrait[];
    summary: string[];
    playstyleBullets: string[];
    closingNote: string;
    wiki?: { title: string; content: string[]; lastEdited?: string }[];
};
