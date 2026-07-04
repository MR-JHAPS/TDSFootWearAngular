import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KharidLayoutComponent } from './kharid-layout.component';

describe('KharidLayoutComponent', () => {
  let component: KharidLayoutComponent;
  let fixture: ComponentFixture<KharidLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KharidLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KharidLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
