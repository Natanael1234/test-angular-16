import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-teste2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teste2.component.html',
  styleUrls: ['./teste2.component.css'],
})
export class Teste2Component {
  @Input() title!: string;
}
