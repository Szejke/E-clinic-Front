import {FormControl} from '@angular/forms';

export const tokenValidator = (token: string) => {
  return (control: FormControl) => {
    if (control.value != token) {
      return {
        token: {valid: false}
      };
    }
    return null;
  }
};
