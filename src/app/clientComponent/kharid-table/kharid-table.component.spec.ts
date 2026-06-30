import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KharidTableComponent } from './kharid-table.component';

describe('KharidTableComponent', () => {
  let component: KharidTableComponent;
  let fixture: ComponentFixture<KharidTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KharidTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KharidTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
