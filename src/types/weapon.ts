export interface Weapon {
    name: string;
    range: string;
    dice: number;
    critEffect: string;
    critDmg: number;
    cost: number;
    abilities?: string[];
    allowedFor?: string;
}
