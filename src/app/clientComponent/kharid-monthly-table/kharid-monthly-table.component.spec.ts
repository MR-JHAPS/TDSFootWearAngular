import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KharidMonthlyTableComponent } from './kharid-monthly-table.component';

describe('KharidMonthlyTableComponent', () => {
  let component: KharidMonthlyTableComponent;
  let fixture: ComponentFixture<KharidMonthlyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KharidMonthlyTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KharidMonthlyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
