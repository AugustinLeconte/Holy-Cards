export interface Family {
  id: string;
  name: string;
  description: string;
  steps: Array<{ nb: number; bonus: string }>;
}

export interface InGameFamily {
  id: string;
  actualSteps: number;
  passedSteps: number;
  passiveGain: number;
  activeGain: number;
  passiveFire: number;
}
