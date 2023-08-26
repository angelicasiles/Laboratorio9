import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEstudiantesComponent } from './admin-estudiantes.component';

describe('AdminEstudiantesComponent', () => {
  let component: AdminEstudiantesComponent;
  let fixture: ComponentFixture<AdminEstudiantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminEstudiantesComponent]
    });
    fixture = TestBed.createComponent(AdminEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
