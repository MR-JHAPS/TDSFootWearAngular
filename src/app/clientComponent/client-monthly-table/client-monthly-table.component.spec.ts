import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMonthlyTableComponent } from './client-monthly-table.component';

describe('ClientMonthlyTableComponent', () => {
  let component: ClientMonthlyTableComponent;
  let fixture: ComponentFixture<ClientMonthlyTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientMonthlyTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientMonthlyTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
