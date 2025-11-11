import { Injectable } from '@angular/core';
import { Family } from './family.model';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  public familyList: Array<Family> = [
    {
      id: '0',
      name: 'Martyrs',
      description: "Actif: donne un bonus d'âmes",
      steps: [
        { nb: 2, bonus: 'Donne un bonus de 10 âmes' },
        { nb: 5, bonus: 'Donne un bonus de 30 âmes' },
      ],
    },
    {
      id: '1',
      name: 'Vierges',
      description: 'Passif: converti des âmes tout les tours',
      steps: [{ nb: 3, bonus: 'Sauve 6 âmes par tour' }],
    },
    {
      id: '2',
      name: 'Apôtres',
      description: 'Passif: Baisse le prix des cartes',
      steps: [
        {
          nb: 2,
          bonus: 'Baisse le prix de la prochaine carte de 1 tout les 3 tours',
        },
        {
          nb: 4,
          bonus: 'Baisse le prix de la prochaine carte de 1 tout les 2 tours',
        },
        {
          nb: 6,
          bonus: 'Baisse le prix de la prochaine carte de 2 tout les 2 tours',
        },
        {
          nb: 8,
          bonus: 'Baisse le prix de la prochaine carte de 3 tout les tours',
        },
        {
          nb: 10,
          bonus: 'Baisse le prix de la prochaine carte de 4 tout les tours',
        },
        {
          nb: 12,
          bonus: 'Tout les tours, la première carte piochée est gratuite',
        },
      ],
    },
    {
      id: '3',
      name: 'Papes',
      description: '',
      steps: [{ nb: 0, bonus: '' }],
    },
    {
      id: '4',
      name: "Docteurs de l'église",
      description: '',
      steps: [{ nb: 0, bonus: '' }],
    },
    {
      id: '5',
      name: 'Anges',
      description: '',
      steps: [{ nb: 0, bonus: '' }],
    },
    {
      id: '6',
      name: 'Evangelistes',
      description: '',
      steps: [{ nb: 0, bonus: '' }],
    },
    {
      id: '7',
      name: 'Monarque',
      description: '',
      steps: [{ nb: 0, bonus: '' }],
    },
  ];

  constructor() {}

  public getFamily(givenId: string): Family {
    return this.familyList.filter((family) => family.id === givenId)[0];
  }
}
