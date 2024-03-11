import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionListeComponent } from './fonction-liste.component';

describe('FonctionListeComponent', () => {
  let component: FonctionListeComponent;
  let fixture: ComponentFixture<FonctionListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FonctionListeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FonctionListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
