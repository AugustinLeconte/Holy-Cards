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
  baseDamage: number;
  damage: number;
  baseHp: number;
  hp: number;
}
