import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegativeRepairSettingsDialogComponent } from './negative-repair-settings-dialog.component';

describe('NegativeRepairSettingsComponent', () => {
  let component: NegativeRepairSettingsDialogComponent;
  let fixture: ComponentFixture<NegativeRepairSettingsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NegativeRepairSettingsDialogComponent]
    });
    fixture = TestBed.createComponent(NegativeRepairSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
