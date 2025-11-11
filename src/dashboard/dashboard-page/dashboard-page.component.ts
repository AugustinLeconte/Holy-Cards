import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent {
  public showPlayMenu: boolean = false;
  constructor(private router: Router) {}

  public navigateTo(url: string): void {
    this.router.navigateByUrl(url);
  }
}
