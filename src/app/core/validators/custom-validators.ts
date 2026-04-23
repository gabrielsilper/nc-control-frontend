import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const passwordConfirm = control.get('passwordConfirm')?.value;

  if (!password || !passwordConfirm) {
    return null;
  }

  return password === passwordConfirm ? null : { passwordMismatch: true };
}

export function nameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    if (!value) return null;
    if (value.length < 3) return { nameMinLength: 'Nome deve ter no mínimo 3 caracteres' };
    if (value.length > 50) return { nameMaxLength: 'Nome deve ter no máximo 50 caracteres' };
    if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) return { nameLettersOnly: 'Nome pode conter apenas letras e espaços' };
    return null;
  };
}

export function emailFormatValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    if (!value) return null;
    const valid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    return valid ? null : { emailFormat: 'E-mail deve ser um endereço válido' };
  };
}

export function passwordComplexityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    if (!value) return null;
    if (value.length < 8) return { passwordMinLength: 'Senha deve ter no mínimo 8 caracteres' };
    if (value.length > 25) return { passwordMaxLength: 'Senha deve ter no máximo 25 caracteres' };
    const complex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(value);
    return complex
      ? null
      : { passwordComplexity: 'Senha deve ter maiúscula, minúscula, número e caractere especial' };
  };
}

export function ncNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    if (!value) return null;
    const valid = /^NC-\d{4}-\d{6}$/.test(value);
    return valid ? null : { ncNumberFormat: 'Número deve seguir o padrão NC-0000-000000 (ex: NC-1234-123456)' };
  };
}

export function minLengthTrimValidator(min: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = (control.value ?? '').trim();
    if (!value) return null;
    return value.length >= min ? null : { minLengthTrim: `Mínimo de ${min} caracteres` };
  };
}

export function uuidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value: string = control.value ?? '';
    if (!value) return null;
    const valid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
    return valid ? null : { uuidFormat: 'Deve ser um UUID válido (ex: 550e8400-e29b-41d4-a716-446655440000)' };
  };
}

export function profileEnumValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = ['0', '1', '2'].includes(String(control.value));
    return valid ? null : { profileEnum: 'Perfil inválido' };
  };
}

export function typeNcEnumValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = ['0', '1', '2', '3', '4'].includes(String(control.value));
    return valid ? null : { typeNcEnum: 'Tipo inválido' };
  };
}

export function severityNcEnumValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = ['0', '1', '2', '3'].includes(String(control.value));
    return valid ? null : { severityNcEnum: 'Severidade inválida' };
  };
}
