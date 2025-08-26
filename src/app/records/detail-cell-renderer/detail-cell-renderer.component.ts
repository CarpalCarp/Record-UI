import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-detail-cell-renderer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './detail-cell-renderer.component.html',
  styleUrl: './detail-cell-renderer.component.scss'
})
export class DetailCellRenderer {
  agInit(params: any): void { }

  refresh(params: any): boolean {
    return false;
  }
}
