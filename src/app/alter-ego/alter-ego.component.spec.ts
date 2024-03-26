import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterEgoComponent } from './alter-ego.component';

describe('AlterEgoComponent', () => {
  let component: AlterEgoComponent;
  let fixture: ComponentFixture<AlterEgoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlterEgoComponent]
    });
    fixture = TestBed.createComponent(AlterEgoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
