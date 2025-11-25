export interface Card {
  id: string;
  illustration: string;
  name: string;
  description: string;
  type: string;
  level: number;
  families: Array<string>;
  baseCost: number;
  baseHp: number;
  passiveGain: {
    description: string;
    fire: number;
    points: number;
  };
  activeGain: {
    description: string;
    fire: number;
    points: number;
    shield: number;
  };
}

export interface InGameCard extends Card {
  isBoosted: boolean;
  cost: number;
  hp: number;
  shield: number;
  isActive: boolean;
}
