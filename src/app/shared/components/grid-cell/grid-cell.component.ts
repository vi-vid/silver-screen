import { ChangeDetectionStrategy, Component, computed, HostBinding, input } from '@angular/core';
import { Point } from '../../interfaces/point.interface';

const SIZE = 128;

@Component({
  selector: 'app-grid-cell',
  standalone: true,
  imports: [],
  templateUrl: './grid-cell.component.html',
  styleUrl: './grid-cell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridCellComponent {
  @HostBinding('style') get style() {
    return this.marginStyle();
  }

  @HostBinding('class') get class() {
    const classes =[];
    if (this.disabled()) {
      classes.push('disabled');
    }
    return classes.join(' ');
  }

  public coordinates = input.required<Point>();
  public disabled = input<boolean>(false);

  public marginStyle = computed<string>(() => {
    const { x, y } = this.coordinates();
    return `margin-left: ${x * SIZE - (SIZE / 2)}px; margin-top: ${y * SIZE - (SIZE / 2)}px;`;
  });
}
