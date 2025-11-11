import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FireService } from './fire.service';

@Component({
  selector: 'fire',
  imports: [CommonModule],
  templateUrl: './fire.component.html',
  styleUrl: './fire.component.scss',
})
export class FireComponent {
  @Input() public isEnemy: boolean = false;

  constructor(public fireService: FireService) {}
}
