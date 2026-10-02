import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarDialog } from './editar-dialog';

describe('EditarDialog', () => {
  let component: EditarDialog;
  let fixture: ComponentFixture<EditarDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
