import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './clients.html',
  styleUrl: './clients.css',
})
export class Clients {
  title = 'Clients';
}
