import { Injectable } from '@angular/core';
import { Family } from './family.model';
import familiesData from '../assets/data/families.json';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  public familyList: Array<Family> = familiesData as Array<Family>;

  constructor() {}

  public getFamily(givenId: string): Family {
    return this.familyList.filter((family) => family.id === givenId)[0];
  }
}
