import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearDialog } from './crear-dialog';

describe('CrearDialog', () => {
  let component: CrearDialog;
  let fixture: ComponentFixture<CrearDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CrearDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
