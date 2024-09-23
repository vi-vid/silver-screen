import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-grid-screen',
  standalone: true,
  imports: [],
  templateUrl: './grid-screen.component.html',
  styleUrl: './grid-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridScreenComponent {}
