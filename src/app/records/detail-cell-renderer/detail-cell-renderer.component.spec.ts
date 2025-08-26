import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCellRenderer } from './detail-cell-renderer.component';

describe('DetailCellRenderer', () => {
  let component: DetailCellRenderer;
  let fixture: ComponentFixture<DetailCellRenderer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailCellRenderer]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailCellRenderer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
