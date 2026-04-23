import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NonConformityService } from '../../core/services/non-conformity-service';
import { TypeNc, SeverityNc } from '../../core/models/non-conformity.model';
import {
  minLengthTrimValidator,
  ncNumberValidator,
  severityNcEnumValidator,
  typeNcEnumValidator,
  uuidValidator,
} from '../../core/validators/custom-validators';
import { NotificationService } from '../../core/services/notification.service';
import { NotificationType } from '../../core/models/notification.model';

@Component({
  selector: 'app-create-non-conformity',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-non-conformity.html',
  styleUrl: './create-non-conformity.css',
})
export class CreateNonConformity {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private ncService = inject(NonConformityService);
  private notificationService = inject(NotificationService);

  readonly typeOptions = [
    { value: '0', label: 'PRODUTO' },
    { value: '1', label: 'PROCESSO' },
    { value: '2', label: 'MATERIAL' },
    { value: '3', label: 'SEGURANÇA' },
    { value: '4', label: 'OUTRO' },
  ];

  readonly severityOptions = [
    { value: '0', label: 'BAIXA' },
    { value: '1', label: 'MÉDIA' },
    { value: '2', label: 'ALTA' },
    { value: '3', label: 'CRÍTICA' },
  ];

  ncForm: FormGroup = this.fb.group({
    number: ['', [Validators.required, ncNumberValidator()]],
    title: ['', [Validators.required, minLengthTrimValidator(3)]],
    description: ['', [Validators.required, minLengthTrimValidator(3)]],
    type: ['0', [Validators.required, typeNcEnumValidator()]],
    severity: ['0', [Validators.required, severityNcEnumValidator()]],
    processLine: ['', [Validators.required, minLengthTrimValidator(3)]],
    department: ['', [Validators.required, minLengthTrimValidator(3)]],
    rootCause: ['', [minLengthTrimValidator(3)]],
    assignedToId: ['', [uuidValidator()]],
  });

  isSubmitting = false;

  getFirstError(field: string): string | null {
    const control = this.ncForm.get(field);
    if (!control || !control.errors) return null;
    const errors = control.errors;
    if (errors['required']) return 'Campo obrigatório';
    if (errors['ncNumberFormat']) return errors['ncNumberFormat'];
    if (errors['minLengthTrim']) return errors['minLengthTrim'];
    if (errors['typeNcEnum']) return errors['typeNcEnum'];
    if (errors['severityNcEnum']) return errors['severityNcEnum'];
    if (errors['uuidFormat']) return errors['uuidFormat'];
    return null;
  }

  onSubmit(): void {
    if (!this.ncForm.valid) return;

    this.isSubmitting = true;
    const v = this.ncForm.value;

    const payload = {
      number: v.number,
      title: v.title,
      description: v.description,
      type: parseInt(v.type, 10) as TypeNc,
      severity: parseInt(v.severity, 10) as SeverityNc,
      processLine: v.processLine,
      department: v.department,
      ...(v.rootCause ? { rootCause: v.rootCause } : {}),
      ...(v.assignedToId ? { assignedToId: v.assignedToId } : {}),
    };

    this.ncService.create(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.notificationService.show('Não conformidade cadastrada com sucesso!', NotificationType.Success);
        this.router.navigate(['/app/ncs']);
      },
      error: () => {
        this.isSubmitting = false;
      },
    });
  }
}
