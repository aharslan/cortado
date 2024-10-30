import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { VariantService } from '../../../services/variantService/variant.service';
import { DocumentationService } from '../../documentation/documentation.service';
import { NegativeRepairIdentificationAlgorithm } from '../../../objects/NegativeRepairIdentificationAlgorithm';

@Component({
  selector: 'app-negative-repair-settings',
  templateUrl: './negative-repair-settings-dialog.component.html',
  styleUrls: ['./negative-repair-settings-dialog.component.css'],
})
export class NegativeRepairSettingsDialogComponent {
  @Input()
  numberOfVariants: number;

  selectedNegativeRepairIdentificationAlgorithm: NegativeRepairIdentificationAlgorithm =
    NegativeRepairIdentificationAlgorithm.SUBTREE_RATING;

  options: NegativeRepairIdentificationAlgorithm[] = Object.values(
    NegativeRepairIdentificationAlgorithm
  );

  maxLoopExecutions: number = 4;
  maxLoopExecutionLength: number = 3;
  stopOnThreshold = true;
  minPositiveFitness = 85.0;
  maxEditDistance = 5;

  constructor(public modal: NgbActiveModal) {}

  getDisplayName(algo: NegativeRepairIdentificationAlgorithm) {
    switch (algo) {
      case NegativeRepairIdentificationAlgorithm.NEGATIVE_BRUTE_FORCE:
        return 'Negative brute force';
      case NegativeRepairIdentificationAlgorithm.POSITIVE_BRUTE_FORCE:
        return 'Positive brute force';
      case NegativeRepairIdentificationAlgorithm.SUBTREE_RATING:
        return 'Candidate rating';
    }
  }

  onApply() {
    this.modal.close(this.selectedNegativeRepairIdentificationAlgorithm);
  }
}
