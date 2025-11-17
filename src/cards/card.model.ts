export interface Card {
  id: string;
  illustration: string;
  name: string;
  description: string;
  type: string;
  level: number;
  families: Array<string>;
  baseCost: number;
  cost: number;
  baseHp: number;
  hp: number;
  passiveGain: { description: string; fire: number; points: number };
  activeGain: { description: string; fire: number; points: number };
}
