import { AbstractControl, ValidatorFn } from '@angular/forms';

export function timeFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

        if (control.value && !timeRegex.test(control.value)) {
            return { 'invalidTimeFormat': { value: control.value } };
        }

        return null;
    };
}
