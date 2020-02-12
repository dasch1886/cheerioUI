import { FormArray, ValidatorFn } from "@angular/forms";

export function minLengthArray(min: number): ValidatorFn {
  return (c: FormArray) => {
    return c.value.length >= min ? null : {
      minLengthArray: { valid: false }
    }
  };
}
