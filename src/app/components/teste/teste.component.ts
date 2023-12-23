import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TesteService } from '../../services/teste/teste.service';

@Component({
  selector: 'app-teste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.css'],
})
export class TesteComponent {
  title = '';

  constructor(readonly testService: TesteService) {
    this.makeRequest();
  }

  async makeRequest(): Promise<void> {
    const value = await this.testService.getValue();
    this.title = value;
  }
}
